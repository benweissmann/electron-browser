Based on https://github.com/hokein/electron-sample-apps/tree/master/webview/browser but stripped down to the bare minimum, and added some menu items for easy debugging.

Install dependencies: `npm install`

Run: `npm start`

Open the dev tools for the renderer with CmdOrCtrl+I and the dev tools for the webview with CmdOrCtrl+Shift+I. Reload the page with CmdOrCtrl+R.

Build a .app for MacOS: `npm run build:macos`

Build a .exe installer for windows (64-bit): `npm run build:win`
