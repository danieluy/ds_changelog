const fs = require('fs');

module.exports = function (app, dialog, main_window) {

  const openFile = function () {
    dialog.showOpenDialog(function (filePaths) {
      if (filePaths) {
        main_window.webContents.send('openFile', {
          path: filePaths[0],
          content: fs.readFileSync(filePaths[0], 'UTF-8')
        });
      }
    });
  }

  return {
    openFile: openFile,
    template: [
      {
        label: 'File',
        submenu: [
          {
            label: 'Open File...',
            click: () => {
              openFile();
            }
          },
          {
            type: 'separator'
          },
          {
            label: 'Save',
            click: () => {
              main_window.webContents.send('saveFile');
            }
          },
          {
            type: 'separator'
          },
          {
            label: 'Quit',
            click: () => {
              app.quit();
            }
          }
        ]
      },
      {
        label: 'View',
        submenu: [
          {
            label: 'Toggle Developer Tools',
            click: () => {
              main_window.webContents.toggleDevTools()
            }
          }
        ]
      }
    ]
  }
}