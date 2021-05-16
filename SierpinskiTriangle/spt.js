
var iterations = 100;
var radius = 4;
var trianglePoints = [];
var ChaosPoints = [];
var run = false;
var hu = 0;


function setup() {
  createCanvas(600, 600);
  colorMode(HSB);
  trianglePoints = [];
  //for(var i = 0; i < 3; i++) {
//	  var Point = randomPoint();
//	  trianglePoints[i] = Point;
//  }
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
    fill(ChaosPoints[i].hu, 255, 100, 200);
	ellipse(ChaosPoints[i].x, ChaosPoints[i].y, 1, 1);
  }
  
  if(run) {
	  var lastpoint = ChaosPoints[ChaosPoints.length - 1];
	  var secondlastpoint = ChaosPoints[ChaosPoints.length - 2];
	  ChaosPoints.push(newPointinTriangle(lastpoint, secondlastpoint));
	  
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
	var hu = 250;
	//if(vertexIndex == 0) { 
	//	if(a.vertexIndex == 0) { 
	//		if(b.vertexIndex == 0) { hu = 0; }
	//		else if(b.vertexIndex == 1) { hu = 15; }
	//		else { hu = 30; }
	//	}
	//	else if(a.vertexIndex == 1) {
	//		if(b.vertexIndex == 0) { hu = 45; }
		//	else if(b.vertexIndex == 1) { hu = 60; }
			//else { hu = 75; }
		//}
		//else {
		//	if(b.vertexIndex == 0) { hu = 90; }
		//	else if(b.vertexIndex == 1) { hu = 105; }
			//else { hu = 120; }
		//}
	//}
	//else if(vertexIndex == 1) {
	//	if(a.vertexIndex == 0) { hu = 90; }
	//	else if(a.vertexIndex == 1) { hu = 120; }
	//	else { hu = 150; }		
	//}
	//else if(vertexIndex == 2) {
	//	if(a.vertexIndex == 0) { hu = 180; }
	//	else if(a.vertexIndex == 1) { hu = 210; }
//		else { hu = 240; }
//	}
	hu = 30*vertexIndex + 60*a.vertexIndex + 90*b.vertexIndex;
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
}

function Play(cmd) {
	run = cmd;
	//setup();
}