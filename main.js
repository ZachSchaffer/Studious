// JavaScript source code
const electron = require('electron')

const { app, BrowserWindow } = require('electron')

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({ width: 800, height: 600 })
  	var python = require('child_process').spawn('python',['./helloworld.py']);
  	python.stdout.on('data', function(data) {
  		console.log("data: ", data.toString('utf8'));
  	})
    // and load the index.html of the app.
    win.loadFile('index.html')
}
  
app.on('ready', createWindow)
    
