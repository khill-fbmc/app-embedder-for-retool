const TerserPlugin = require("terser-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = !isDevelopment
  ? {
      minimize: true,
      minimizer: [new TerserPlugin({ extractComments: false })],
    }
  : {};
