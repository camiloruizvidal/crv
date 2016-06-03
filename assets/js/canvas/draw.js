var group;
var container, stats;
var particlesData = [];
var camera;
var scene; 
var renderer;
var positions;
var colors;
var pointCloud;
var particlePositions;
var linesMesh;
var maxParticleCount = 450;
var particleCount = 100;
var r = 1800;
var rHalf = r / 2;

var effectController = {showDots: true, showLines: true, minDistance: 240, limitConnections: true, maxConnections: 2, particleCount: 100};

var mouseControls;

function init() {



var parentElement = document.getElementById("main");

var theFirstChild = parentElement.firstChild;

container = document.createElement( 'section' );
container.setAttribute("id", "canvasdrag");

parentElement.insertBefore(container, theFirstChild);

//



camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 4000 );
camera.position.z = 400;


controls = new THREE.OrbitControls( camera, container );


scene = new THREE.Scene();

geometry = new THREE.BufferGeometry();
var material = new THREE.LineBasicMaterial({ vertexColors: THREE.VertexColors });

var segments = maxParticleCount * maxParticleCount;

positions = new Float32Array( segments * 3 );
colors = new Float32Array( segments * 3 );

var pMaterial = new THREE.PointCloudMaterial({
color: 0xffffff,
size: 4,
blending: THREE.NormalBlending,
transparent: true,
sizeAttenuation: false
});

particles = new THREE.BufferGeometry();
particlePositions = new Float32Array( maxParticleCount * 1 );

for ( var i = 0; i < maxParticleCount; i++ ) {

var x = Math.random() * r - r / 2;
var y = Math.random() * r - r / 2;
var z = Math.random() * r - r / 2;

particlePositions[ i * 3     ] = x;
particlePositions[ i * 3 + 1 ] = y;
particlePositions[ i * 3 + 2 ] = z;

// add it to the geometry
particlesData.push({
velocity: new THREE.Vector3( -1 + Math.random() * 2, -1 + Math.random() * 2,  -1 + Math.random() * 2 ),
numConnections: 0
});

}

particles.drawcalls.push( {
start: 0,
count: particleCount,
index: 0
} );

particles.addAttribute( 'position', new THREE.BufferAttribute( particlePositions, 3 ) );

// create the particle system
pointCloud = new THREE.PointCloud( particles, pMaterial );

group = new THREE.Object3D();

// add it to the scene
group.add( pointCloud );

geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );

geometry.computeBoundingSphere();

geometry.drawcalls.push( {
start: 0,
count: 0,
index: 0
} );

linesMesh = new THREE.Line( geometry, material, THREE.LinePieces );
group.add( linesMesh );

scene.add( group );

//

renderer = new THREE.WebGLRenderer( { alpha: true } );
renderer.setPixelRatio( window.devicePixelRatio )
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0x000000, 0 );


renderer.gammaInput = true;
renderer.gammaOutput = true;

container.appendChild( renderer.domElement );

//

window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();

renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

var vertexpos = 0;
var colorpos = 0;
var numConnected = 0;

for ( var i = 0; i < particleCount; i++ )
particlesData[ i ].numConnections = 0;

for ( var i = 0; i < particleCount; i++ ) {

// get the particle
var particleData = particlesData[i];

particlePositions[ i * 3     ] += particleData.velocity.x;
particlePositions[ i * 3 + 1 ] += particleData.velocity.y;
particlePositions[ i * 3 + 2 ] += particleData.velocity.z;

if ( particlePositions[ i * 3 + 1 ] < -rHalf || particlePositions[ i * 3 + 1 ] > rHalf )
particleData.velocity.y = -particleData.velocity.y;

if ( particlePositions[ i * 3 ] < -rHalf || particlePositions[ i * 3 ] > rHalf )
particleData.velocity.x = -particleData.velocity.x;

if ( particlePositions[ i * 3 + 2 ] < -rHalf || particlePositions[ i * 3 + 2 ] > rHalf )
particleData.velocity.z = -particleData.velocity.z;

if ( effectController.limitConnections && particleData.numConnections >= effectController.maxConnections )
continue;

// Check collision
for ( var j = i + 1; j < particleCount; j++ ) {

var particleDataB = particlesData[ j ];
if ( effectController.limitConnections && particleDataB.numConnections >= effectController.maxConnections )
continue;

var dx = particlePositions[ i * 3     ] - particlePositions[ j * 3     ];
var dy = particlePositions[ i * 3 + 1 ] - particlePositions[ j * 3 + 1 ];
var dz = particlePositions[ i * 3 + 2 ] - particlePositions[ j * 3 + 2 ];
var dist = Math.sqrt( dx * dx + dy * dy + dz * dz );

if ( dist < effectController.minDistance ) {

particleData.numConnections++;
particleDataB.numConnections++;

var alpha = 0xffffff;


positions[ vertexpos++ ] = particlePositions[ i * 3     ];
positions[ vertexpos++ ] = particlePositions[ i * 3 + 1 ];
positions[ vertexpos++ ] = particlePositions[ i * 3 + 2 ];

positions[ vertexpos++ ] = particlePositions[ j * 3     ];
positions[ vertexpos++ ] = particlePositions[ j * 3 + 1 ];
positions[ vertexpos++ ] = particlePositions[ j * 3 + 2 ];

colors[ colorpos++ ] = alpha;
colors[ colorpos++ ] = alpha;
colors[ colorpos++ ] = alpha;

colors[ colorpos++ ] = alpha;
colors[ colorpos++ ] = alpha;
colors[ colorpos++ ] = alpha;

numConnected++;
}
}
}


linesMesh.geometry.drawcalls[ 0 ].count = numConnected * 2;
linesMesh.geometry.attributes.position.needsUpdate = true;
linesMesh.geometry.attributes.color.needsUpdate = true;

pointCloud.geometry.attributes.position.needsUpdate = true;

requestAnimationFrame( animate );

render();

}

var radius = 1000;
var theta = 0;

function render() {

var time = Date.now() * 0.0035;

//group.rotation.z = time * 0.08;
group.rotation.y = time * 0.08;
//group.rotation.x = time * 0.02;


theta += .2;

//camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
//camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
//camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
//camera.lookAt( scene.position );

//camera.updateMatrixWorld();

mouseControls = new THREE.MouseControls(camera);


renderer.render( scene, camera );

}

//THREEx.WindowResize(renderer, camera);

init();
animate();

