var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var bgaudio = document.getElementById("bgaudio"); 
var oradius = canvas.height / 2;
var showdiag = true;
var numdiag = 2;
var playaudio = false;
var numpts = 2;
var up = true;

ctx.translate(oradius, oradius);
radius = oradius * 0.90
drawCircle();

myVar=setInterval(draw, 100);

function draw() {
	ctx.translate(-oradius, -oradius);
	ctx.clearRect(0, 0, 600, 600);
	ctx.translate(oradius, oradius);
	
	if((numpts == 2 && !up) || (numpts == 20 && up)) {
		up = !up;
		if(up) {
			numdiag = (numdiag < 16) ? numdiag * 2 : 2;
		}
	} 
	numpts = (up) ? numpts + 1 : numpts -1 ;
	
	
	if(showdiag) {
		CircleDrawDiagonals(numdiag, radius, "#74df00");
	}
	
	var diffangle = Math.PI / numdiag;
	for(i = 0; i < 2*numdiag; i++) {
		ctx.rotate(diffangle);
		for(j = 0; j < numpts; j++) {
			var pt1 = (radius*(j+1))/numpts;
			var pt2 = (radius*(numpts-j))/numpts;
			ctx.beginPath();
			ctx.lineWidth = "1";
			ctx.strokeStyle = "#74df00";
			ctx.moveTo(pt1, 0);
			ctx.lineTo(0, pt2);
			ctx.stroke();
		}
	}
	drawCircle();
}

function drawCircle() {
	ctx.beginPath();
	ctx.lineWidth = "3";
	ctx.arc(0, 0, radius, 0 , 2 * Math.PI);
	ctx.strokeStyle = "#74df00";
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