const path = require("node:path");

const projectRoot = path.join(__dirname, "..");
const sourceRoot = path.join(projectRoot, "src");
const assetsPath = path.join(sourceRoot, "assets");
const pagesPath = path.join(sourceRoot, "pages");
const outputPath = path.join(projectRoot, "build");
const distPath = path.join(projectRoot, "dist");
const manifestPath = path.join(sourceRoot, "manifest.json");

module.exports = {
  projectRoot,
  sourceRoot,
  assetsPath,
  pagesPath,
  manifestPath,
  outputPath,
  distPath,
  entryPaths: {
    panel: path.join(pagesPath, "Panel", "index.tsx"),
    options: path.join(pagesPath, "Options", "index.tsx"),
    background: path.join(pagesPath, "Background", "index.ts"),
  },
};
