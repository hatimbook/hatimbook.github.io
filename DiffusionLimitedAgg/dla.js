// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for this video: https://youtu.be/Cl_Gjj80gPE

var tree = [];
var walkers = [];
var maxWalkers = 200;
var iterations = 100;
var radius = 4;
var edgelength = 2*radius;
var hu = 0;
var shrink = 1;
var edgereached = false;
var edges = [];
var run = false;


function setup() {
  createCanvas(600, 600);
  colorMode(HSB);
  
  hu = 0;
  edgereached = false;
 
  tree[0] = new Walker((1 *width) / 2, height / 2);
  //tree[0] = new Walker(random(width), random(height));
  tree[0].setHue(0);
  
  //tree[1] = new Walker((3 * width) / 5, height / 2);
  //tree[1] = new Walker(random(width), random(height));
  //tree[1].setHue(0);
  
  
  radius *= shrink;
  for (var i = 0; i < maxWalkers; i++) {
    walkers[i] = new Walker();
    radius *= shrink;
  }
}

function draw() {
  background(0);

  for (var i = 0; i < tree.length; i++) {
    tree[i].show();
  }

  for (var i = 0; i < walkers.length; i++) {
    walkers[i].show();
  }
  
  for (var i = 0; i < edges.length; i++) {
    edges[i].show();
  }
  
  if(run)
  {
	  if(walkers.length > 0)
	  {
		for (var n = 0; n < iterations; n++) {
		for (var i = walkers.length - 1; i >= 0; i--) {
		  walkers[i].walk();
		  if (walkers[i].checkStuck(tree)) {
			walkers[i].setHue(floor(hu) % 360);
			hu += 0.2;
			tree.push(walkers[i]);
			edges.push(new Edge(tree[walkers[i].stuckto].pos, walkers[i].pos))
			if(!edgereached) { edgereached |= walkers[i].EdgeReached(); }
			walkers.splice(i, 1);
			
		  }
		}
		}	
		
		while (walkers.length < maxWalkers && radius > 1 && !edgereached) {
			radius *= shrink;
			walkers.push(new Walker());
		}
	  }
   }
}


// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for this video: https://youtu.be/Cl_Gjj80gPE

function Walker(x, y) {
  if (arguments.length == 2) {
    this.pos = createVector(x, y);
    this.stuck = true;
  } else {
    this.pos = randomPoint();
    this.stuck = false;
  }
  this.r = radius;
  this.stuckto = 0;

  this.walk = function() {
    var vel = p5.Vector.random2D();
	vel.mult(5);
    this.pos.add(vel);
    this.pos.x = constrain(this.pos.x, 0, width);
    this.pos.y = constrain(this.pos.y, 0, height);
  };

  this.checkStuck = function(others) {
    for (var i = 0; i < others.length; i++) {
      var d = distSq(this.pos, others[i].pos);
      //if (d < this.r * this.r + others[i].r * others[i].r + 2 * others[i].r * this.r ) {
	  if(d < edgelength * edgelength) {
		edges
        this.stuck = true;
		this.stuckto = i;
        return true;
      }
    }
    return false;
  };
  
  this.EdgeReached = function() {
	  if(this.pos.x < this.r || this.pos.x > (width - this.r) || this.pos.y < this.r || this.pos.y > (height - this.r)) {
		return true;
	  } else {
		return false;
	  }
  }

  this.setHue = function(hu) {
    this.hu = hu;
  };

  this.show = function() {
    noStroke();
    if (this.stuck && typeof this.hu !== 'undefined') {
      fill(this.hu, 255, 100, 200);
    } else {
      fill(360, 0, 255);
    }
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
  };
}

function Edge(a, b) {
	this.pointA = a;
	this.pointB = b;
	
	this.show = function() {
		stroke(150, 150, 150);
		strokeWeight(1); 
		
		line(this.pointA.x, this.pointA.y, this.pointB.x, this.pointB.y);
	}
}

function randomPoint() {
  var x = random(width);
  var y = random(height);
  
  var poss_values = [[x,0], [x, height], [0, y], [width, y]];
  var i = floor(random(poss_values.length));
  return createVector(poss_values[i][0], poss_values[i][1])

}

function distSq(a, b) {
  var dx = b.x - a.x;
  var dy = b.y - a.y;
  return dx * dx + dy * dy;
}

function goFullScreen(){
    if(canvas.requestFullScreen)
        canvas.requestFullScreen();
	else if (elem.webkitRequestFullscreen)
		elem.webkitRequestFullscreen();
    else if(canvas.webkitRequestFullScreen)
        canvas.webkitRequestFullScreen();
    else if(canvas.mozRequestFullScreen)
        canvas.mozRequestFullScreen();
}

function Play(cmd) {
	run = cmd;
	tree = [];
	walkers = [];
	edges = [];
	setup();
}