'use strict'

const path = require('path')

module.exports = (env) => {
  if (env.nodeEnv === 'development') {
    return {
      path: env.assetsRoot,
      filename: 'dev-[name].js',
      publicPath: env.assetsPublicPath,
    }
  } else if (env.nodeEnv === 'production') {
    const filename = path.posix.join(env.assetsSubDirectory, 'js/[name].[chunkhash].js')

    return {
      path: env.assetsRoot,
      filename,
      chunkFilename: filename,

      // https://indium.readthedocs.io/en/latest/debugger.html#webpack
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
      devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
    }
  }

  throw new Exception('Unkown NODE_ENV')
}
