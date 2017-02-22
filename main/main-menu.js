module.exports = function (app, dialog, main_window) {

  return {
    template: [
      {
        label: 'File',
        submenu: [
          {
            label: 'Open File...',
            click: () => {
              main_window.webContents.send('openFile');
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