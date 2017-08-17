// configure tsconfig-paths
const tsNode = require("ts-node");
const tsConfigPaths = require("tsconfig-paths");
const baseUrl = "./backend";

tsNode.register({
  project: "./backend",
});

tsConfigPaths.register({
  baseUrl,
  paths: [],
});

global.test = global.it
