const plugins = require("./webpack/plugins");
const optimization = require("./webpack/optimization");
const { entryPaths, outputPath } = require("./webpack/paths");
const { moduleRules, fileExtensions } = require("./webpack/rules");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: entryPaths,
  devServer: {
    hot: true,
  },
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
