'use strict'

const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function cssLoaders (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap,
    }
  }

  var postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap,
      config: {
        path: 'config/client/.postcssrc.js',
      },
    }
  }

  // generate loader string to be used with extract text plugin
  const generateLoaders  = (loader, loaderOptions) => {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap,
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

function cssLoadersStandalone (options) {
  const output = []
  const loaders = cssLoaders(options)
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}

function tsRules (env) {
  return [{
      test: /\.ts$/,
      exclude: /node_modules/,
      enforce: 'pre',
      loader: 'tslint-loader',
    }, {
      test: /\.ts$/,
      exclude: /node_modules/,
      loader: 'ts-loader',
      options: {
        configFile: 'client/tsconfig.json',
        appendTsSuffixTo: [/\.vue$/],
      },
    },
  ]
}

function vueRule (env) {
  const sourceMapEnabled = env.nodeEnv === 'production'
        ? env.productionSourceMap
        : env.cssSourceMap

  return {
    test: /\.vue$/,
    loader: 'vue-loader',
    options: {
      loaders: cssLoaders({
        sourceMap: sourceMapEnabled,
        extract: env.nodeEnv === 'production'
      }),
      cssSourceMap: sourceMapEnabled,
      cssModules: {
        localIdentName: env.cssLocalIndentName,
        camelCase: true,
      },
      cacheBusting: env.cacheBusting,
      transformToRequire: {
        video: 'src',
        source: 'src',
        img: 'src',
        image: 'xlink:href'
      }
    }
  }
}

function urlRules (env) {
  const assetsPath = (assetName) => path.posix.join(env.assetsSubDirectory, assetName)
  return [{
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: assetsPath('img/[name].[hash:7].[ext]')
    }
  }, {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: assetsPath('media/[name].[hash:7].[ext]')
    }
  }, {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: assetsPath('fonts/[name].[hash:7].[ext]')
    }
  }]
}

module.exports = (env) => ({
  rules: [
    ...tsRules(env),
    vueRule(env),
    ...cssLoadersStandalone({ sourceMap: env.cssSourceMap, usePostCSS: true }),
    ...urlRules(env),
  ].filter((rule) => rule !== null)
})
