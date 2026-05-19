const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("motionKing", {
  newWindow: () => ipcRenderer.invoke("window:new"),
  openFile: () => ipcRenderer.invoke("file:open"),
  readFile: (filePath) => ipcRenderer.invoke("file:read", filePath),
  copyPng: (dataUrl) => ipcRenderer.invoke("clipboard:copyPng", dataUrl),
  captureRegion: (rect) => ipcRenderer.invoke("window:captureRegion", rect)
});
