const ReactRefreshTypeScript = require("react-refresh-typescript");

const isDevelopment = process.env.NODE_ENV !== "production";

const fileExtensions = ["jpg", "jpeg", "png", "gif", "eot", "otf", "svg", "ttf", "woff", "woff2"];

const moduleRules = [
  {
    test: /\.(css|scss)$/,
    use: [
      "style-loader",
      "css-loader",
      {
        loader: "sass-loader",
        options: { sourceMap: true },
      },
    ],
  },
  {
    test: new RegExp(`.(${fileExtensions.join("|")})$`),
    type: "asset/resource",
    exclude: /node_modules/,
  },
  {
    test: /\.html$/i,
    loader: "html-loader",
    exclude: /node_modules/,
  },
  {
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    use: [
      {
        loader: require.resolve("ts-loader"),
        options: {
          getCustomTransformers: () => ({
            before: [isDevelopment && ReactRefreshTypeScript()].filter(Boolean),
          }),
          transpileOnly: isDevelopment,
        },
      },
    ],
  },
  {
    test: /\.(js|jsx)$/,
    use: [
      "source-map-loader",
      {
        loader: require.resolve("babel-loader"),
        options: {
          plugins: [isDevelopment && require.resolve("react-refresh/babel")].filter(Boolean),
        },
      },
    ],
    exclude: /node_modules/,
  },
];

module.exports = {
  moduleRules,
  fileExtensions,
};
