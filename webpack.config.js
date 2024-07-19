const { entryPaths, outputPath } = require("./config/webpack/paths");
const plugins = require("./config/webpack/plugins");
const { moduleRules, fileExtensions } = require("./config/webpack/rules");
const optimization = require("./config/webpack/optimization");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: entryPaths,
  output: {
    filename: "[name].bundle.js",
    path: outputPath,
    clean: true,
    publicPath: process.env.ASSET_PATH || "/",
  },
  module: {
    rules: moduleRules,
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".css", ".scss"].concat(
      fileExtensions.map((ext) => `.${ext}`)
    ),
  },
  plugins,
  optimization,
  infrastructureLogging: {
    level: "info",
  },
  devtool: isDevelopment ? "cheap-module-source-map" : false,
};
