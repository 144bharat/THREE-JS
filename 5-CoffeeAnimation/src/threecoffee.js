import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Base
 */
// Canvas
const canvas = document.getElementById("webgl");

// Scene
const scene = new THREE.Scene();

//BG - texture
//BG - Loading manager ka use hum isliye krte hai taaki jab saare textures load ho jaye tabhi user ko website shoe kre till then we can provide a loading gif.
const loadingManager =  new THREE.LoadingManager();

loadingManager.onStart = () => {
  console.log("loading starts from here.");
};

loadingManager.onProgress = () => {
  console.log("loading is in progress.");
};

loadingManager.onError = (err) => {
  console.log("loading failed due to some error." + err);
};

const textureLoader = new THREE.TextureLoader(loadingManager);
const bharattexture = textureLoader.load("/Coffee cup/tex/coffee cup.jpg");
bharattexture.colorSpace = THREE.SRGBColorSpace;
// /**
//  * Object
//  */
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ map:bharattexture }); //color: 0xff0000
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);
// Load the coffee cup model
const loader = new OBJLoader();
loader.load('Coffee cup/obj/coffee cup.obj', (object) => {
    // Assuming the coffee cup has only one material
    const material = new THREE.MeshStandardMaterial({
        map: bharattexture, // Apply the loaded texture
        roughness: 0.5, // Adjust roughness as needed
        color: 0xffffff, // Set a base color (white)
    });

    // Traverse through the object's children and apply the material
    object.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            child.material = material;
        }
    });

    scene.add(object);
});

// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xFFC0CB, 1); // Soft white light
pointLight.position.set(-1,1,1);
scene.add(pointLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // White directional light
directionalLight.position.set(1, 1, 1); // Adjust position
scene.add(directionalLight);

// ... (rest of your code)

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
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 1;
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

renderer.setClearColor(0xffffff); // White background
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
