var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var bgaudio = document.getElementById("bgaudio"); 
var oradius = canvas.height / 2;
var showdiag = true;
var numdiag = 2;
var playaudio = false;
var runangle = 0;

ctx.translate(oradius, oradius);
radius = oradius * 0.90
drawCircle();

var myVar=setInterval(draw, 20);
function draw() {
	ctx.translate(-oradius, -oradius);
	ctx.clearRect(0, 0, 600, 600);
	ctx.translate(oradius, oradius);
	
	if(runangle < 2*Math.PI) {
		runangle = runangle + 0.01 * Math.PI;
	} else {
		runangle = 0;
		numdiag = (numdiag < 32) ? numdiag + 2 : 2;
	}
	
	if(showdiag) {
		CircleDrawDiagonals(numdiag, radius, "#f8f8ff");
	}
	
	var diffangle = Math.PI / numdiag;
	for(i = 0; i < numdiag; i++) {
		var startangle = i * diffangle;
		var PointC = CirclePoints(radius-6, startangle + runangle, [0,0]);
		ctx.rotate(startangle);
		
		ctx.beginPath();
		ctx.arc(PointC.x, 0, 8, 0 , 2 * Math.PI);
		ctx.fillStyle = "orange";
		ctx.fill();
		
		ctx.rotate(-startangle);
	}
	drawCircle();
	
}

function drawCircle() {
	ctx.beginPath();
	ctx.lineWidth = "3";
	ctx.arc(0, 0, radius, 0 , 2 * Math.PI);
	ctx.strokeStyle = "white";
	ctx.stroke();
}

function CirclePoints(radius, angle, origin) {
	var x = radius * Math.cos(angle) + origin[0];
	var y = radius * Math.sin(angle) + origin[1];
	
	return {x, y};
}

function CircleDrawDiagonals(num, radius, color) {
	var diffangle = Math.PI / num;
	for(i = 0; i < num; i++) {
		var startangle = i * diffangle;
		var pointA = CirclePoints(radius, startangle, [0,0]);
		var pointB = CirclePoints(radius, startangle + Math.PI, [0,0]);
		
		if(showdiag) {
			ctx.beginPath();
			ctx.lineWidth = "1";
			ctx.strokeStyle = color;
			ctx.moveTo(pointA.x, pointA.y);
			ctx.lineTo(pointB.x, pointB.y);
			ctx.stroke();
		}		
	}
}

function audioplay(pause) {
	if(pause) {
		bgaudio.pause();
	}
	else if (playaudio) {
		bgaudio.play();
	}
}

function goFullScreen(){
    if(canvas.requestFullScreen)
        canvas.requestFullScreen();
    else if(canvas.webkitRequestFullScreen)
        canvas.webkitRequestFullScreen();
    else if(canvas.mozRequestFullScreen)
        canvas.mozRequestFullScreen();
	drawCF();
}