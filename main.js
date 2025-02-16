// main.js
const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

//   const indexPath = path.join(__dirname, "client", "index.html");
//   const fileURL = `file://${indexPath.replace(/\\/g, "/")}`;

//   mainWindow.loadURL(`./client/index.html`);

  mainWindow.loadURL(`http://localhost:3001`);


  // Open the DevTools in development
  if (process.env.NODE_ENV === "development") {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  if (mainWindow === null) createWindow();
});

console.log("Main process is running");
