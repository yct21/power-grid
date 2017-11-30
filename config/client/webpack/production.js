'use strict'

const env = require('../environment/production')

module.exports = {
  context: require('./context')(env),
  entry: require('./entry')(env),
  output: require('./output')(env),
  resolve: require('./resolve')(env),
  module: require('./module')(env),
  plugins: require('./plugins')(env),
  devServer: require('./devServer')(env),
}
