// dependencies
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const FriendlyErrors = require("friendly-errors-webpack-plugin");
const { TsConfigPathsPlugin } = require("awesome-typescript-loader");

// environment parameters
const developmentEnvParameters = require("./env.development.json");
const productionEnvParameter = require("./env.production.json");

// parameters for configuration
const projectRoot = path.resolve(__dirname, "../");
const nodeModulesFolder = path.join(projectRoot, "node_modules");
const buildFolder = path.join(projectRoot, "build");

const { devServerPort } = developmentEnvParameters;

function entryConfig(env) {
  const entryFile = path.join(projectRoot, "frontend/entry/index.ts");
  const webpackHotMiddlewareEntry
    = `webpack-hot-middleware/client?path=http://localhost:${devServerPort}/__webpack_hmr`;

  if (env === "production") {
    return [
      entryFile,
    ];
  } else if (env === "development") {
    return [
      entryFile,
      webpackHotMiddlewareEntry,
    ];
  } else {
    throw new Error("Unknown environment");
  }
}

function nodeConfig() {
  return {
    __filename: false,
    __dirname: false,
  };
}

function devtoolConfig(env) {
  if (env === "production") {
    return false;
  } else if (env === "development") {
    return "source-map";
  } else {
    throw new Error("Unknown environment");
  }
}

function outputConfig(env) {
  if (env === "production") {
    return {
      path: path.join(buildFolder, "production"),
      pathinfo: false,
      publicPath: "./",
      filename: "app.js",
    };
  } else if (env === "development") {
    return {
      path: path.join(buildFolder, "development"),
      pathinfo: true,
      publicPath: `http://localhost:${devServerPort}/dev`,
    }
  } else {
    throw new Error("Unknown environment");
  }
}

function resolveConfig() {
  return {
    extensions: [".js", ".ts", ".tsx"],
    modules: [
      path.resolve(projectRoot, "frontend"),
      path.resolve(projectRoot, "shared"),
      nodeModulesFolder
    ],
  };
}

function moduleConfig(env) {
  return {
    loaders: [
      {
        test: /\.tsx?$/,
        exclude: [
          /backend/,
          /node_modules/,
          /.*\.spec.tsx?/,
          /features/,
        ],
        loader: "awesome-typescript-loader",
        query: {
          configFileName: "./frontend/tsconfig.json",
        }
      },
      {
        test: /\.css$/,
        loader: ["style-loader", "postcss-loader"],
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
          name: path.join("static", "img/[name].[hash:7].[ext]"),
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

function pluginsConfig(env) {
  if (env === "production") {
    return [
      new TsConfigPathsPlugin({
        tsconfig: "frontend/tsconfig.json",
        compiler: "typescript",
      }),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": "\"production\"",
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "frontend/entry/index.html",
        inject: true,
      }),
    ];
  } else if (env === "development") {
    return [
      new TsConfigPathsPlugin({
        tsconfig: "frontend/tsconfig.json",
        compiler: "typescript",
      }),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": "\"development\"",
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "frontend/entry/index.html",
        inject: true,
      }),
      new FriendlyErrors(),
    ];
  }
}

module.exports = function webpackConfig(env) {
  return {
    entry: entryConfig(env),
    node: nodeConfig(),
    devtool: devtoolConfig(env),
    output: outputConfig(env),
    resolve: resolveConfig(),
    module: moduleConfig(env),
    plugins: pluginsConfig(env),
    target: "web",
  };
};
