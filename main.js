import "./style.css"

import * as THREE from "three";

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#canvas"),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 2.3;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;


const planeGeometry = new THREE.PlaneGeometry( 100, 100 );
const planeMaterial = new THREE.MeshPhongMaterial( { color: 0x101010 } );
const planeObject = new THREE.Mesh( planeGeometry, planeMaterial );
planeObject.rotation.x = -Math.PI / 2;
planeObject.receiveShadow = true;
scene.add( planeObject );

const cubeGeometry = new THREE.BoxGeometry( .99, .99, .99 );
const material = new THREE.MeshStandardMaterial( { color: 0xffffff} );
const cubeObject = new THREE.Mesh( cubeGeometry, material );

var cubeArr = [];

for (let i = 0; i < 3; i++) {
    cubeArr[i] = [];
    for (let j = 0; j < 3; j++) {
        cubeArr[i][j] = [];
        for (let k = 0; k < 3; k++) {
            cubeArr[i][j][k] = new THREE.Mesh( cubeGeometry, material );
            cubeArr[i][j][k].position.set(i - 1, j + 0.5, k - 1);
            cubeArr[i][j][k].castShadow = true;
            scene.add(cubeArr[i][j][k]);
        }
    }
}

const ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( ambientLight );

const topLight = new THREE.SpotLight( 0xffffff, 1);
topLight.position.set( 3, 7, -3 );
topLight.castShadow = true;
topLight.shadow.camera.top = 1;
topLight.shadow.camera.bottom = -2;
topLight.shadow.camera.left = -2;
topLight.shadow.camera.right = 2;
topLight.shadow.camera.near = 0.1;
topLight.shadow.camera.far = 40;
scene.add( topLight);

const lightHelper = new THREE.SpotLightHelper( topLight, 1 );
scene.add( lightHelper );



const gridHelper = new THREE.GridHelper( 10, 10 );
scene.add( gridHelper );
const k = 3.5;

camera.position.set( -4.8, 7.5, 6.4);
camera.lookAt(0, 2, 0);


let scrollY = 0;
const progressSpan = document.querySelector('#scrollProgress');

window.addEventListener('scroll', () =>
{
    scrollY = window.scrollY / 25.31;
    progressSpan.innerHTML = "Scroll Percentage: " + Math.trunc(scrollY * 100) / 100 + "%";

    console.log(scrollY);
    console.log(camera.position);
})

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

function scrollCamera() {
    if (scrollY < 15) { // initial position
        camera.position.set( -4.8, 7.5, 6.4);
        camera.lookAt(0, 2, 0);
    } else if (scrollY < 25) { // shift to left
        camera.position.set( -4.8 - 4.1 * ((scrollY - 15) / 10 ), 7.5, 6.4 + 0.7 * ((scrollY - 15) / 10 ));
        camera.lookAt(1.2 * ((scrollY - 15) / 10 ), 2, 3.8 * ((scrollY - 15) / 10 ));
    } else if (scrollY < 40) { // hold still
        camera.position.set(-8.9, 7.5, 7.1);
        camera.lookAt(1.2, 2, 3.8);
    } else if (scrollY < 50) { // shift to right
        camera.position.set(-8.9 + 3.8 * ((scrollY - 40) / 10 ), 7.5, 7.1 - 1.1 * ((scrollY - 40) / 10 ));
        camera.lookAt(1.2 - 4.0 * ((scrollY - 40) / 10 ), 2, 3.8 - 4.7 * ((scrollY - 40) / 10 ));
    } else if (scrollY < 65) { // hold still
        camera.position.set(-5.1, 7.5, 6.0);
        camera.lookAt(-2.8, 2, -0.9);
    } else if (scrollY < 75) { // shift back to middle
        camera.position.set(-5.1 + 0.3 * ((scrollY - 65) / 10 ), 7.5, 6.0 + 0.4 * ((scrollY - 65) / 10 ));
        camera.lookAt(-2.8 + 2.8 * ((scrollY - 65) / 10 ), 2, -0.9 + 0.9 * ((scrollY - 65) / 10 ));
    } else { //hold still at initial position
        camera.position.set( -4.8, 7.5, 6.4);
        camera.lookAt(0, 2, 0);
    }
}





function animate() {
    requestAnimationFrame( animate );


    topLight.position.set(
        10 + .1 * camera.position.x,
        10 + .1 * camera.position.y,
        20 + .1 * camera.position.z
    );

    scrollCamera();


    renderer.render( scene, camera );
}

animate();