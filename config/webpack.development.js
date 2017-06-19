const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const FriendlyErrors = require("friendly-errors-webpack-plugin");

const envParameters = require("./env.parameters.js");

const projectRoot = path.resolve(__dirname, "../");
const nodeModulesFolder = path.join(projectRoot, "node_modules");

function entryConfig(config) {
  if (config.isProduction) {
    return [
      "babel-polyfill",
      config.entryFile,
    ];
  } else {
    return [
      config.entryFile,
      `webpack-hot-middleware/client?path=http://localhost:${config.port}/__webpack_hmr`,
    ];
  }
}

function nodeConfig() {
  return {
    __filename: false,
    __dirname: false,
  };
}

function devtoolConfig(config) {
  return config.isProduction ?
    false :
    "source-map";
}

function outputConfig(config) {
  return {
    path: config.assetsPath,
    pathinfo: config.isDevelopment,
    publicPath: config.assetsPublicPath,
    filename: "app.js",
  };
}

function resolveConfig() {
  return {
    extensions: [".js", ".ts", ".vue", ".json"],
    modules: [path.resolve(projectRoot, "renderer"), nodeModulesFolder],
  };
}

function externalsConfig() {
  return {
    "pouchdb-adapter-node-websql": "commonjs pouchdb-adapter-node-websql",
  };
}

function moduleConfig(config) {
  return {
    loaders: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          esModule: true,
          cssModules: {
            modules: true,
            importLoaders: true,
            camelCase: true,
            localIdentName: "[path][name]---[local]---[hash:base64:5]",
          },
        },
      },
      {
        test: /\.ts$/,
        exclude: /node_modules|vue\/src|features/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      },
      {
        test: /\.css$/,
        loader: ["style-loader", "css-loader"],
      },
      {
        test: /\.json$/,
        loader: "json-loader",
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        query: {
          limit: 10000,
          name: path.join(config.assetsSubDirectory, "img/[name].[hash:7].[ext]"),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        query: {
          limit: 10000,
        },
      },
    ],
  };
}

function pluginsConfig(config) {
  if (config.isDevelopment) {
    return [
      new webpack.DefinePlugin({
        DEVELOPMENT: true,
        "process.env.NODE_ENV": "\"development\"",
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new CopyWebpackPlugin([
        { from: "node_modules/highlight.js/styles/atom-one-light.css", to: "assets/" },
      ]),
      new HtmlWebpackIncludeAssetsPlugin({
        assets: ["assets/atom-one-light.css"],
        append: false,
      }),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "renderer/index.html",
        inject: true,
      }),
      new FriendlyErrors(),
    ];
  } else {
    return [
      new webpack.DefinePlugin({
        DEVELOPMENT: false,
        "process.env.NODE_ENV": "\"production\"",
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new CopyWebpackPlugin([
        { from: "node_modules/highlight.js/styles/atom-one-light.css", to: "assets/" },
        { from: "config/production.package.json", to: "package.json" },
      ]),
      new HtmlWebpackIncludeAssetsPlugin({
        assets: ["assets/atom-one-light.css"],
        append: false,
      }),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "renderer/index.html",
        inject: true,
      }),
    ];
  }
}

module.exports = function webpackConfig(env) {
  const config = (env === "production") ?
        envParameters.productionParameters :
        envParameters.developmentParameters;

  return {
    entry: entryConfig(config),
    node: nodeConfig(),
    devtool: devtoolConfig(config),
    output: outputConfig(config),
    resolve: resolveConfig(),
    externals: externalsConfig(config),
    module: moduleConfig(config),
    plugins: pluginsConfig(config),
    target: "electron-renderer",
  };
};
