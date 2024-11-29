import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 5;
controls.maxDistance = 50;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

// GLTF Loader
const loader = new GLTFLoader();
const models = {};

// Load Models
loader.load("/desk.glb", (gltf) => {
  models.computerDesk = gltf.scene;
  arrangeComputerDesks();
});

loader.load("/whiteboard.glb", (gltf) => {
  models.whiteboard = gltf.scene;
  positionWhiteboard();
});

loader.load("/desk1.glb", (gltf) => {
  models.desk = gltf.scene;
  positionDesk();
});

loader.load("/shelf.glb", (gltf) => {
  models.shelf = gltf.scene;
  positionShelf();
});

// Load Door Model
loader.load("/glass_door.glb", (gltf) => {
  models.door = gltf.scene;
  positionDoor();
});

// // Arrange Computer Desks
// function arrangeComputerDesks() {
//   const rows = 3;
//   const cols = 4;
//   const spacing = 7; // Increased spacing between desks
//   const marginRight = 12; // Margin to keep desks away from the right wall

//   for (let i = 0; i < rows; i++) {
//     for (let j = 0; j < cols; j++) {
//       const desk = models.computerDesk.clone();
//       desk.scale.set(0.6, 0.6, 0.6); // Reduced size
//       desk.position.set(
//         j * spacing - (cols * spacing) / 2 + marginRight,
//         0,
//         i * spacing - rows * 2
//       );
//       scene.add(desk);
//     }
//   }
// }

// Arrange Computer Desks
function arrangeComputerDesks() {
  const rows = 3;
  const cols = 4;
  const spacing = 7; // Spacing between desks
  const marginRight = 12; // Margin to keep desks away from the right wall

  // Existing 3 rows and 4 columns of desks
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const desk = models.computerDesk.clone();
      desk.scale.set(0.6, 0.6, 0.6); // Reduced size
      desk.position.set(
        j * spacing - (cols * spacing) / 2 + marginRight,
        0,
        i * spacing - rows * 2
      );
      scene.add(desk);
    }
  }

  // Add the 2 extra desks in 2 rows and 1 column
  const extraDeskSpacing = 7; // Spacing between the extra desks in the column

  for (let i = 0; i < 2; i++) {
    const extraDesk = models.computerDesk.clone();
    extraDesk.scale.set(0.6, 0.6, 0.6); // Reduced size

    // Position the desks near the left wall and in front of the existing desks
    extraDesk.position.set(
      -9, // X-coordinate to place desks near the left wall
      0,
      -(i * extraDeskSpacing)+8 // Z-coordinate to place desks just in front of the existing desks
    );
    scene.add(extraDesk);
  }
}

// Position Whiteboard
function positionWhiteboard() {
  models.whiteboard.scale.set(3, 3, 1.5); // Increased size of the whiteboard
  models.whiteboard.position.set(-24, 2, 0); // Placed on the left wall
  models.whiteboard.rotation.y = Math.PI / 2;
  scene.add(models.whiteboard);
}

// // Position Main Desk
// function positionDesk() {
//   models.desk.scale.set(7, 7, 7); // Increase the size of the desk
//   models.desk.position.set(-15, 0, -12.5); // Adjusted to place the desk close to the back wall
//   models.desk.rotation.y = Math.PI / 2; // Ensure it is facing the right direction
//   scene.add(models.desk);
// }

function positionDesk() {
  models.desk.scale.set(6, 6, 6); 
  models.desk.position.set(-7.5, 0, -14); 

  // Rotate the desk to face the fourth wall (facing towards the front of the room)
  models.desk.rotation.y = Math.PI; // Rotate 180 degrees to face the front

  scene.add(models.desk);
}

// Position Shelf
function positionShelf() {
  models.shelf.scale.set(2, 2, 2); // Increase the size of the shelf
  // Move the shelf even closer to the back wall
  models.shelf.position.set(-24, 0, -12); // Closer to the back wall

  // Rotate the shelf to stand upright and face forward toward the desks
  models.shelf.rotation.y = Math.PI; // 180 degrees to face forward toward the desks
  models.shelf.rotation.x = 0; // Ensure the shelf is upright

  scene.add(models.shelf);
}

function positionDoor() {
  // Adjust the scale to make the door appear more reasonable in size
  models.door.scale.set(0.1, 0.06, 0.05); // Scale down the door's dimensions
  models.door.position.set(-18, 0, 15); // Position at the front of the room
  models.door.rotation.y = Math.PI; // Ensure it faces inward
  scene.add(models.door);
}

// Add Floor and Walls
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(50, 30), // Lengthened floor
  new THREE.MeshStandardMaterial({ color: 0xaaaaaa })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Back Wall (already added)
const backWall = new THREE.Mesh(
  new THREE.PlaneGeometry(50, 15),
  new THREE.MeshStandardMaterial({ color: 0xdddddd, side: THREE.DoubleSide })
);
backWall.position.set(0, 7.5, -15); // Corrected position
scene.add(backWall);

// Left Wall
const leftWall = new THREE.Mesh(
  new THREE.PlaneGeometry(30, 15), // Adjusted width
  new THREE.MeshStandardMaterial({ color: 0xdddddd, side: THREE.DoubleSide })
);
leftWall.rotation.y = Math.PI / 2;
leftWall.position.set(-25, 7.5, 0); // Corrected position
scene.add(leftWall);

// Right Wall
const rightWall = new THREE.Mesh(
  new THREE.PlaneGeometry(30, 15),
  new THREE.MeshStandardMaterial({ color: 0xdddddd, side: THREE.DoubleSide })
);
rightWall.rotation.y = Math.PI / 2;
rightWall.position.set(25, 7.5, 0); // Corrected position
scene.add(rightWall);

// Fourth Wall (newly added)
const fourthWall = new THREE.Mesh(
  new THREE.PlaneGeometry(50, 15), // Same size as the back wall
  new THREE.MeshStandardMaterial({ color: 0xdddddd, side: THREE.DoubleSide })
);
fourthWall.position.set(0, 7.5, 15); // Placed at the front of the room
fourthWall.rotation.y = Math.PI; // Ensure it faces inward
scene.add(fourthWall);

// Camera Position
camera.position.set(0, 15, 40);
camera.lookAt(0, 0, 0);

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
