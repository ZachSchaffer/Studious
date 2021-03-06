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
	
}

function addJsonNode(nameTopic){
	var fs = require('fs');
	console.log(name);
	var json = JSON.parse(fs.readFileSync('data.json', 'utf8'));
	json[nameTopic] = {};
	json[nameTopic].count = 0; 

	 fs.writeFile('data.json', JSON.stringify(json), (err) => {
        if(err){
            alert("An error ocurred creating the file "+ err.message)
        }
                    
    });
	document.getElementById('slide3').scrollIntoView();
}

function addJsonProperty(nameTopic,arrProperty){
	var fs = require('fs');
	console.log(name);
	arrProperty = arrProperty.split(',');
	arrProperty.map(element=>element.trim());
	var json = JSON.parse(fs.readFileSync('data.json', 'utf8'));
	json[nameTopic].words  = arrProperty; 
	document.getElementById('keyword').value = "";

	 fs.writeFile('data.json', JSON.stringify(json), (err) => {
        if(err){
            alert("An error ocurred creating the file "+ err.message)
        }
                    
    });
	document.getElementById('slide3').scrollIntoView();
}

function addAnother(){
	document.getElementById('topic').value = "";
	document.getElementById('topic').value = "";
	document.getElementById('slide2').scrollIntoView();	
}

function beginScan(){
	var python = require('child_process').spawn('python3',['./mainPDFReader.py']);
      python.stdout.on('data', async function(data) {
        
      	await sleep(5000);

  var fs = require('fs');
	var json = JSON.parse(fs.readFileSync('data.json', 'utf8'));
	console.log(json);

	let arrData = [];
	let arrNames = [];

	Object.keys(json).forEach(function(key,index) {
    arrData.push(json[key].count);
    arrNames.push(key);
});
    var dataset =  arrData;//change to show different data

// let colors = ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd'];
// let colors = ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#e0e0e0', '#bababa', '#878787', '#4d4d4d', '#1a1a1a'];
var colors = ['#9e0142', '#d53e4f', '#f46d43', '#fdae61', '#fee08b', '#e6f598', '#abdda4', '#66c2a5', '#3288bd', '#5e4fa2'];

var width = document.querySelector('.chart-wrapper').offsetWidth;
var height = document.querySelector('.chart-wrapper').offsetHeight;
var minOfWH = Math.min(width, height) / 2;
var initialAnimDelay = 300;
var arcAnimDelay = 150;
var arcAnimDur = 3000;
var secDur = 1000;
var secIndividualdelay = 150;

var radius = void 0;

// calculate minimum of width and height to set chart radius
if (minOfWH > 200) {
  radius = 200;
} else {
  radius = minOfWH;
}

// append svg
var svg = d3.select('.chart-wrapper').append('svg').
attr({
  'width': width,
  'height': height,
  'class': 'pieChart' }).

append('g');

svg.attr({
  'transform': 'translate(' + width / 2 + ', ' + height / 2 + ')' });


// for drawing slices
var arc = d3.svg.arc().outerRadius(radius * 0.6).innerRadius(radius * 0.45);

// for labels and polylines
var outerArc = d3.svg.arc().innerRadius(radius * 0.85).outerRadius(radius * 0.85);

// d3 color generator
// let c10 = d3.scale.category10();

var pie = d3.layout.pie().value(function (d) {return d;});

var draw = function draw() {

  svg.append("g").attr("class", "lines");
  svg.append("g").attr("class", "slices");
  svg.append("g").attr("class", "labels");

  // define slice
  var slice = svg.select('.slices').
  datum(dataset).
  selectAll('path').
  data(pie);
  slice.
  enter().append('path').
  attr({
    'fill': function fill(d, i) {return colors[i];},
    'd': arc,
    'stroke-width': '25px',
    'transform': function transform(d, i) {return 'rotate(-180, 0, 0)';} }).

  style('opacity', 0).
  transition().
  delay(function (d, i) {return i * arcAnimDelay + initialAnimDelay;}).
  duration(arcAnimDur).
  ease('elastic').
  style('opacity', 1).
  attr('transform', 'rotate(0,0,0)');

  slice.transition().
  delay(function (d, i) {return arcAnimDur + i * secIndividualdelay;}).
  duration(secDur).
  attr('stroke-width', '5px');

  var midAngle = function midAngle(d) {return d.startAngle + (d.endAngle - d.startAngle) / 2;};

  var text = svg.select(".labels").selectAll("text").
  data(pie(dataset));

  text.enter().
  append('text').
  attr('dy', '0.35em').
  style("opacity", 0).
  style('fill', function (d, i) {return colors[i];}).
  text(function (d, i) {return arrNames[i];}).
  attr('transform', function (d) {
    // calculate outerArc centroid for 'this' slice
    var pos = outerArc.centroid(d);
    // define left and right alignment of text labels                           
    pos[0] = radius * (midAngle(d) < Math.PI ? 1 : -1);
    return 'translate(' + pos + ')';
  }).
  style('text-anchor', function (d) {return midAngle(d) < Math.PI ? "start" : "end";}).
  transition().
  delay(function (d, i) {return arcAnimDur + i * secIndividualdelay;}).
  duration(secDur).
  style('opacity', 1);

  var polyline = svg.select(".lines").selectAll("polyline").
  data(pie(dataset));

  polyline.enter().
  append("polyline").
  style("opacity", 0.5).
  attr('points', function (d) {
    var pos = outerArc.centroid(d);
    pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
    return [arc.centroid(d), arc.centroid(d), arc.centroid(d)];
  }).
  transition().
  duration(secDur).
  delay(function (d, i) {return arcAnimDur + i * secIndividualdelay;}).
  attr('points', function (d) {
    var pos = outerArc.centroid(d);
    pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
    return [arc.centroid(d), outerArc.centroid(d), pos];
  });
};

draw();

document.getElementById('slide4').scrollIntoView();

});}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}