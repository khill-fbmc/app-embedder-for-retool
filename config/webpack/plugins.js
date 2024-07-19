const path = require("node:path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const { manifestPath, outputPath, pagesPath, assetsPath, htmlTemplates } = require("./paths");

const isDevelopment = process.env.NODE_ENV !== "production";
const forceOutput = { to: outputPath, force: true };

const copyManifestPlugin = new CopyWebpackPlugin({
  patterns: [
    {
      from: manifestPath,
      ...forceOutput,
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
      {
        from: path.join(pagesPath, "Content", "content.styles.css"),
        ...forceOutput,
      },
      {
        from: path.join(assetsPath, "img", "icon-128.png"),
        ...forceOutput,
      },
      {
        from: path.join(assetsPath, "img", "icon-34.png"),
        ...forceOutput,
      },
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
