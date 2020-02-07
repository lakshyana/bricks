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

	var light = new THREE.SpotLight( 0xffffff, 2 ); //brightness level
	light.position.set( 500, 500, 500 ); //for sunlight level
	light.angle = Math.PI / 9;

	light.castShadow = true;
	light.shadow.camera.near = 1;
	light.shadow.camera.far = 4000;
	light.shadow.mapSize.width = 1024;
	light.shadow.mapSize.height = 1024;

	scene.add( light );

	// var data = [
	// 	[ {dx:0, dy:0, length:0.25, height:0.15,depth:0.1}, {dx:0.28, dy:0, length:0.25, height:0.15,depth:0.1} ],
	// 	[ {dx:0, dy:0.15, length: 0.25, height:0.15,depth:0.1}, {dx:0.28, dy:0.15, length:0.25, height:0.15,depth:0.1} ],
	// ]

	// var data = UTILS.loadPythonFile("test.csv");

	var data = [{"length":0.25,"height":0.15,"depth":0.1,"mortar_thickness_v":0.02,"mortar_thickness_h":0.03,"xs":[0,0.28,0.56,0.84,1.12,1.4,1.68,1.96,2.24, 2.52, 2.8],"ys":[0,0.17,0.34, 0.51, 0.68, 0.85, 1.02, 1.19,1.36,1.53,1.7,1.87, 2.04, 2.21,2.38],"offsets":[0,0.09,0.165,0.0975,0.1425,0.0975,0.1125, 0.15, 0.0825, 0.0975, 0.165, 0.0825, 0.15, 0.12, 0.135, 0.1575]},{"length":0.25,"height":0.15,"depth":0.1,"mortar_thickness_v":0.02,"mortar_thickness_h":0.03,"xs":[0,0.8],"ys":[0,0.15],"offsets":[0,0.09]}]


	var geometry = new THREE.BoxBufferGeometry( 10, 10, 10 );

	//Load Brick Texture

	var textureB = THREE.ImageUtils.loadTexture("Brick_in_wall_close_up.jpg","",(t)=>{
		t.wrapS=1000;
		t.wrapT=1000;
	});

	//Load Wall Texture
	var textureC = THREE.ImageUtils.loadTexture("mortar.jpg","",(t)=>{
		t.wrapS=1000;
		t.wrapT=1000;
	});

	var row = data [0];

	for(var j = 0; j<row.ys.length; j ++){
		for ( var i = 0; i < row.xs.length; i ++ ) {
			var mat = new THREE.MeshLambertMaterial( { map: textureB } );
			mat.color.b = 0.22+Math.random() * 0.1;
			mat.color.g = 0.38+Math.random() * 0.08;
			mat.color.r = 0.54;
			var object = new THREE.Mesh( geometry, mat );

	
			object.position.x = (row.xs[i]+row.offsets[j])*100 - 140;
			object.position.z =10;
			object.position.y = row.ys[j]*80 -140;
	
			//object.rotation.x = Math.random() * 2 * Math.PI;
			//object.rotation.y = Math.random() * 2 * Math.PI;
			//object.rotation.z = Math.random() * 2 * Math.PI;

			// object.scale.x = Math.random() * 2 + 1;
			// object.scale.y = Math.random() * 2 + 1;
			// object.scale.z = Math.random() * 2 + 1;
	
			object.scale.x = row.length*10;
			object.scale.y = row.depth*10;
			object.scale.z = row.height*10;
	
			object.castShadow = true;
			object.receiveShadow = true;
	
			scene.add( object );
	
			objects.push( object );
			// var bbox = new THREE.Box3().setFromObject(object);
		 }
	}

	// }

	// var wall = new THREE.Object3D();
	// wall.position(3,0,3);
	// wall.scale(3,3);
	// scene.add(wall);

	function addFloor() {
        // Setup floor
        var ground = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(3, 2),
            new THREE.MeshLambertMaterial({ map: textureC,
                color: 0x999999, 	
            }));
        //ground.rotation.x = 0;
		ground.position.x = 10;
		ground.position.y = -36;
		ground.position.z = 15;
		ground.scale.set(110,110,108)
        // ground.scale.multiplyScalar(110);
        ground.receiveShadow = true;
        scene.add( ground );		
	}
	
 	addFloor();


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
	//controls.position0.set(27.51342323198951, 14.631490797857495, -23.519186481837153);
	//controls.target0.set( 25.322066856958944, 10.725374538158743,9.917616743457403 );
	//controls.reset();
	window.controls = controls;        
}
