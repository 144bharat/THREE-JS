import * as THREE from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//BG - Adding enviornment
const rgbeLoader = new RGBELoader();
rgbeLoader.load("/textures/environmentMap/4k.hdr",(environmentMap)=>{
    environmentMap.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = environmentMap;
});

//BG - textures
const textures = new THREE.TextureLoader();
const doorTexture = textures.load("/textures/door/color.jpg");
doorTexture.colorSpace = THREE.SRGBColorSpace;

//BG - adding point light
const pointLight = new THREE.PointLight("orange",70);
scene.add(pointLight);
//BG - object
const material = new THREE.MeshStandardMaterial({map:doorTexture});
//BG - to cut out the darker part from the object.
material.transparent = true;
material.alphaMap = doorTexture;
material.side=THREE.DoubleSide;

material.metalness = 1;
material.roughness = 1;
//BG - plane object
const planeObj = new THREE.Mesh(
    new THREE.PlaneGeometry(1,1),
    material
);
//BG - sphere object
const sphereObj = new THREE.Mesh(
    new THREE.SphereGeometry(0.5,16,16),
    material
);
sphereObj.position.x=-1.5;
//BG - torous object
const torusObj = new THREE.Mesh(
    new THREE.TorusGeometry(0.3,0.2,16,32),
    material
);

torusObj.position.x=1.5;
scene.add(planeObj,sphereObj,torusObj);
// material.wireframe = true;


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    //BG - rotate shapes
    planeObj.rotation.y = elapsedTime;
    sphereObj.rotation.y = elapsedTime;
    torusObj.rotation.y = elapsedTime;
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()