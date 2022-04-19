import * as THREE from "three";
import { AmbientLight } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/* To start things off with any three.js project, you will always need three objects:
      1. Scene: a sort of container that contains all objects, cameras, and lights.
      2. Camera: PerspectiveCamera is most commonly used type.
      3. Renderer: renders the graphics onto the scene
*/

let vw = Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0
);

console.log(vw);

//let scene, camera, renderer, controls, torus;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);

// sets renderer size to match the window's dimensions
renderer.setSize(window.innerWidth, window.innerHeight);

// Moves the camera's position away from the middle of the scene along the Z-axis
camera.position.setZ(30);
camera.position.setX(-3);

// Calling the render method (AKA the "draw" method)
renderer.render(scene, camera);

// a GEOMETRY is a set of vectors {x, y, z} that make up a shape
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);

// no light source required!
const material = new THREE.MeshStandardMaterial({
  color: 0x6bd6bd,
  wireframe: false,
  visible: false,
});

const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const planet = new THREE.Mesh(
  new THREE.SphereGeometry(13, 8, 8),
  new THREE.MeshStandardMaterial({
    color: 0xffffff,
    wireframe: true,
    visible: false,
  })
);

scene.add(planet);
planet.position.z = -20;
planet.position.y = -15;
planet.position.x = 27;

let izzi;
const gltfLoader = new GLTFLoader();
gltfLoader.load("/assets/izziLogo.glb", (gltf) => {
  const root = gltf.scene;
  scene.add(root);
  if (vw > 800) {
    root.position.set(11.5, -6, -20);
    root.scale.set(8.75, 9.5, 8.75);
  } else {
    root.position.x = -39;
    root.position.z = 140;
    root.position.y = -20;
    root.scale.set(9.75, 10.5, 9.75);
  }

  // root.rotation.x = 0.1;
  // root.rotation.z = 0.16;

  izzi = root;
});

// Lighting that illuminates the entire scene
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// HELPERS

// Shows the position of a point light
// const lightHelper = new THREE.PointLightHelper(pointLight);

// Draws a 2-Dimensional grid along the scene
// const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper);

// ADDS 3D MOUSE CONTROLS

// The domElement is there to listen to DOM events on the mouse
// const controls = new OrbitControls(camera, renderer.domElement);

// Loads the galaxy texture image as a background of the scene

// const spaceTexture = new THREE.TextureLoader().load("smggalaxy2.jpeg");
// scene.background = spaceTexture

const moonTexture = new THREE.TextureLoader().load("assets/img/moon.jpeg");
const normalTexture = new THREE.TextureLoader().load("assets/img/normal.jpeg");
const happyTexture = new THREE.TextureLoader().load("assets/img/happyface.png");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 6, 6),
  new THREE.MeshStandardMaterial({
    color: 0xffffff,
    wireframe: true,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

// ED7DED - pink
// 7AF57E - light green
// rgb(255,255,255) - White

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

// Adds a star to a randomly generated (x, y, z) position in the scene.
function addStar() {
  let num = getRandomInt(4);

  // const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  let geometry;
  let material;
  if (num == 0) {
    geometry = new THREE.BoxGeometry(1, 1, 1);
    material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
    });
  } else if (num == 5) {
    geometry = new THREE.TorusGeometry(1, 0.3, 4, 3);
    material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      wireframe: true,
    });
  } else if (num == 2) {
    geometry = new THREE.CylinderGeometry(0.47, 0.47, 1, 7);
    material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      wireframe: true,
    });
  } else {
    geometry = new THREE.ConeGeometry(0.8, 1.8, 4);
    material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      wireframe: true,
    });
  }
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    // Chooses a real number between -100 and 100
    .map(() => THREE.MathUtils.randFloatSpread(245));

  star.position.set(x, y, z);

  const [rx, ry, rz] = Array(3)
    .fill()
    // Chooses a real number between -100 and 100
    .map(() => THREE.MathUtils.randFloatSpread(5));
  star.rotation.set(rx, ry, rz);
  scene.add(star);
}

Array(290).fill().forEach(addStar);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  planet.rotation.y += 0.08;

  // The top value is always negative, so its a good idea to multiply with a negative value
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;

  // console.log(camera.position.x);
  // console.log(camera.position.y);
  // console.log(camera.position.z);
}

document.body.onscroll = moveCamera;
moveCamera();

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  if (izzi) {
    vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    if (vw <= 800) {
      izzi.position.x = -39;
      izzi.position.z = 140;
      izzi.position.y = -19;
      izzi.scale.set(9.75, 10.5, 9.75);
    } else {
      izzi.position.set(11.5, -6, -20);
    }

    console.log(vw);
  }

  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onWindowResize, false);

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  if (izzi) izzi.rotation.y += 0.015;

  //controls.update();

  renderer.render(scene, camera);
}

animate();
