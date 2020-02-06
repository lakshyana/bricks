import * as THREE from './three.module.js';

function loadPythonFile( url ) {
	const data = [
		[ {dx:0, dy:0, length:0.25, height:0.15,depth:0.1}, 
		{dx:0.28, dy:0, length:0.25, height:0.15,depth:0.1},
		{dx:0, dy:0.15, length: 0.25, height:0.15,depth:0.1},
		{dx:0.28, dy:0.15, length:0.25, height:0.15,depth:0.1}],
		[ {dx:0, dy:0, length:0.25, height:0.15,depth:0.1}, 
		{dx:0.28, dy:0, length:0.25, height:0.15,depth:0.1},
		{dx:0, dy:0.15, length: 0.25, height:0.15,depth:0.1},
		{dx:0.28, dy:0.15, length:0.25, height:0.15,depth:0.1}],
	];
    return data;
}

function triggerScreenshot( name, renderer, scene, camera ) {
    console.log(`taking snapshot: ${name}`);
// for ( var screenshot = 0; screenshot < 10; screenshot ++ ) {
 	renderer.render( scene, camera );
 	var strMime = "image/jpeg";
	var imgData = renderer.domElement.toDataURL(strMime);
	console.log(imgData)
	window.open(imgData);
// }
}


export {loadPythonFile, triggerScreenshot};