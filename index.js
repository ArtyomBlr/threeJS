import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// The scene

const scene = new Scene();

// The Object

const geometry = new BoxGeometry(0.5, 0.5, 0.5);

const canvas = document.getElementById('three-canvas');

const blueCubeMaterial = new MeshBasicMaterial( {color: 'blue'} );
const redCubeMaterial = new MeshBasicMaterial( {color: 'red'} );

const blueCubeMesh = new Mesh(geometry, blueCubeMaterial);
blueCubeMesh.position.x -= 1;
const redCubeMesh = new Mesh(geometry, redCubeMaterial);
redCubeMesh.position.x += 1;

scene.add(blueCubeMesh);
scene.add(redCubeMesh);

// The camera

const camera = new PerspectiveCamera(75, canvas.clientWidth  / canvas.clientHeight);

scene.add(camera);

const renderer = new WebGLRenderer({ canvas });

renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
renderer.render(scene, camera);

camera.position.z = 2;

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

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
