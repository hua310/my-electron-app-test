console.log('preload.js');
const { contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('myApi', {
    verson: process.versions.electron,
    saveFile: (data) => {
        ipcRenderer.send('save-file', data);
    },
    readFile() {
      return ipcRenderer.invoke('read-file');
    }
})