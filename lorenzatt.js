const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth * 0.9, window.innerHeight * 0.9 );
document.body.appendChild( renderer.domElement );

camera.position.z = 90;

var x, y, z;
var s, p, b;
var a, c, u;

sig = 10;
bet = 8/3;
ro = 28;
x = 0.01;
y = 1; 
z = 0;


a = 0.1;
b = 0.1;
c = 14;


var prev_vert = new THREE.Vector3(x, y, z);
var windowHalfX = window.innerWidth / 2,
        windowHalfY = window.innerHeight / 2;
var mouseX = 0, mouseY = 0;
var c = 0;
var zoom = 90;
var dx, dy,dz;

const animate1 = function () {
	requestAnimationFrame(animate1);
	
	var tmp_geo = new THREE.Geometry();
	
	LorenAttractor();
	//LuchenAttractor();
	x += dx; y += dy; z += dz;
	
    tmp_geo.vertices.push(prev_vert);
	var new_vert = new THREE.Vector3( x, y, z );
    tmp_geo.vertices.push(new_vert);
	prev_vert = new_vert;

	c = (c > 250) ? 0 : c + 1;
	var temp_mat = new THREE.MeshBasicMaterial( { color: new THREE.Color("rgb(" + c + ", " + (255 - c) + ", 0)") } );
	line = new THREE.Line(tmp_geo, temp_mat);
	line.width = 3;
	scene.add(line);
	
	render();
	
};

function LorenAttractor() {
	var dt = 0.01;
	dx = (sig * (y - x)) * dt;
	dy = (x * (ro - z) - y) * dt;
	dz = ((x * y) - (bet * z)) * dt;
	
}


function LuchenAttractor() {
	var dt = 0.01;
	dx = (-y-z) * dt
	dy = (x + a*y) * dt;
	dz = (b + z*(x-c)) * dt;
}

function render() {
	camera.position.x += (mouseX - camera.position.x) * 1;
    camera.position.y += (-mouseY - camera.position.y) * 1;
	camera.position.z = zoom;
    camera.lookAt(scene.position);
	
	renderer.render( scene, camera );
}

function onDocumentMouseMove(event) {
	if(mouseDown) {
        mouseX = (event.clientX - windowHalfX) / 2;
        mouseY = (event.clientY - windowHalfY) / 2;
	}
}

function onDocumentTouchMove(event) {
	mouseX = (event.touches[0].clientX - windowHalfX) / 2;
	mouseY = (event.touches[0].clientY - windowHalfy) / 2;
}

function onDocumentWheelMove(event) {
	var y = event.deltaY;
	if(y < 0 && zoom > 2) {
		zoom -= 2;
	} else if(zoom < 200) {
		zoom += 2;
	}
		
}

window.addEventListener('mousemove', onDocumentMouseMove, false);
window.addEventListener('touchmove', onDocumentTouchMove, false);
window.addEventListener('wheel', onDocumentWheelMove, false);
var mouseDown = 0;
document.body.onmousedown = function() { 
  ++mouseDown;
}
document.body.onmouseup = function() {
  --mouseDown;
}
animate1();