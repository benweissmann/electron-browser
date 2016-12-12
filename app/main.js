const {app, BrowserWindow, Menu} = require('electron');

let mainWindow;

app.on('window-all-closed', function() {
  app.quit();
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 1024, height: 768 });
  mainWindow.loadURL('file://' + __dirname + '/browser.html');

  const template = [
    {
      label: 'File',
      submenu: [
        {
          role: 'quit'
        },
      ],
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'reload',
          accelerator: 'CmdOrCtrl+R',
          click() {
            if (mainWindow) {
              mainWindow.webContents.send('reload');
            }
          },
        },
      ],
    },
    {
      label: 'Developer',
      submenu: [
        {
          label: 'Toggle Developer Tools (Renderer)',
          accelerator: 'CmdOrCtrl+I',
          click() {
            if (mainWindow) {
              mainWindow.webContents.toggleDevTools();
            }
          },
        },
        {
          label: 'Toggle Developer Tools (WebView)',
          accelerator: 'CmdOrCtrl+Shift+I',
          click() {
            if (mainWindow) {
              mainWindow.webContents.send('toggleWebviewDevTools');
            }
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
});
