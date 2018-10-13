const { app, BrowserWindow, Menu} = require('electron')
const path = require('path');
const url = require('url');

let win;
let addWindow;
  
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

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    Menu.setApplicationMenu(mainMenu);

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
  			label: 'Add New Exam',
  			click(){
  				createAddWindow();
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

	function createAddWindow() {
		addWindow = win;
		addWindow.loadURL(url.format({
    		pathname: path.join(__dirname, 'AddExam.html'),
    		protocol: 'file:',
    		slashes: true
	}));

    //garbage collection
	addWindow.on('close', function() {
   		addWindow = null;
	});

}

  //quit when all windows are closed
  app.on('window-all-closed', () => {
  	if(process.platform !== 'darwin') {
  		app.quit();
  	}
  });

  // if (process.env.NODE_ENV !== 'production') {
  // 	mainMenuTemplate.push({
  // 		label: 'Developer Tools',
  // 		submenu: [
  // 			{
  // 				label: 'Toggle DevTools',
  // 				accelerator: process.platform == 'darwin' ? 'Command+I' :
  // 				'Ctrl+I',
  // 				click(item, focusedWindow) {
  // 					focusWindow.toggleDevTools();
  // 				}
  // 			},
  // 			{
  // 				role: 'reload'
  // 			}
  // 		]
  // 	})
  // }
 // if mac, add empty object to menu
if (process.platform == 'darwin') {
	mainMenuTemplate.unshift({}); //adds to the beginning of the menu array
}