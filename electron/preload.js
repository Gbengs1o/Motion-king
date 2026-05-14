const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("motionKing", {
  openFile: () => ipcRenderer.invoke("file:open"),
  readFile: (filePath) => ipcRenderer.invoke("file:read", filePath),
  copyPng: (dataUrl) => ipcRenderer.invoke("clipboard:copyPng", dataUrl)
});
