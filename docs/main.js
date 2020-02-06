import * as THREE from './js/three.module.js';
//import { DragControls } from './js/DragControls.js';
import { OrbitControls } from './js/OrbitControls.js';
import * as UTILS from './js/utils.js';

var container;
var camera, scene, renderer;
var controls;
var objects = [];

init();
animate();

function init() {

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 5000 );
	camera.position.z = 1000;

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xf0f0f0 );

	scene.add( new THREE.AmbientLight( 0x505050 ) );

	var light = new THREE.SpotLight( 0xffffff, 1.5 );
	light.position.set( 0, 500, 2000 );
	light.angle = Math.PI / 9;

	light.castShadow = true;
	light.shadow.camera.near = 1000;
	light.shadow.camera.far = 4000;
	light.shadow.mapSize.width = 1024;
	light.shadow.mapSize.height = 1024;

	scene.add( light );

	// var data = [
	// 	[ {dx:0, dy:0, length:0.25, height:0.15,depth:0.1}, {dx:0.28, dy:0, length:0.25, height:0.15,depth:0.1} ],
	// 	[ {dx:0, dy:0.15, length: 0.25, height:0.15,depth:0.1}, {dx:0.28, dy:0.15, length:0.25, height:0.15,depth:0.1} ],
	// ]

	var data = UTILS.loadPythonFile("test.csv");

	var geometry = new THREE.BoxBufferGeometry( 10, 10, 10 );
	
	var row = data [0];
	// for ( var j = 0; j < row.length; j ++ ) {
	// for ( var i = 0; i < row[j].length; i ++ ) {

	for ( var i = 0; i < row.length; i ++ ) {
		var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );

		object.position.x = row[i].dx*100;
		object.position.z =100;
		object.position.y = row[i].dy*100;

		//object.rotation.x = Math.random() * 2 * Math.PI;
		//object.rotation.y = Math.random() * 2 * Math.PI;
		//object.rotation.z = Math.random() * 2 * Math.PI;

		// object.scale.x = Math.random() * 2 + 1;
		// object.scale.y = Math.random() * 2 + 1;
		// object.scale.z = Math.random() * 2 + 1;

		object.scale.x = row[i].length*10;
		object.scale.y = row[i].depth*10;
		object.scale.z = row[i].height*10;

		object.castShadow = true;
		object.receiveShadow = true;

		scene.add( object );

		objects.push( object );
	 }

	// }

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );

	addOrbit();

	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFShadowMap;

	container.appendChild( renderer.domElement );

	window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function animate() {

	requestAnimationFrame( animate );
	render();
    controls.update(); // required because damping is enabled

}

function render() {

	renderer.render( scene, camera );
}

function addOrbit() {
	controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	controls.dampingFactor = 0.1;
	controls.screenSpacePanning = true;
	controls.position0.set(27.51342323198951, 14.631490797857495, -23.519186481837153);
	controls.target0.set( 25.322066856958944, 10.725374538158743,9.917616743457403 );
	controls.reset();
	window.controls = controls;        
}
