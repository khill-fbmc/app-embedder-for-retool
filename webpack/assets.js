const path = require("node:path");

const { outputPath, assetsPath } = require("./paths");

const imageAssets = [
  "retool_logo.png",
  ...[16, 32, 48, 64, 128, 256].map((size) => `logo_${size}.png`),
];

const imagePatterns = imageAssets.map((filename) => ({
  from: path.join(assetsPath, "img", filename),
  to: outputPath,
  force: true,
}));

module.exports = { imageAssets, imagePatterns };
