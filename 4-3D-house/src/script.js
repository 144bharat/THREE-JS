import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { color } from "three/examples/jsm/nodes/Nodes.js";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

/**
 * House
 */
const houseGroup = new THREE.Group();
// Adding Wall
const wall = new THREE.Mesh(
  new THREE.BoxGeometry(4,2.5,4),
  new THREE.MeshStandardMaterial({color:"yellow"})
)
wall.position.y = 1.25
houseGroup.add(wall);

// Adding rooftop
const rooftop = new THREE.Mesh(
  new THREE.ConeGeometry(4,3,4),
  new THREE.MeshStandardMaterial()
)
rooftop.rotation.y = Math.PI/4;
rooftop.position.y = 3.5;
houseGroup.add(rooftop);

// Adding door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2,2),
  new THREE.MeshStandardMaterial({color:"brown"})
)
// door.rotation.y = Math.PI/2;
door.position.y = 1;
door.position.z = 2.001;
houseGroup.add(door);
scene.add(houseGroup);


// Adding road
const road = new THREE.Mesh(
  new THREE.PlaneGeometry(20,2),
  new THREE.MeshStandardMaterial({color:"white"})
)
road.rotation.x = -Math.PI/2;
road.position.y = 0.01;
road.position.z = 6;
scene.add(road);

// Adding car
//Adding car wheels
const wheelGroup = new THREE.Group();
wheelGroup.position.y = 0.25;
scene.add(wheelGroup);
const backWheel = new THREE.Mesh(
  new THREE.BoxGeometry(2,0.5,0.5),
  new THREE.MeshStandardMaterial({color:"black"})
)

backWheel.position.z = 6;
backWheel.rotation.y = Math.PI/2;
wheelGroup.add(backWheel);
const frontWheel = new THREE.Mesh(
  new THREE.BoxGeometry(2,0.5,0.5),
  new THREE.MeshStandardMaterial({color:"black"})
)

frontWheel.position.z = 6;
frontWheel.rotation.y = Math.PI/2;
frontWheel.position.x = 2;
wheelGroup.add(frontWheel);
// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({ color: "#a9c388" })
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight("#ffffff", 1.5);
moonLight.position.set(4, 5, -2);
gui.add(moonLight, "intensity").min(0).max(1).step(0.001);
gui.add(moonLight.position, "x").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "y").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "z").min(-5).max(5).step(0.001);
scene.add(moonLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
