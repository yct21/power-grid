const tsConfigPaths = require('tsconfig-paths')
const tsNode = require('ts-node')
const tsConfig = require('../../client/tsconfig.json')

const baseUrl = './client'

tsNode.register({
  project: "./client",
});

tsConfigPaths.register({
  baseUrl,
  paths: tsConfig.compilerOptions.paths
})
