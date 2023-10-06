import { PointLight, Mesh, SphereGeometry, MeshPhongMaterial, PerspectiveCamera, Scene, WebGLRenderer, AxesHelper, Object3D } from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const canvas = document.getElementById('three-canvas');

// The scene

const scene = new Scene();

// The Object

const solarSystem = new Object3D();
scene.add(solarSystem);

const geometrySphere1 = new SphereGeometry(0.5); 
const geometrySphere2 = new SphereGeometry(0.5); 
const geometrySphere3 = new SphereGeometry(0.5); 

const yellowSphereMaterial = new MeshPhongMaterial( {color: 'gold' });
const blueSphereMaterial = new MeshPhongMaterial( {color: 'blue' });
const whiteSphereMaterial = new MeshPhongMaterial( {color: 'white' });

const sunMesh = new Mesh(geometrySphere1, yellowSphereMaterial);

const earthMesh = new Mesh(geometrySphere2, blueSphereMaterial);
earthMesh.scale.set(0.2, 0.2, 0.2);
earthMesh.position.set(3, 0, 0);

const moonMesh = new Mesh(geometrySphere3, whiteSphereMaterial);
moonMesh.scale.set(0.4, 0.4, 0.4);
moonMesh.position.set(1, 0, 0);

solarSystem.add(sunMesh);
sunMesh.add(earthMesh);
earthMesh.add(moonMesh);

// The camera

const camera = new PerspectiveCamera(75, canvas.clientWidth  / canvas.clientHeight);

scene.add(camera);

const renderer = new WebGLRenderer({ canvas });

renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
renderer.render(scene, camera);

camera.position.z = 2;

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Axes helper 

const axesHelper = new AxesHelper();
scene.add(axesHelper);

// Lights

// const light1 = new DirectionalLight(0xffffff);
// const light2 = new DirectionalLight(0xffffff);
// light1.position.set(1, 2, 3);
// light2.position.set(-1, -2, -3);
// scene.add(light1);
// scene.add(light2);

const color = 0xffffff;
const intensity = 10;
const light = new PointLight(color, intensity);
light.position.set(1, 1, 1);

scene.add(light);

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
