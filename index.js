import { 
  DirectionalLight, 
  AmbientLight,
  Mesh, 
  SphereGeometry, 
  MeshPhongMaterial, 
  PerspectiveCamera, 
  Scene, 
  WebGLRenderer, 
  AxesHelper, 
  Object3D, 
  GridHelper,
  PointsMaterial,
  Points,
  Raycaster,
  Vector2
} from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";

const canvas = document.getElementById('three-canvas');

// The scene

const scene = new Scene();

// The Object

const solarSystem = new Object3D();
scene.add(solarSystem);

const geometrySphere1 = new SphereGeometry(0.5); 
const geometrySphere2 = new SphereGeometry(0.5); 
const geometrySphere3 = new SphereGeometry(0.5); 
const geometryPoints = new SphereGeometry(8, 5, 5);

const sunColor = { color: 0xcba51a };

const yellowSphereMaterial = new MeshPhongMaterial(sunColor);
const blueSphereMaterial = new MeshPhongMaterial( {color: 'blue' });
const whiteSphereMaterial = new MeshPhongMaterial( {color: 'white' });
const whitePointsMaterial = new PointsMaterial({
	color: 'white',
	size: 0.2,
});

const sunMesh = new Mesh(geometrySphere1, yellowSphereMaterial);  

const earthMesh = new Mesh(geometrySphere2, blueSphereMaterial);
earthMesh.scale.set(0.2, 0.2, 0.2);
earthMesh.position.set(3, 0, 0);

const moonMesh = new Mesh(geometrySphere3, whiteSphereMaterial);
moonMesh.scale.set(0.4, 0.4, 0.4);
moonMesh.position.set(1, 0, 0);

const points = new Points(geometryPoints, whitePointsMaterial);

solarSystem.add(sunMesh);
solarSystem.add(points);
sunMesh.add(earthMesh);
earthMesh.add(moonMesh);

// The camera

const camera = new PerspectiveCamera(75, canvas.clientWidth  / canvas.clientHeight);

scene.add(camera);

const renderer = new WebGLRenderer({ canvas });

renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
renderer.render(scene, camera);
renderer.setClearColor(0x3e3e3e, 1);

camera.position.z = 5;
camera.position.y = 5;
camera.position.x = 6;

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Axes helper 

const axesHelper = new AxesHelper();
scene.add(axesHelper);

const grid = new GridHelper();
grid.material.depthTest = false;
grid.renderOrder = 2;
scene.add(grid);

// Lights

const color = 0xffffff;
const intensity = 1;
const light = new DirectionalLight(color, intensity);
light.position.set(1, 1, 1);

const baseLight = new AmbientLight(color, intensity);

scene.add(light, baseLight);

// Responsibility

window.addEventListener('resize', () => {
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
});

// Controls

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Animation  

function animate() {
  sunMesh.rotation.y += 0.005;
  earthMesh.rotation.y += 0.05;
  sunMesh.rotation.x += 0.0025;
  earthMesh.rotation.x += 0.025;

  controls.update();
  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}

animate();

// Raycaster

const raycaster = new Raycaster();
const mouse = new Vector2();
let previousSelectedUuid;

const objectsToTest = { 
  [points.uuid]: {object: points, color: 'white'},
  [sunMesh.uuid]: {object: sunMesh, color: sunColor.color},
  [earthMesh.uuid]: {object: earthMesh, color: 'blue'},
  [moonMesh.uuid]: {object: moonMesh, color: 'white'},
};

const objectsArray = Object.values(objectsToTest).map(item => item.object);

window.addEventListener('mousemove', (event) => {
	mouse.x = event.clientX / canvas.clientWidth * 2 - 1;
	mouse.y = - (event.clientY / canvas.clientHeight) * 2 + 1;

	raycaster.setFromCamera(mouse, camera)
	const intersects = raycaster.intersectObjects(objectsArray);

  if(!intersects.length) {
    resetPreviousSelection();
    return;
  };

  const firstIntersection = intersects[0];
  firstIntersection.object.material.color.set('red')

  const isNotPrevious = previousSelectedUuid !== firstIntersection.object.uuid;

	if(!!previousSelectedUuid && isNotPrevious) {
    resetPreviousSelection();
  }

  previousSelectedUuid = firstIntersection.object.uuid;
});

function resetPreviousSelection() {
  if(!previousSelectedUuid) return;

  const previousSelected = objectsToTest[previousSelectedUuid];
  previousSelected.object.material.color.set(previousSelected.color);
}

// Loader

// const loader = new GLTFLoader();
// const loadingElem = document.querySelector('#loader-container');
// const loadingText = loadingElem.querySelector('p');

// loader.load('./resources/glft/police_station.glb',
// 	( gltf ) => {
//     loadingElem.style.display = 'none';
// 		scene.add( gltf.scene );
// 	},
// 	( progress ) => {
//     const current = (progress.loaded /  progress.total) * 100;
//     const formatted = Math.trunc(current * 100) / 100; 
//     loadingText.textContent = `Loading: ${formatted}%`;
// 	},
// 	( error ) => {
// 		console.log( 'An error happened: ', error );
// 	}
// );

// Debugging 

const gui = new GUI();

const min = -3;
const max = 3;
const step = 0.01;

gui.add(solarSystem.position, 'y', min, max, step);
gui.add(solarSystem.position, 'x', min, max, step);
gui.add(solarSystem.position, 'z', min, max, step);

gui.add(earthMesh, 'visible').name('Cube visibility');

gui.addFolder('Light').add(yellowSphereMaterial, "wireframe").name("Wireframe");


gui.addColor(sunColor, 'color').onChange(() => {
	sunMesh.material.color.set(sunColor.color);
});
