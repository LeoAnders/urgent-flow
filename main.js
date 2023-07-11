const { app, BrowserWindow } = require("electron");
const path = require("path")

const isDev =
  process.env.NODE_ENV !== undefined && process.env.NODE_ENV === "development"
    ? true
    : false;

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 834,
    show: false,
    icon: path.join(__dirname,"assets", "icons", "fast-delivery_256x256.png" ),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: true,
      accelerator: true
    },
  });

  win.loadURL("http://localhost:3000");
  if(isDev){
    win.webContents.openDevTools()
   }

  win.once("ready-to-show", () => {
    win.show();
  });
}

app.whenReady().then(() => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});