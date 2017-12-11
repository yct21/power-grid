'use strict'

module.exports = (env) => {
  if (env.nodeEnv === 'development') {
    return {
      app: ['react-hot-loader/patch', env.srcEntry],
    }
  } if (env.nodeEnv === 'production') {
    return {
      app: env.srcEntry
    }
  }
}
