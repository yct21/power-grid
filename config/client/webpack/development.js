'use strict'

const portfinder = require('portfinder')

module.exports = new Promise((resolve, reject) => {
  const env = require('../env')['development'];

  portfinder.basePort = process.env.PORT || env.defaultPort
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      process.env.PORT = port
      env.port = port

      resolve({
        context: require('./context')(env),
        entry: require('./entry')(env),
        output: require('./output')(env),
        resolve: require('./resolve')(env),
        module: require('./module')(env),
        plugins: require('./plugins')(env),
        devServer: require('./devServer')(env),
      })
    }
  })
})
