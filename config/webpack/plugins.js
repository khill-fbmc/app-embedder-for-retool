const path = require("node:path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const { manifestPath, outputPath, assetsPath, htmlTemplates } = require("./paths");

const isDevelopment = process.env.NODE_ENV !== "production";

const assetImgPattern = (filename) => ({
  from: path.join(assetsPath, "img", filename),
  to: outputPath,
  force: true,
});

const copyManifestPlugin = new CopyWebpackPlugin({
  patterns: [
    {
      from: manifestPath,
      to: outputPath,
      force: true,
      transform: (content) =>
        Buffer.from(
          JSON.stringify({
            description: process.env.npm_package_description,
            version: process.env.npm_package_version,
            ...JSON.parse(content.toString()),
          })
        ),
    },
  ],
});

const commonPlugins = [
  isDevelopment && new ReactRefreshWebpackPlugin(),
  new CleanWebpackPlugin({ verbose: false }),
  new webpack.ProgressPlugin(),
  new webpack.EnvironmentPlugin(["NODE_ENV"]),
  copyManifestPlugin,
  new CopyWebpackPlugin({
    patterns: [
      assetImgPattern("icon-128.png"),
      assetImgPattern("icon-34.png"),
      ...[32, 64, 128, 256].map((size) => assetImgPattern(`logo_${size}.png`)),
    ],
  }),
].filter(Boolean);

const htmlPlugins = [
  new HtmlWebpackPlugin({
    template: htmlTemplates.options,
    filename: "options.html",
    chunks: ["options"],
    cache: false,
  }),
  new HtmlWebpackPlugin({
    template: htmlTemplates.panel,
    filename: "panel.html",
    chunks: ["panel"],
    cache: false,
  }),
];

module.exports = [...commonPlugins, ...htmlPlugins];
