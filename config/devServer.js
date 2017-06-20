const path = require("path");
const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackConfig = require("./webpack.config")("development");
const config = require("./env.development.json");

const app = express();
const compiler = webpack(webpackConfig);

const { devServerPort } = config;
const assetsPublicPath = `http://localhost:${devServerPort}/dev`;

const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: assetsPublicPath,
  quiet: false,
});

const hotMiddleware = webpackHotMiddleware(compiler, {
  log: () => {},
});

// force page reload when html-webpack-plugin template changes
compiler.plugin("compilation", (compilation) => {
  compilation.plugin("html-webpack-plugin-after-emit", (data, cb) => {
    hotMiddleware.publish({ action: "reload" });
    cb();
  });
});

// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// serve pure static assets
const staticPath = path.posix.join(assetsPublicPath, "static");
app.use(staticPath, express.static("./static"));

const uri = `http://localhost:${devServerPort}`;

devMiddleware.waitUntilValid(() => {
  console.log(`> Listening at ${uri}\n`);
});

module.exports = app.listen(devServerPort, (err) => {
  if (err) {
    console.log(err);
  }
});
