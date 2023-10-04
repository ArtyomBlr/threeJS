import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three';


// The scene
const scene = new Scene();

// The Object
const geometry = new BoxGeometry(0.5, 0.5, 0.5);

const blueCubeMaterial = new MeshBasicMaterial( {color: 'blue'} );
const redCubeMaterial = new MeshBasicMaterial( {color: 'red'} );

const blueCubeMesh = new Mesh(geometry, blueCubeMaterial);
blueCubeMesh.position.x -= 1;
const redCubeMesh = new Mesh(geometry, redCubeMaterial);
redCubeMesh.position.x += 1;

scene.add(blueCubeMesh);
scene.add(redCubeMesh);

// The camera
const sizes = {
  width: 1000,
  height: 600
};

const camera = new PerspectiveCamera(75, sizes.width / sizes.height);

scene.add(camera);

const canvas = document.getElementById('three-canvas');
const renderer = new WebGLRenderer({ canvas });

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

camera.position.z = 2;

function animate() {
  blueCubeMesh.rotation.x += 0.01;
  blueCubeMesh.rotation.z += 0.01;

  redCubeMesh.rotation.x += 0.01;
  redCubeMesh.rotation.z += 0.01;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
