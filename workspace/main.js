import "./style.css"

import * as THREE from "three";

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#canvas"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 2.3;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;


const planeGeometry = new THREE.PlaneGeometry(100, 100);
const planeMaterial = new THREE.MeshPhongMaterial({ color: 0x101010 });
const planeObject = new THREE.Mesh(planeGeometry, planeMaterial);
planeObject.rotation.x = -Math.PI / 2;
planeObject.receiveShadow = true;
scene.add(planeObject);

const loader = new THREE.TextureLoader();

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

const material = [];

const colorArray = ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#ffff99", "#b15928"];

for (let index = 0; index < 27; index++) {
    material[index] = new THREE.MeshLambertMaterial({ color: colorArray[index % 12], map: loader.load('./textures/matte2.jpg') });
}


var cubeArr = [];

for (let i = 0; i < 3; i++) {
    cubeArr[i] = [];
    for (let j = 0; j < 3; j++) {
        cubeArr[i][j] = [];
        for (let k = 0; k < 3; k++) {
            cubeArr[i][j][k] = new THREE.Mesh(cubeGeometry, material[i * 9 + j * 3 + k]);
            cubeArr[i][j][k].position.set(i - 1, j + 0.5, k - 1);
            cubeArr[i][j][k].castShadow = true;
            scene.add(cubeArr[i][j][k]);
        }
    }
}

const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambientLight);

const topLight = new THREE.SpotLight(0xffffff, 3);
topLight.position.set(3, 7, -3);
topLight.lookAt(0, 2, 0);
topLight.decay = 2;
topLight.castShadow = true;
topLight.shadow.camera.top = 1;
topLight.shadow.camera.bottom = -2;
topLight.shadow.camera.left = -2;
topLight.shadow.camera.right = 2;
topLight.shadow.camera.near = 0.1;
topLight.shadow.camera.far = 40;
scene.add(topLight);

camera.position.set(-4.8, 7.5, 6.4);
camera.lookAt(0, 2, 0);




let scrollY = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
let fps = 0;
const progressSpan = document.querySelector('#scrollProgress');

window.addEventListener('scroll', () => {
    scrollY = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
    progressSpan.innerHTML = "Scroll Percentage: " + scrollY.toFixed(2).padStart(5, '0') + "%" + " FPS: " + fps;
    handleScrollElements();
})

var nameslide = document.getElementById("nameslide");
var name = document.getElementById("name");
var logos = document.getElementsByClassName("logo");
var arrows = document.getElementsByClassName("arrows");
var right = document.getElementsByClassName("right");
function handleScrollElements() {
    if (scrollY > 7) {
        for (var x = 0; x < arrows.length; x++) {
            arrows[x].style.visibility = "hidden";
        }
    } else {
        for (var x = 0; x < arrows.length; x++) {
            arrows[x].style.visibility = "visible";
        }
    }
    if (scrollY < 4) {
        for (var x = 0; x < logos.length; x++) {
            logos[x].style.opacity = 1;
        }
        nameslide.style.width = "66%";
        nameslide.style.marginLeft = "-33%";
        nameslide.style.left = "50%";
        nameslide.style.top = "20%";
        nameslide.style.backgroundColor = "rgba(35,35,35,0.67)";
        name.style.fontSize = "7vw";
        name.style.marginTop = "20px";
    } else if (scrollY < 12) {
        for (var x = 0; x < logos.length; x++) {
            logos[x].style.opacity = 1 - (scrollY - 4) / 8;
        }
        nameslide.style.width = (66 - 56 * (scrollY - 4) / 8) + "%";
        nameslide.style.marginLeft = (-33 + 33 * (scrollY - 4) / 8) + "%";
        nameslide.style.left = (50 - 50 * (scrollY - 4) / 8) + "%";
        nameslide.style.top = (20 - 20 * (scrollY - 4) / 8) + "%";
        nameslide.style.backgroundColor = "rgba(35,35,35," + (.67 - .67 * (scrollY - 4) / 8) + ")";
        name.style.fontSize = (7 - 4 * (scrollY - 4) / 8) + "vw";
        name.style.marginTop = (20 - 10 * (scrollY - 4) / 8) + "px";
    } else {
        for (var x = 0; x < logos.length; x++) {
            logos[x].style.opacity = 0;
        }
        nameslide.style.width = "10%";
        nameslide.style.marginLeft = "0%";
        nameslide.style.left = "0%";
        nameslide.style.top = "0%";
        nameslide.style.backgroundColor = "rgba(35,35,35,0)";
        name.style.fontSize = "3vw";
        name.style.marginTop = "10px";
    }
    if (scrollY < 25) {
        for (var x = 0; x < right.length; x++) {
            right[x].style.left = "50%";
        }
    } else if (scrollY < 40) {
        for (var x = 0; x < right.length; x++) {
            if (scrollY - 25 < 5) {
                if (scrollY - 25 < x / 4) {
                    right[x].style.left = "50%";
                } else if (scrollY - 25 < 2 + x / 4) {
                    right[x].style.left = (50 - 25 * (scrollY - 25 - (x / 4))) + "%";
                } else {
                    right[x].style.left = "0%";
                }
            } else if (scrollY - 25 < 10){
                right[x].style.left = "0%";
            } else {
                if (scrollY - 25 < x / 4 + 10) {
                    right[x].style.left = "0%";
                } else if (scrollY - 25 < 2 + x / 4 + 10) {
                    right[x].style.left = (25 * (scrollY - 35 - (x / 4))) + "%";
                } else {
                    right[x].style.left = "50%";
                }
            }
        }
    } else {
        for (var x = 0; x < right.length; x++) {
            right[x].style.left = "50%";
        }
    }
}

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function easeInOutSin(input) {
    return .5 * (Math.sin((input - .5) * Math.PI) + 1);
}

function scrollCamera() {
    if (scrollY < 15) { // initial position
        camera.position.set(-4.8, 7.5, 6.4);
        camera.lookAt(0, 2, 0);
    } else if (scrollY < 25) { // shift to left
        camera.position.set(-4.8 - 4.1 * easeInOutSin((scrollY - 15) / 10), 7.5, 6.4 + 0.7 * easeInOutSin((scrollY - 15) / 10));
        camera.lookAt(1.2 * easeInOutSin((scrollY - 15) / 10), 2, 3.8 * easeInOutSin((scrollY - 15) / 10));
    } else if (scrollY < 40) { // hold still
        camera.position.set(-8.9, 7.5, 7.1);
        camera.lookAt(1.2, 2, 3.8);
    } else if (scrollY < 50) { // shift to right
        camera.position.set(-8.9 + 3.8 * easeInOutSin((scrollY - 40) / 10), 7.5, 7.1 - 1.1 * easeInOutSin((scrollY - 40) / 10));
        camera.lookAt(1.2 - 4.0 * easeInOutSin((scrollY - 40) / 10), 2, 3.8 - 4.7 * easeInOutSin((scrollY - 40) / 10));
    } else if (scrollY < 65) { // hold still
        camera.position.set(-5.1, 7.5, 6.0);
        camera.lookAt(-2.8, 2, -0.9);
    } else if (scrollY < 75) { // shift back to middle
        camera.position.set(-5.1 + 0.3 * easeInOutSin((scrollY - 65) / 10), 7.5, 6.0 + 0.4 * easeInOutSin((scrollY - 65) / 10));
        camera.lookAt(-2.8 + 2.8 * easeInOutSin((scrollY - 65) / 10), 2, -0.9 + 0.9 * easeInOutSin((scrollY - 65) / 10));
    } else if (scrollY <= 100) { //zoom to 0.5
        let k = 1 - 0.5 * easeInOutSin((scrollY - 75) / 25); // 1->0.5
        camera.position.set(-4.8 * k, (7.5 - 2) * k + 2, 6.4 * k);
        camera.lookAt(0, 2, 0);
    }
    topLight.position.set(
        10 + .5 * camera.position.x,
        10 + .5 * camera.position.y,
        20 + .5 * camera.position.z
    );
}

function moveLeftCube(i, j, k, time, total) {
    if (time > total) {
        cubeArr[i][j][k].position.set(i - 1, j + 0.5, k - 1 + 10);
    }
    if (time > 0) {
        cubeArr[i][j][k].position.set(i - 1, j + 0.5, k - 1 + 10 * ((time / total) ** 3));
    } else {
        cubeArr[i][j][k].position.set(i - 1, j + 0.5, k - 1);
    }
}

function moveRightCube(i, j, k, time, total) {
    if (time > total) {
        cubeArr[i][j][k].position.set(i - 1 - 10, j + 0.5, k - 1);
    }
    if (time > 0) {
        cubeArr[i][j][k].position.set(i - 1 - 10 * ((time / total) ** 3), j + 0.5, k - 1);
    } else {
        cubeArr[i][j][k].position.set(i - 1, j + 0.5, k - 1);
    }
}

function moveLeftCubes(time) {
    moveLeftCube(0, 2, 2, time - 3, 60);
    moveLeftCube(0, 1, 2, time - 7, 57);
    moveLeftCube(0, 2, 1, time - 11, 53);
    moveLeftCube(1, 2, 2, time - 15, 51);
    moveLeftCube(0, 0, 2, time - 19, 53);
    moveLeftCube(1, 2, 1, time - 23, 57);
    moveLeftCube(1, 1, 2, time - 27, 59);
    moveLeftCube(2, 2, 2, time - 31, 56);
    moveLeftCube(2, 1, 2, time - 35, 54);
    moveLeftCube(0, 2, 0, time - 39, 57);
}

function moveRightCubes(time) {
    moveRightCube(0, 1, 1, time - 3, 60);
    moveRightCube(1, 2, 0, time - 7, 57);
    moveRightCube(1, 0, 2, time - 11, 53);
    moveRightCube(0, 1, 0, time - 15, 51);
    moveRightCube(2, 2, 1, time - 19, 53);
    moveRightCube(2, 0, 2, time - 23, 57);
    moveRightCube(0, 0, 1, time - 27, 59);
    moveRightCube(2, 2, 0, time - 31, 56);
    moveRightCube(0, 0, 0, time - 35, 54);
}

function handleCubeMovement() {
    moveLeftCubes((scrollY - 25) / 15 * 100);
    moveRightCubes((scrollY - 50) / 15 * 100);
}

//const controls = new OrbitControls( camera, renderer.domElement );
/*
const lightHelper = new THREE.SpotLightHelper( topLight, 1 );
scene.add( lightHelper );

const gridHelper = new THREE.GridHelper( 10, 10 );
scene.add( gridHelper );

const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );*/

let frame = 0;
let frameAtLastSecond = 0;
let timeAtLastSecond = Date.now();
function printAnalytics() {
    //console.log("Frame: " + frame + " FPS: " + fps + " ScrollY: " + scrollY);
    frame++;
    if (Date.now() - timeAtLastSecond > 1000) {
        fps = frame - frameAtLastSecond;
        frameAtLastSecond = frame;
        timeAtLastSecond = Date.now();
    }
}

function animate() {
    requestAnimationFrame(animate);

    scrollCamera();
    handleCubeMovement();


    //controls.update();

    renderer.render(scene, camera);
    printAnalytics();
}

scrollCamera();
handleCubeMovement();
handleScrollElements();
animate();