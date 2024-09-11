// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";
process.env.ASSET_PATH = "/";

const webpack = require("webpack");
const ZipPlugin = require("zip-webpack-plugin");

const config = require("../webpack.config");
const packageInfo = require("../package.json");
const { distPath } = require("../webpack/paths");

config.mode = "production";

config.plugins = (config.plugins || []).concat(
  new ZipPlugin({
    filename: `${packageInfo.name}-${packageInfo.version}.zip`,
    path: distPath,
  })
);

webpack(config, (/** @type {Error} */ err, /** @type {import("webpack").Stats} */ stats) => {
  if (err) {
    console.error(err);
    return;
  }
  if (stats?.hasErrors()) {
    stats.compilation.errors.forEach((err) => {
      console.error(err);
    });
  }
});
