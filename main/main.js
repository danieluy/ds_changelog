"use strict";

const { app, BrowserWindow, ipcMain, Menu, dialog, globalShortcut } = require('electron')
const path = require('path')
const url = require('url')
const fs = require('fs');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let main_window = undefined;
let main_menu = undefined;


// uncoment for development
const main_ulr = 'http://localhost:3000';

// uncoment for production
// const main_ulr = url.format({
//   pathname: path.join(__dirname, '../react_client/build/index.html'),
//   protocol: 'file:',
//   slashes: true
// })

function createWindow() {
  // Create the browser window.
  main_window = new BrowserWindow({ width: 1280, height: 768 })
  main_menu = require('./main-menu')(app, dialog, main_window);

  main_window.loadURL(main_ulr);

  main_window.setMenu(null);


  const menu_template = main_menu.template;
  Menu.setApplicationMenu(Menu.buildFromTemplate(menu_template));

  main_window.saveFile = function (data, cb) {
    fs.writeFile(data.path, data.content, function (err) {
      cb(err);
    })
  }

  main_window.openFile = function () {
    dialog.showOpenDialog(function (filePaths) {
      if (filePaths) {
        main_window.webContents.send('openFileRes', {
          path: filePaths[0],
          content: fs.readFileSync(filePaths[0], 'UTF-8')
        });
      }
    });
  }

  // Open the DevTools.
  // main_window.webContents.openDevTools()

  // Emitted when the window is closed.
  main_window.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    main_window = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();


  globalShortcut.register('CommandOrControl+O', () => {
    main_window.webContents.send('openFile');
  })

  globalShortcut.register('CommandOrControl+S', () => {
    main_window.webContents.send('saveFile');
  })


  // Development
  globalShortcut.register('F12', () => {
    main_window.webContents.toggleDevTools();
  })
  globalShortcut.register('F5', () => {
    main_window.loadURL(main_ulr)
  })
})

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (main_window === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on('openFile', (event, arg) => {
  main_window.openFile();
})

ipcMain.on('saveFile', (event, data) => {
  main_window.saveFile(data, function (err) {
    if (err)
      event.sender.send('saveFileRes', { err: err })
    else
      event.sender.send('saveFileRes', { err: null })
  });
})