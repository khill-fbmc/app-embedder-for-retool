// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";
process.env.ASSET_PATH = "/";

const path = require("node:path");
const webpack = require("webpack");
const ZipPlugin = require("zip-webpack-plugin");

const config = require("../webpack.config");
const packageInfo = require("../package.json");

config.mode = "production";

config.plugins = (config.plugins || []).concat(
  new ZipPlugin({
    filename: `${packageInfo.name}-${packageInfo.version}.zip`,
    path: path.join(__dirname, "..", "dist"),
  })
);

webpack(config, function (err) {
  if (err) throw err;
});
