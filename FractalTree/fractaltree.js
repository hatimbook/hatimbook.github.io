var tree = [];
var leaves = [];
var count = 0;
var frames = 0;
var numroots = 1;


function setup() {
	createCanvas(1200,600);
	createRoots();
}

function animate() {
	var branchadded = false;
	if( count < 8 ) {
		for(var i = tree.length-1; i >= 0; i--) {
			if(!tree[i].branched && tree[i].finished) {
				tree.push(tree[i].newBranch(random(PI/6, PI/4)));
				tree.push(tree[i].newBranch(random(-PI/4, -PI/6)));
				tree[i].branched = true;
				branchadded = true;
			}
			
		}
		if(branchadded) {
			count++;
		}
	}	
	
	if(count == 8) {
		for (var i = 0; i < tree.length - 1; i++) {
			if(!tree[i].branched && tree[i].finished && !tree[i].leaf) {
				var leaf = tree[i].end.copy();
				leaves.push(leaf);
				tree[i].leaf = true;
			}
		}
	}
}

function draw() {
	background(51);
	
	if((frames%60) == 0) {
		animate();
	}
	frames++;
	for (var i = 0; i < tree.length; i++) {
		tree[i].show();
	}
	var dropping = false;
	var leavesexist = false;
	for (var i = 0; i < leaves.length; i++) {
		fill(255, 0, 100, 100);
		noStroke();
		leavesexist = true;
		if(!(i%4)) {
			ellipse(leaves[i].x, leaves[i].y, 8, 8);
		}
		if(leaves[i].y < height-4) {
			leaves[i].y += random(0, 3);
			leaves[i].x += random(-0.5, 0.5);
			dropping = true;
		}
	}
	
	if(leavesexist && !dropping) {
		reset();
	}
}

function createRoots()
{
	for(var i = 0; i < numroots; i++) {
		var randomheight = random(height-50, height);
		var a  = createVector((i+1)* width / (numroots+1), randomheight);
		var b  = createVector((i+1)* width / (numroots+1), randomheight - 150);
		var root = new branch(a,b,0);
		tree[i] = root;
	}
}

function reset() {
	if (numroots < 10) {
		tree = [];
		leaves = [];
		count = 0;
		numroots++;
		createRoots();
	}
}

function branch(begin, end, level) {
	this.begin = begin;
	this.end = end;
	this.branched = false;
	this.finished = false;
	this.leaf = false;
	this.level = level;
	
	this.newbegin = this.begin.copy();
	this.dir = p5.Vector.sub(this.end, this.begin);
	this.dir.mult(0.05);
	this.len = dist(this.begin.x, this.begin.y, this.end.x, this.end.y); 
	
	this.show = function() {
		stroke(150, 150, 150);
		strokeWeight(8 - level); 
		var newEnd = p5.Vector.add(this.newbegin, this.dir);
		var totlen = dist(this.begin.x, this.begin.y, newEnd.x, newEnd.y); 
		if(totlen >= this.len) {
			this.finished = true;
		} else {			
			this.newbegin = newEnd;
		}
		line(this.begin.x, this.begin.y, newEnd.x, newEnd.y);
	};
	
	this.newBranch = function(angle) {
		var dir = p5.Vector.sub(this.end, this.begin);
		dir.rotate(angle);
		dir.mult(0.67);
		var newEnd = p5.Vector.add(this.end, dir);
		var b = new branch(this.end, newEnd, this.level + 1);
		return b;
	};
	
}