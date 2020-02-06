import * as THREE from './js/three.module.js';
import { DragControls } from './js/DragControls.js';

var container;
var camera, scene, renderer;
var objects = [];

init();
animate();

function loadPythonFile() {

}

window.triggerScreenshot = function() {

// for ( var screenshot = 0; screenshot < 10; screenshot ++ ) {
 	renderer.render( scene, camera );
 	var strMime = "image/jpeg";
	var imgData = renderer.domElement.toDataURL(strMime);
	console.log(imgData)
	window.open(imgData);
// }
}

function configureBricks() {

}


function init() {

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 5000 );
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

	var geometry = new THREE.BoxBufferGeometry( 40, 40, 40 );

	for ( var y = 0; y < 10; y ++ ) {

	 for ( var x = 0; x < 10; x ++ ) {
		var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );

		object.position.x = x*120 + Math.random() * 1 - 700;
		object.position.z = Math.random() * 10 - 300;
		object.position.y = y*120 + Math.random() * 80 - 600;

		//object.rotation.x = Math.random() * 2 * Math.PI;
		//object.rotation.y = Math.random() * 2 * Math.PI;
		//object.rotation.z = Math.random() * 2 * Math.PI;

		object.scale.x = Math.random() * 2 + 1;
		object.scale.y = Math.random() * 2 + 1;
		object.scale.z = Math.random() * 2 + 1;

		object.castShadow = true;
		object.receiveShadow = true;

		scene.add( object );

		objects.push( object );
	 }

	}

	renderer = new THREE.WebGLRenderer( { antialias: true, preserveDrawingBuffer: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );

	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFShadowMap;

	container.appendChild( renderer.domElement );

	var controls = new DragControls( objects, camera, renderer.domElement );

	controls.addEventListener( 'dragstart', function ( event ) {

		event.object.material.emissive.set( 0xaaaaaa );

	} );

	controls.addEventListener( 'dragend', function ( event ) {

		event.object.material.emissive.set( 0x000000 );

	} );

	//

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

}

function render() {

	renderer.render( scene, camera );
}
