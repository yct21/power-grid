const path = require("path");

const buildDirectory = path.resolve(__dirname, "../build");
const devServerPort = 8001;

const baseParameters = {
  assetsRoot: buildDirectory,
  entryFile: path.join(__dirname, "../frontend/src/index.tsx"),
};

const developmentConfig = {
  isProduction: false,
  isDevelopment: true,
  port: devServerPort,
  assetsPath: path.join(buildDirectory, "dev"),
  assetsSubDirectory: "static",
  assetsPublicPath: `http://localhost:${devServerPort}/dev`,
};

const productionConfig = {
  appName: "mostly-harmless",
  isProduction: true,
  isDevelopment: false,
  assetsPath: path.join(buildDirectory, "production"),
  releasePath: path.join(buildDirectory, "release"),
  assetsSubDirectory: "static",
  assetsPublicPath: "./",
  productionSourceMap: true,
  platform: "darwin",
  arch: "x64",
  // Gzip off by default as many popular static hosts such as
  // Surge or Netlify already gzip all static assets for you.
  // Before setting to `true`, make sure to:
  // npm install --save-dev compression-webpack-plugin
  productionGzip: false,
  productionGzipExtensions: ["js", "css"],
};

module.exports = {
  productionParameters: Object.assign({}, baseParameters, productionConfig),
  developmentParameters: Object.assign({}, baseParameters, developmentConfig),
};
