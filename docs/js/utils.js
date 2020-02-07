import * as THREE from './three.module.js';

async function loadPythonFile( url ) {
	let res = await fetch(url);
	// clean up json where variables are missing "quotes":  {x:0} -> { "x" : 0 }
	let badJson = await res.text();
	let data = badJson.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');
	data = JSON.parse(data);
    return data;
}

function triggerScreenshot( fileName, renderer, scene, camera ) {
    console.log(`taking snapshot: ${fileName}`);
 for ( var screenshot = 0; screenshot < 5; screenshot ++ ) {
	 renderer.render( scene, camera );
	 camera.position.z += screenshot * 10;
	var imgData = renderer.domElement.toDataURL("image/png");
//	console.log(imgData);
	var w = window.open('about:blank');
	w.document.write("<img src='"+imgData+"' alt='from canvas'/>");
 }
}


export { loadPythonFile, triggerScreenshot };