const { app, BrowserWindow, Menu} = require('electron')
const path = require('path');
const url = require('url');

let win;
let pdfUploadWindow;
  
function createWindow () {
  // Create the browser window.
	win = new BrowserWindow({ width: 800, height: 600 });
  	var python = require('child_process').spawn('python',['./helloworld.py']);
  	python.stdout.on('data', function(data) {
  		console.log("data: ", data.toString('utf8'));
  	})

    //and load the index.html of the app.
    win.loadFile('index.html');

    // const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    // Menu.setApplicationMenu(mainMenu);

    //Open devtools
    // win.webContents.openDevTools();

    win.on('closed', () => {
    	app.quit();
    })
}
  


const mainMenuTemplate = [
  {
  	label: 'File',
  	submenu:[
  		{
  			label: 'Open Past Study Plan',
  			click(){
          switchToPDFUploadWindow();
  				//load study plan
  			}
  		},
  	{
  		label: 'Clear Items'
  	},
  	{
  		label: 'Quit',
  		accelerator: process.platform == 'darwin' ? 'Command+Q' :
  		'Ctrl+Q',
  		click() {
  			app.quit();
  		}
  	}
  	]
  }
];



	//create window
	app.on('ready', createWindow)

	function switchToPDFUploadWindow() {
    win.loadFile('AddExam.html');

    //garbage collection
	win.on('close', function() {
   		win = null;
	});

}

  //quit when all windows are closed
  app.on('window-all-closed', () => {
  	if(process.platform !== 'darwin') {
  		app.quit();
  	}
  });
  
 // if mac, add empty object to menu
if (process.platform == 'darwin') {
	mainMenuTemplate.unshift({}); //adds to the beginning of the menu array
}