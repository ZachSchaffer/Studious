function MyFunction(){
	var app = require('electron').remote; 
	var dialog = app.dialog;
	var fs = require('fs');

	dialog.showOpenDialog((fileNames) => {
    // fileNames is an array that contains all the selected
    if(fileNames === undefined){
        console.log("No file selected");
        return;
    }

    fs.readFile(filepath, 'utf-8', (err, data) => {
        if(err){
            alert("An error ocurred reading the file :" + err.message);
            return;
        }

        // Change how to handle the file content
        console.log("The file content is : " + data);
    });
});
 

// Note that the previous example will handle only 1 file, if you want that the dialog accepts multiple files, then change the settings:
// And obviously , loop through the fileNames and read every file manually
dialog.showOpenDialog({ 
    properties: [ 
        'openFile', 'multiSelections', (fileNames) => {
            console.log(fileNames);
        }
    ]
});
 

// Note that the previous example will handle only 1 file, if you want that the dialog accepts multiple files, then change the settings:
// And obviously , loop through the fileNames and read every file manually
/*dialog.showOpenDialog({ 
    properties: [ 
        'openFile', 'multiSelections', (fileNames) => {
            console.log(fileNames);
        }
    ]
});*/

}

function test(x){
	console.log(x);
}

function addJsonNode(name){
	console.log(name);
}

