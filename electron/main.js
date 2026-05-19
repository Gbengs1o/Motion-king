const path = require("path");
const fs = require("fs");
const { app, BrowserWindow, clipboard, dialog, ipcMain, nativeImage, shell } = require("electron");
const { startServer } = require("../server");

let mainWindow;
let webServer;
let appUrl;
const logPath = path.join(__dirname, "..", "electron.log");

process.on("uncaughtException", logError);
process.on("unhandledRejection", logError);

app.commandLine.appendSwitch("ignore-gpu-blocklist");
app.commandLine.appendSwitch("enable-gpu-rasterization");
app.commandLine.appendSwitch("enable-accelerated-2d-canvas");
app.setAppUserModelId("MotionKing");

ipcMain.handle("file:open", async (event) => {
  const ownerWindow = BrowserWindow.fromWebContents(event.sender) || mainWindow;
  const result = await dialog.showOpenDialog(ownerWindow, {
    title: "Open HTML or SVG",
    properties: ["openFile"],
    filters: [
      { name: "Web files", extensions: ["html", "htm", "svg"] },
      { name: "All files", extensions: ["*"] }
    ]
  });

  if (result.canceled || result.filePaths.length === 0) {
    return null;
  }

  return readFileSnapshot(result.filePaths[0]);
});

ipcMain.handle("file:read", async (_event, filePath) => {
  return readFileSnapshot(filePath);
});

ipcMain.handle("clipboard:copyPng", async (_event, dataUrl) => {
  const image = nativeImage.createFromDataURL(dataUrl);
  if (image.isEmpty()) {
    throw new Error("Could not copy an empty image.");
  }

  clipboard.writeImage(image);
  return true;
});

ipcMain.handle("window:new", () => {
  createWindow(appUrl);
  return true;
});

const gotLock = app.requestSingleInstanceLock();

if (!gotLock) {
  app.quit();
} else {
  app.on("second-instance", () => {
    createWindow(appUrl);
  });

  app.whenReady().then(async () => {
    const started = await startServer(0);
    webServer = started.server;
    appUrl = started.url;
    createWindow(appUrl);
  }).catch(logError);

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      const started = webServer ? null : await startServer(0);
      if (started) {
        webServer = started.server;
        appUrl = started.url;
      }
      createWindow(appUrl);
    }
  });

  app.on("before-quit", () => {
    if (webServer) {
      webServer.close();
      webServer = null;
    }
  });
}

function createWindow(url) {
  if (!url) return;

  log(`Opening ${url}`);

  const window = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 980,
    minHeight: 680,
    title: "MotionKing",
    icon: path.join(__dirname, "..", "assets", "MotionKing.ico"),
    backgroundColor: "#f4f6f8",
    autoHideMenuBar: true,
    show: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      backgroundThrottling: false,
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  mainWindow = window;

  window.loadURL(url);
  window.webContents.on("did-fail-load", (_event, code, description) => {
    log(`Load failed ${code}: ${description}`);
  });

  window.webContents.setWindowOpenHandler(({ url: targetUrl }) => {
    shell.openExternal(targetUrl);
    return { action: "deny" };
  });

  window.on("closed", () => {
    if (mainWindow === window) {
      mainWindow = BrowserWindow.getAllWindows()[0] || null;
    }
  });
}

function log(message) {
  fs.mkdirSync(path.dirname(logPath), { recursive: true });
  fs.appendFileSync(logPath, `${new Date().toISOString()} ${message}\n`);
}

function logError(error) {
  log(error && error.stack ? error.stack : String(error));
}

async function readFileSnapshot(filePath) {
  const stat = await fs.promises.stat(filePath);
  const content = await fs.promises.readFile(filePath, "utf8");

  return {
    path: filePath,
    name: path.basename(filePath),
    content,
    mtimeMs: stat.mtimeMs,
    size: stat.size
  };
}
