const { readFileSync } = require("node:fs");
const path = require("node:path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const packageInfo = require("../package.json");
const { imagePatterns } = require("./assets");
const { manifestPath, outputPath, pagesPath, sourceRoot } = require("./paths");

const isDevelopment = process.env.NODE_ENV !== "production";

const properAppName = packageInfo.name
  .split("-")
  .map((x) => `${x[0].toUpperCase()}${x.slice(1)}`)
  .join(" ");

const commonPlugins = [
  isDevelopment && new ReactRefreshWebpackPlugin(),
  new CleanWebpackPlugin({ verbose: false }),
  new webpack.ProgressPlugin(),
  new webpack.EnvironmentPlugin(["NODE_ENV", "DEBUG"]),
  new webpack.DefinePlugin({
    "process.env.APP_SCHEMA": JSON.stringify(
      readFileSync(path.resolve(sourceRoot, "types/retool-app.ts"), "utf-8")
    ),
  }),
  new CopyWebpackPlugin({
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
  }),
  new CopyWebpackPlugin({ patterns: imagePatterns }),
].filter(Boolean);

const htmlPlugins = [
  new HtmlWebpackPlugin({
    filename: "panel.html",
    template: path.join(pagesPath, "Panel", "index.ejs"),
    templateParameters: { title: properAppName },
    chunks: ["panel"],
    cache: false,
  }),
  new HtmlWebpackPlugin({
    filename: "options.html",
    template: path.join(pagesPath, "Options", "index.ejs"),
    templateParameters: { title: properAppName },
    chunks: ["options"],
    cache: false,
  }),
];

module.exports = [...commonPlugins, ...htmlPlugins];
