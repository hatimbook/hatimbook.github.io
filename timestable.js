var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var bgaudio = document.getElementById("bgaudio"); 
var factorlabel = document.getElementById("factorlabel");
var points = document.getElementById("NumPts");

var speed = 10;
var factor = 1.000;

var dualColor = false;
var audioenabled = false;
var isRunning = false;
factorlabel.innerHTML = factor.toFixed(2);

var canvas_radius;
var circle_radius;
drawCircle();

		
function drawCircle() {
	canvas_radius = canvas.height / 2;
	ctx.translate(canvas_radius, canvas_radius);
	
	circle_radius = canvas_radius * 0.90;
	ctx.beginPath();
	ctx.lineWidth = "3";
	ctx.arc(0, 0, circle_radius, 0 , 2 * Math.PI);
	ctx.strokeStyle = "white";
	ctx.stroke();
	
	ctx.translate(-canvas_radius, -canvas_radius);
}

function drawTT() {		
	var numofpts = points.value;
	var delta = (2 * Math.PI) / numofpts;
	
	factor = factor < 100.000 ? factor + 0.001 : 1.000;
	factorlabel.innerHTML = factor.toFixed(2);
	
	if(dualColor) {
		var c1 = parseInt((10*factor * 2.500) % 250);
		var c2 = parseInt(250 - ((10 *factor * 2.500)%250));
	}

	ctx.clearRect(0, 0, canvas.width-3, canvas.height-3);
	ctx.translate(canvas_radius, canvas_radius);
	
	for (i = 0; i < numofpts; i++) {
		var a = (i % numofpts) * delta;
		var b = ((i * factor) % numofpts) * delta;
		var pointA = CirclePoints(circle_radius, a, [0, 0]);
		var pointB = CirclePoints(circle_radius, b, [0, 0]);
		ctx.beginPath();
		ctx.lineWidth = "1";
		if(dualColor) {
			ctx.strokeStyle = (i % 2) ? "rgb("+c1+","+c2+", 125)" : "rgb("+c2+","+c1+", 125)";
		} else {
			ctx.strokeStyle = "#f8f8ff";
		}
		ctx.moveTo(pointA.x, pointA.y);
		ctx.lineTo(pointB.x, pointB.y);
		ctx.stroke();
	}
	ctx.translate(-canvas_radius, -canvas_radius);
	drawCircle();
}

function setSpeed(s) {
	if(isRunning) {
		clearInterval(myVar);
		myVar=setInterval(drawTT, s)
	}
	else {
		speed = s;
	}
}

function CirclePoints(radius, angle, origin) {
	var x = radius * Math.cos(angle) + origin[0];
	var y = radius * Math.sin(angle) + origin[1];
	
	return {x, y};
}

function SingleDraw() {
	if(!isRunning) {	
		factor = parseFloat(document.getElementById("input_factor").value);
		drawTT();
	}
}

function audioplay() {
	if (isRunning && audioenabled) {
		bgaudio.play();
	} else {
		bgaudio.pause();
	}
	
}

window.onload = window.onresize = function() {
    if(window.innerWidth < window.innerHeight) {
		canvas.width = canvas.height = window.innerWidth * 0.75;
	} else {
		canvas.width = canvas.height = window.innerHeight * 0.75;
	}
	drawCircle();
}