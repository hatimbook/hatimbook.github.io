var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var bgaudio = document.getElementById("bgaudio"); 
var playaudio = false;

var oradius = canvas.height / 2;
var speed = 0.002;

var runangle = 0;
var rollangle = 0;
var pause = false;

var iradius = parseInt(document.getElementById("InnerRadius").value);
var rollfactor = parseInt(document.getElementById("RollFactor").value)/10 + 0.05;
var pointoffset = parseInt(document.getElementById("PointOffset").value);

var RollFactorlabel = document.getElementById("RollFactorLabel");
RollFactorlabel.innerHTML = "Roll Factor: " + rollfactor.toFixed(2);

ctx.translate(oradius, oradius);
radius = oradius * 0.90

var multicolor = true;
var rollcount = 0;
var c1 = 125;
var c2 = 125;

var myVar=setInterval(draw, 5);
function draw() {
		
	if (!pause)
	{
		if(runangle < 2*Math.PI) {
		runangle = runangle + speed * Math.PI;
		} else {
			runangle = 0;
		}
	
		if(rollangle < 2*Math.PI) {
			rollangle = rollangle + (speed/rollfactor) * Math.PI;
		} else {
			rollangle = 0;
		}
		var PointC = CirclePoints(radius-iradius, runangle, [0,0]);
		var PointD = CirclePoints(iradius-pointoffset, -rollangle, [PointC.x,PointC.y]);
		ctx.beginPath();
		ctx.fillRect(PointD.x,PointD.y,1,1);
		
		if(multicolor)
		{	
			if(rollangle == 0) { rollcount++; }
			if(rollcount == 2)
			{
				c1 = parseInt((c1 + 50)%250);
				c2 = parseInt((250-(c2-50))%250);
				rollcount=0;
			}
			ctx.fillStyle = "rgb("+c1+","+c2+",125)";
		}
		else
		{
			ctx.fillStyle = "rgb(125,125,125)";
		}
	}
}

function drawCircle(rad) {
	ctx.beginPath();
	ctx.lineWidth = "3";
	ctx.arc(0, 0, rad, 0 , 2 * Math.PI);
	ctx.strokeStyle = "white";
	ctx.stroke();
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

function goFullScreen(){
    if(canvas.requestFullScreen)
        canvas.requestFullScreen();
    else if(canvas.webkitRequestFullScreen)
        canvas.webkitRequestFullScreen();
    else if(canvas.mozRequestFullScreen)
        canvas.mozRequestFullScreen();
	draw();
}

function Pause()
{
	pause = !pause;
}

function Reset()
{
	ctx.translate(-oradius, -oradius);
	ctx.clearRect(0, 0, 600, 600);
	ctx.translate(oradius, oradius);
	runangle = 0;
	rollangle = 0;
	rollcount = 0;
	c1 = 125, 
	c2 = 125;
	pause = false;
}

function SetInnerRadius()
{
	
	iradius = parseInt(document.getElementById("InnerRadius").value);
	Reset();
	document.getElementById("PointOffset").max = iradius;
}

function SetPointOffset()
{
	pointoffset = parseInt(document.getElementById("PointOffset").value);
	Reset();
}

function SetRollFactor()
{
	rollfactor = parseInt(document.getElementById("RollFactor").value)/10 + 0.05;
	RollFactorlabel.innerHTML = "Roll Factor: " + rollfactor.toFixed(2);
	Reset();
}