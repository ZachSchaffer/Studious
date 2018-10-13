const { app, BrowserWindow } = require('electron')
const path = require('path');
const url = require('url');

let win;
  
  function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({ width: 800, height: 600 })
  	var python = require('child_process').spawn('python',['./helloworld.py']);
  	python.stdout.on('data', function(data) {
  		console.log("data: ", data.toString('utf8'));
  	})
    //and load the index.html of the app.
    win.loadURL(url.format({
    	pathname: path.join(__dirname, 'index.html'),
    	protocol: 'file:',
    	slashes: true
    }));

    //Open devtools
    win.webContents.openDevTools();

    win.on('closed', () => {
    	win = null;
    })
  }
  
  //create window
  app.on('ready', createWindow)

  //quit when all windows are closed
  app.on('window-all-closed', () => {
  	if(process.platform !== 'darwin') {
  		app.quit();
  	}
  });