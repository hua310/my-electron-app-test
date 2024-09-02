const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const fs = require('fs')
const path = require('path')

const writeFile = (event, data) => {
  let options = {
    title : "打开文件", 
    defaultPath : "",
    buttonLabel : "打开",
    filters: [
      { name: 'Text Files', extensions: ['txt'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    properties: ['showOverwriteConfirmation']
   }
  const result = dialog.showSaveDialogSync(options);
  if (result && result.length > 0) {
    fs.writeFileSync(result, data);
  }
}

function readFile() {
  let options = {
    title : "打开文件", 
    defaultPath : "",
    buttonLabel : "打开",
    filters: [
      { name: 'Text Files', extensions: ['txt'] },
    ],
    properties: ['openFile']
  }
  const result = dialog.showOpenDialogSync(options);
   const res = fs.readFileSync(result[0]).toString()
   return res
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
      autoHideMenuBar: true,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
    }
  })
    
  ipcMain.on('save-file', writeFile)
  ipcMain.handle('read-file', readFile)
  win.loadFile('./page/index.html')
}
console.log(process.versions.electron);

app.whenReady().then(() => {
    createWindow() 
  
    // 针对 MacOs, 当应用被激活时，立即创建一个窗口
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
      }
    })
  })
  
//   当所有的窗口都关闭了，如果不是苹果系统，则直接退出程序 
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })