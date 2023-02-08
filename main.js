import "./style.css"

import * as THREE from "three";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#canvas"),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

camera.position.setZ(30);


const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true} );
const torusKnot = new THREE.Mesh( geometry, material );
scene.add( torusKnot );

function animate() {
    requestAnimationFrame( animate );

    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.005;
    torusKnot.rotation.z += 0.01;
    if (torusKnot.position.x > 30) {
        torusKnot.position.x = -30;
    }
    torusKnot.position.x += 0.1;

    renderer.render( scene, camera );
}

animate();