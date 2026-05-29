const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onGlobalKeydown: (callback) => {
    ipcRenderer.on('global-keydown', () => callback());
  },
});
