'use strict'

module.exports = function devtool(env) {
  if (env.nodeEnv === 'development') {
    return env.devtool
  } else if (env.nodeEnv === 'production') {
    if (env.productionSourceMap) {
      return env.devtool
    } else {
      return false
    }
  }

  throw new Exception('Unknown NODE_ENV')
}
