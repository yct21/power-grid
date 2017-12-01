'use strict'

const path = require('path')
const context = path.resolve(__dirname, '../../../') // root

module.exports = {
  nodeEnv: 'development',
  // Paths
  context,
  srcDirectory: path.join(context, 'client'),
  srcEntry: path.resolve(context, 'client/entry/index.ts'),
  assetsSubDirectory: 'static',
  assetsPublicPath: '/',
  assetsRoot: path.resolve(context, '_build/client'),
  proxyTable: {},

  // Various Dev Server settings
  host: 'localhost', // can be overwritten by process.env.HOST
  defaultPort: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
  autoOpenBrowser: false,
  errorOverlay: true,
  notifyOnErrors: true,
  poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

  // Use Eslint Loader?
  // If true, your code will be linted during bundling and
  // linting errors and warnings will be shown in the console.
  useEslint: false,
  // If true, eslint errors and warnings will also be shown in the error overlay
  // in the browser.
  showEslintErrorsInOverlay: true,

  /**
   * Source Maps
   */

  // https://webpack.js.org/configuration/devtool/#development
  devtool: 'eval-source-map',

  // If you have problems debugging vue-files in devtools,
  // set this to false - it *may* help
  // https://vue-loader.vuejs.org/en/options.html#cachebusting
  cacheBusting: true,

  // CSS Sourcemaps off by default because relative paths are "buggy"
  // with this option, according to the CSS-Loader README
  // (https://github.com/webpack/css-loader#sourcemaps)
  // In our experience, they generally work as expected,
  // just be aware of this issue when enabling this option.
  cssSourceMap: false,
  cssLocalIndentName: '[path][name]---[local]---[hash:base64:5]',
}
