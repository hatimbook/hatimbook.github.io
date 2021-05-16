
var iterations = 100;
var radius = 4;
var trianglePoints = [];
var ChaosPoints = [];
var run = false;

function setup() {
  createCanvas(600, 600);
  colorMode(HSB);
  trianglePoints = [];

  var Point = randomPoint(); Point.y = radius; 
  trianglePoints[0] = Point;
  Point = randomPoint(); Point.y = height - radius; 
  trianglePoints[1] = Point;
  Point = randomPoint(); Point.x = width-radius; 
  trianglePoints[2] = Point;
  
  ChaosPoints = [];
  ChaosPoints[0] = randomPointinTriangle(trianglePoints);
  ChaosPoints[1] = ChaosPoints[0];
}

function draw() {
  background(0);
  
  for (var i = 0; i < trianglePoints.length; i++) {
    noStroke();
    fill(360, 255, 255);
	ellipse(trianglePoints[i].x, trianglePoints[i].y, radius*2, radius*2);
  }
  
  for (var i = 0; i < ChaosPoints.length; i++) {
    noStroke();
    fill(ChaosPoints[i].hu, 255, 255, 255);
	ellipse(ChaosPoints[i].x, ChaosPoints[i].y, 1, 1);
  }
  
  if(run && ChaosPoints.length < 100000) {
	  for(var i= 0 ; i < 50; i++) {
		var lastpoint = ChaosPoints[ChaosPoints.length - 1];
		var secondlastpoint = ChaosPoints[ChaosPoints.length - 2];
		ChaosPoints.push(newPointinTriangle(lastpoint, secondlastpoint));
	  }
  }
}


function randomPoint() {
  var x = random(width);
  var y = random(height);
  return { x, y};
}

function CalcMidpoint(a, b) {
	var x = (a.x + b.x) / 2;
	var y = (a.y + b.y) / 2;
	
	return {x, y};
}


function randomPointinTriangle(Points) {	
    var p = random();
    var q = random();

    if (p + q > 1) {
      p = 1 - p
      q = 1 - q
    }
		
    // A + AB * p + BC * q
    var x = Points[0].x + (Points[1].x - Points[0].x) * p + (Points[2].x - Points[0].x) * q;
    var y = Points[0].y + (Points[1].y - Points[0].y) * p + (Points[2].y - Points[0].y) * q;
	var hu = 0;
	var vertexIndex = 0;
    return { x, y, hu, vertexIndex };
}

function newPointinTriangle(a, b) {
	var vertexIndex = floor(random() * trianglePoints.length);
	var vertex = trianglePoints[vertexIndex];
	var midpoint = CalcMidpoint(a, vertex);
	var x = midpoint.x;
	var y = midpoint.y;
	var hu = 117*vertexIndex + 39*a.vertexIndex + 13*b.vertexIndex;
	return {x, y, hu, vertexIndex };
}

function goFullScreen(){
    if(canvas.requestFullScreen)
        canvas.requestFullScreen();
	//else if (elem.webkitRequestFullscreen)
	//	elem.webkitRequestFullscreen();
    else if(canvas.webkitRequestFullScreen)
        canvas.webkitRequestFullScreen();
    else if(canvas.mozRequestFullScreen)
        canvas.mozRequestFullScreen();
	
	run = true;
}

function Play(cmd) {
	run = cmd;
}