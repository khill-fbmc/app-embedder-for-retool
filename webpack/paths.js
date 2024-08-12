const path = require("node:path");

const projectRoot = path.join(__dirname, "..");
const sourceRoot = path.join(projectRoot, "src");

const assetsPath = path.join(sourceRoot, "assets");
const pagesPath = path.join(sourceRoot, "pages");
const outputPath = path.join(projectRoot, "build");
const zipPath = path.join(projectRoot, "dist");

const panelPath = path.join(pagesPath, "Panel");
const optionsPath = path.join(pagesPath, "Options");
const backgroundPath = path.join(pagesPath, "Background");

const manifestPath = path.join(sourceRoot, "manifest.json");

module.exports = {
  projectRoot,
  sourceRoot,
  assetsPath,
  pagesPath,
  manifestPath,
  outputPath,
  zipPath,
  entryPaths: {
    panel: path.join(panelPath, "index.tsx"),
    options: path.join(optionsPath, "index.tsx"),
    background: path.join(backgroundPath, "index.ts"),
  },
  htmlTemplates: {
    panel: path.join(panelPath, "index.html"),
    options: path.join(optionsPath, "index.html"),
  },
};
