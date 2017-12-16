'use strict'

const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function cssLoader (env) {
  return {
    test: /\.css$/,

    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: true,
          sourceMap: true,
          camelCase: true,
          localIdentName: env.cssLocalIndentName,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          config: {
            path: 'config/client/.postcssrc'
          },
        }
      },
    ]
  }
}

function tsLintRule (env) {
  return {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    enforce: 'pre',
    loader: 'tslint-loader',
  }
}

function tsRule (env) {
  const reactHotLoader = {
    loader: 'react-hot-loader/webpack',
  }

  const tsLoader = {
    loader: 'ts-loader',
    options: {
      configFile: 'client/tsconfig.json',
    },
  }

  const useEntry = env.nodeEnv === 'development' ?
        [ reactHotLoader, tsLoader ] :
        [ tsLoader ]

  return {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: useEntry,
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
    tsLintRule(env),
    tsRule(env),
    cssLoader(env),
    ...urlRules(env),
  ].filter((rule) => rule !== null)
})
