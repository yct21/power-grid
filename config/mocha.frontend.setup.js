// configure tsconfig-paths
const tsNode = require("ts-node");
const tsConfigPaths = require("tsconfig-paths");
const baseUrl = "./frontend";

tsNode.register({
  project: "./frontend",
});

tsConfigPaths.register({
  baseUrl,
  paths: [],
});

global.document = {
  getElementById: function() {},
};

global.test = global.it
