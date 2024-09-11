# App Embedder for Retool

<br />
<br />
<p align="center" width="100%">
   <img src="src/assets/img/logo_256.png" />
</p>
Host a Retool app directly in Chome's Sidebar
<br />

## TODOs

- [ ] Publish to the Chrome Store

## Screenshots

!["Options Page Screenshot"](/screenshots/options.png?raw=true "Screenshot of the extension's options page")
!["Workflow App Name Provider Screenshot"](/screenshots/workflow.png?raw=true "Screenshot of the extension's workflow feature")

## Installing and Running

1. ~~Download and install from the [Chrome Web Store](https://chromewebstore.google.com/)~~. (not yet!)
2. Fill in your instance name.
3. Fill in an app name.
4. Open the SidePanel by clicking the button
5. Profit!

### Hacking On This:

1. Check if your [Node.js](https://nodejs.org/) version is >= **18**.
2. Clone this repository.
3. Run `npm install` to install the dependencies.
4. Run `npm start`
5. Load your extension on Chrome following:
   1. Access `chrome://extensions/`
   2. Check `Developer mode`
   3. Click on `Load unpacked extension`
   4. Select the `build` folder.

---

Based off the work in [Chrome Extension Boilerplate React](https://github.com/lxieyang/chrome-extension-boilerplate-react.git)
[Icons created by iconixar - Flaticon](https://www.flaticon.com/free-icons/business-and-finance "business and finance icons")
