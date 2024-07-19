<img src="src/assets/img/icon-128.png" width="64"/>

# Chrome Extension - Retool Embedder

## Installing and Running

### Procedures:

1. Check if your [Node.js](https://nodejs.org/) version is >= **18**.
2. Clone this repository.
3. Change the package's `name`, `description`, and `repository` fields in `package.json`.
4. Change the name of your extension on `src/manifest.json`.
5. Run `npm install` to install the dependencies.
6. Run `npm start`
7. Load your extension on Chrome following:
   1. Access `chrome://extensions/`
   2. Check `Developer mode`
   3. Click on `Load unpacked extension`
   4. Select the `build` folder.
8. Happy hacking.

---

Based off the work in [Chrome Extension Boilerplate React](https://github.com/lxieyang/chrome-extension-boilerplate-react.git)
