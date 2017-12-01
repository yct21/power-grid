'use strict'

module.exports = (env) => ({
  clientLogLevel: 'warning',
  historyApiFallback: true,
  hot: true,
  compress: true,
  host: env.host,
  port: env.port,
  open: env.autoOpenBrowser,
  overlay: env.errorOverlay ? {
    warnings: false,
    errors: true,
  } : false,
  publicPath: env.assetsPublicPath,
  proxy: env.proxyTable,
  quiet: true, // necessary for FriendlyErrorsPlugin
  watchOptions: {
    poll: env.poll,
  }
})
