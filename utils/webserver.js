// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";
process.env.ASSET_PATH = "/";

const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");

const env = require("./env");
const config = require("../webpack.config");
const { outputPath } = require("../webpack/paths");

const excludeEntriesToHotReload = ["background", "contentScript"];

for (const entryName in config.entry) {
  if (excludeEntriesToHotReload.indexOf(entryName) === -1) {
    config.entry[entryName] = [
      "webpack/hot/dev-server",
      `webpack-dev-server/client?hot=true&hostname=${env.DEV_HOST}&port=${env.PORT}`,
    ].concat(config.entry[entryName]);
  }
}

const server = new WebpackDevServer(
  {
    hot: true,
    liveReload: false,
    client: {
      webSocketTransport: "ws",
      // webSocketURL: { hostname: undefined, pathname: undefined, port: "0" },
    },
    webSocketServer: "ws",
    host: env.DEV_HOST,
    port: env.PORT,
    static: {
      directory: outputPath,
    },
    devMiddleware: {
      publicPath: `http://${env.DEV_HOST}:${env.PORT}/`,
      writeToDisk: true,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    allowedHosts: "all",
  },
  webpack(config)
);

(async () => {
  await server.start();
})();
