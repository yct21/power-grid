'use strict'

const path = require('path')
const context = path.resolve(__dirname, '../../')

module.exports = {
  nodeEnv: 'production',
  // Template for index.html
  index: path.resolve(context, '_build/client/index.html'),

  // Paths
  context,
  srcDirectory: path.join(context, 'client'),
  srcEntry: path.resolve(context, 'client/entry/index.ts'),
  assetsRoot: path.resolve(context, '_build/client'),
  assetsSubDirectory: 'static',
  assetsPublicPath: '/',

  /**
   * Source Maps
   */

  productionSourceMap: true,
  // https://webpack.js.org/configuration/devtool/#production
  devtool: '#source-map',

  // Gzip off by default as many popular static hosts such as
  // Surge or Netlify already gzip all static assets for you.
  // Before setting to `true`, make sure to:
  // npm install --save-dev compression-webpack-plugin
  productionGzip: false,
  productionGzipExtensions: ['js', 'css'],

  // Run the build command with an extra argument to
  // View the bundle analyzer report after build finishes:
  // `npm run build --report`
  // Set to `true` or `false` to always turn it on or off
  bundleAnalyzerReport: process.env.npm_config_report,

  cssLocalIndentName: '[hash:base64:5]',
}
