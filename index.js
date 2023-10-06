import { BoxGeometry, PointLight, Mesh, SphereGeometry, MeshPhongMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// The scene

const scene = new Scene();

// The Object

const geometryBox = new BoxGeometry(0.5, 0.5, 0.5);
const geometrySphere = new SphereGeometry(0.5); 

const canvas = document.getElementById('three-canvas');

const blueCubeMaterial = new MeshPhongMaterial( {color: 'yellow' });
const redCubeMaterial = new MeshPhongMaterial( {color: 'red'} );

const cubeMesh = new Mesh(geometryBox, blueCubeMaterial);
cubeMesh.position.x -= 1;
const sphereMesh = new Mesh(geometrySphere, redCubeMaterial);
sphereMesh.position.x += 1;

scene.add(cubeMesh);
scene.add(sphereMesh);

// The camera

const camera = new PerspectiveCamera(75, canvas.clientWidth  / canvas.clientHeight);

scene.add(camera);

const renderer = new WebGLRenderer({ canvas });

renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
renderer.render(scene, camera);

camera.position.z = 2;

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Lights

// const light1 = new DirectionalLight(0xffffff);
// const light2 = new DirectionalLight(0xffffff);
// light1.position.set(1, 2, 3);
// light2.position.set(-1, -2, -3);
// scene.add(light1);
// scene.add(light2);

const color = 0xffffff;
const intensity = 2;
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
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
