import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three';


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

// Animation 

function animate() {
  blueCubeMesh.rotation.x += 0.01;
  blueCubeMesh.rotation.z += 0.01;

  redCubeMesh.rotation.x += 0.01;
  redCubeMesh.rotation.z += 0.01;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
