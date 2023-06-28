
const {app, BrowserWindow, menu} =require("electron") ;
const isDev = process.env.NODE_ENV !==undefined && process.env.NODE_ENV === "development" ?true : false ;

function createWindow(){
    const win = new BrowserWindow({
      width:1280,
      height:832,
      show: false,
      webPreferences: {
        nodeIntegration: true
      },
    })

    win.loadFile("./src/index.html")
    if(isDev){
      win.webContents.openDevTools()
    }

    win.once("ready-to-show", ()=>{
      win.show()
    })

}

app.whenReady().then(()=>{
  if(BrowserWindow.getAllWindows().length === 0){
      createWindow()
  }
  
})