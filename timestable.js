var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
var speed = 10;
var dualColor = false;
var playaudio = false;
var isRunning = false;
var bgaudio = document.getElementById("bgaudio"); 
		
var factor = 1.000;
ctx.translate(radius, radius);
radius = radius * 0.90
document.getElementById("factorlabel").innerHTML = factor.toFixed(2);
drawCircle();
		
function drawCircle() {
	ctx.beginPath();
	ctx.lineWidth = "3";
	ctx.arc(0, 0, radius, 0 , 2 * Math.PI);
	ctx.strokeStyle = "white";
	ctx.stroke();
}

function drawTT() {		
	var numofpts = document.getElementById("NumPts").value;
	var delta = (2 * Math.PI) / numofpts;
	
	factor = factor < 100.000 ? factor + 0.001 : 1.000;
	document.getElementById("factorlabel").innerHTML = factor.toFixed(2);
			
	ctx.translate(-radius, -radius);
	ctx.clearRect(0, 0, 600, 600);
	ctx.translate(radius, radius);
	
	for (i = 0; i < numofpts; i++) {
		var a = (i % numofpts) * delta;
		var b = ((i * factor) % numofpts) * delta;
		var pointA = CirclePoints(radius, a, [0, 0]);
		var pointB = CirclePoints(radius, b, [0, 0]);
		ctx.beginPath();
		ctx.lineWidth = "1";
		if(dualColor) {
			if (i % 2 == 0) {
				var r = parseInt((10*factor * 2.500) % 250);
				var g = parseInt(250 - ((10 *factor * 2.500)%250));
				ctx.strokeStyle = "rgb("+r+","+g+", 125)"; 
			} else {
				ctx.strokeStyle = "rgb("+g+","+r+", 125)"; 
			}
		} else {
			ctx.strokeStyle = "#f8f8ff";
		}
		ctx.moveTo(pointA.x, pointA.y);
		ctx.lineTo(pointB.x, pointB.y);
		ctx.stroke();
	}
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

function audioplay(pause) {
	if(pause) {
		bgaudio.pause();
	}
	else if (playaudio) {
		bgaudio.play();
	}
}