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
controls.maxDistance = 150; // Increased max distance to allow zooming out further

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

// Load the computer desk model once
loader.load("/desk.glb", (gltf) => {
  models.computerDesk = gltf.scene;
  arrangePCSets();
});

loader.load("/whiteboard.glb", (gltf) => {
  models.whiteboard = gltf.scene;
  positionWhiteboard();
});

loader.load("/computerDesk.glb", (gltf) => {
  models.desk = gltf.scene;
  positionDesk();
});

loader.load("/shelf.glb", (gltf) => {
  models.shelf = gltf.scene;
  positionShelf();
});

loader.load("/bookShelf.glb", (gltf) => {
  models.bookShelf = gltf.scene;
  positionbookShelf();
});

loader.load("/glass_door.glb", (gltf) => {
  models.door = gltf.scene;
  positionDoor();
});

loader.load("/glass_door.glb", (gltf) => {
  models.door2 = gltf.scene;
  positionDoor2();
});

// Arrange Computer Desks
function arrangeComputerDesks() {
  const rows = 3;
  const cols = 3;
  const spacing = 7; // Spacing between desks
  const marginRight = -4; // Margin to keep desks away from the right wall
  const mainDeskRowOffset = -20; // Move the main 3x3 grid towards the fourth wall

  // Main 3x3 grid of desks near the fourth wall
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const desk = models.computerDesk.clone();
      desk.scale.set(0.6, 0.6, 0.6); // Reduced size
      desk.position.set(
        j * spacing - (cols * spacing) / 2 + marginRight,
        0,
        i * spacing + mainDeskRowOffset + 14
      );
      scene.add(desk);
    }
  }

  // Additional 2x3 grid of desks positioned near the back wall
  const newGridRows = 2;
  const newGridCols = 3;
  const newGridSpacing = 7; // Same spacing between desks
  const backWallOffset = -10; // Offset for positioning new grid near the back wall

  for (let i = 0; i < newGridRows; i++) {
    for (let j = 0; j < newGridCols; j++) {
      const desk = models.computerDesk.clone();
      desk.scale.set(0.6, 0.6, 0.6); // Reduced size
      desk.position.set(
        j * newGridSpacing - (newGridCols * newGridSpacing) / 2 - 4,
        0,
        i * newGridSpacing + backWallOffset + 27
      );
      scene.add(desk);
    }
  }
}

// Arrange PC sets in the three-part room
function arrangePCSets() {
  const rows = 3;
  const cols = 5;
  const spacing = 7; // Spacing between desks
  const marginRight = -4; // Margin to keep desks away from the right wall
  const mainDeskRowOffset = -25; // Move the main 3x3 grid towards the fourth wall

  // Main 3x3 grid of desks near the fourth wall
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const desk = models.computerDesk.clone();
      desk.scale.set(0.6, 0.6, 0.6); // Reduced size
      desk.position.set(
        j * spacing - (cols * spacing) / 2 + marginRight + 38,
        0,
        i * spacing + mainDeskRowOffset
      );
      scene.add(desk);
    }
  }

  // Additional 2x3 grid of desks positioned near the back wall
  const newGridRows = 3;
  const newGridCols = 5;
  const newGridSpacing = 7; // Same spacing between desks
  const backWallOffset = -10; // Offset for positioning new grid near the back wall

  for (let i = 0; i < newGridRows; i++) {
    for (let j = 0; j < newGridCols; j++) {
      const desk = models.computerDesk.clone();
      desk.scale.set(0.6, 0.6, 0.6); // Reduced size
      desk.position.set(
        j * newGridSpacing - (newGridCols * newGridSpacing) / 2 + 34,
        0,
        i * newGridSpacing + backWallOffset + 9.5
      );
      scene.add(desk);
    }
  }
  // Additional 2x3 grid of desks positioned near the back wall
  const newGridRows1 = 1;
  const newGridCols1 = 5;
  const newGridSpacing1 = 7; // Same spacing between desks
  const backWallOffset1 = -10; // Offset for positioning new grid near the back wall

  for (let i = 0; i < newGridRows1; i++) {
    for (let j = 0; j < newGridCols1; j++) {
      const desk = models.computerDesk.clone();
      desk.scale.set(0.6, 0.6, 0.6); // Reduced size
      desk.position.set(
        j * newGridSpacing1 - (newGridCols1 * newGridSpacing1) / 2 + 34,
        0,
        i * newGridSpacing1 + backWallOffset1 + 34
      );
      scene.add(desk);
    }
  }
}

// Call the function to arrange PC sets in the room
// arrangePCSets();

// Position Whiteboard
function positionWhiteboard() {
  models.whiteboard.scale.set(4, 4, 2); // Increased size of the whiteboard
  models.whiteboard.position.set(-29, 2, 8); // Placed on the left wall
  models.whiteboard.rotation.y = Math.PI / 2;
  scene.add(models.whiteboard);
}

// // Position Main Desk
// function positionDesk() {
//   models.desk.scale.set(6, 6, 6);
//   models.desk.position.set(-25, 0, -25);
//   // Rotate the desk to face the fourth wall (facing towards the front of the room)
//   models.desk.rotation.y = Math.PI; // Rotate 180 degrees to face the front
//   models.desk.rotation.x = 0;
//   scene.add(models.desk);
// }
function positionDesk() {
  models.desk.scale.set(9.5, 9.5, 9.5);
  models.desk.position.set(-26, 0, -23);
  // Rotate the desk to face the fourth wall (facing towards the front of the room)
  models.desk.rotation.y = Math.PI; // Rotate 180 degrees to face the front
  scene.add(models.desk);
}

// Position Shelf
function positionShelf() {
  models.shelf.scale.set(2, 3, 3); // Increase the size of the shelf
  models.shelf.position.set(-18, 0, -29); // Closer to the back wall
  models.shelf.rotation.y = Math.PI / 2; // Rotate 180 degrees to face the back wall
  models.shelf.rotation.x = 0; // Ensure the shelf is upright
  scene.add(models.shelf);
}

function positionbookShelf() {
  models.bookShelf.scale.set(10, 10, 15); // Adjust the height to be shorter than the wall height (15 units)
  models.bookShelf.position.set(-21, 12, -29); // Closer to the back wall
  models.bookShelf.rotation.y = Math.PI / 2; // Rotate 90 degrees to face the back wall
  models.bookShelf.rotation.x = 0; // Ensure the bookShelf is upright
  scene.add(models.bookShelf);
}

// Position Door
function positionDoor() {
  models.door.scale.set(0.1, 0.06, 0.05); // Scale down the door's dimensions
  models.door.position.set(-25, 0, 30); // Position at the center of the fourth wall
  models.door.rotation.y = Math.PI; // Ensure it faces inward
  scene.add(models.door);
}

// Position Door2
function positionDoor2() {
  models.door2.scale.set(0.1, 0.06, 0.05); // Scale down the door2's dimensions
  models.door2.position.set(35, 0, 30); // Position at the center of the fourth wall
  models.door2.rotation.y = Math.PI; // Ensure it faces inward
  scene.add(models.door2);
}

function machineBox() {
  const machineGeometry = new THREE.BoxGeometry(10, 7, 10);
  const machineMaterial = new THREE.MeshStandardMaterial({ color: 0x000ff1 }); // Match wall color
  const machine = new THREE.Mesh(machineGeometry, machineMaterial);
  machine.position.set(-0.5, 4, -17); // Adjust position as needed
  scene.add(machine);
}
machineBox();

// Add Square Pillar between Whiteboard and Shelf
function addSquarePillar() {
  const pillarGeometry = new THREE.BoxGeometry(4, 15, 4); // Square pillar with equal width and depth
  const pillarMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff }); // Match wall color
  const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
  pillar.position.set(-28, 7.5, -10); // Adjust position as needed
  scene.add(pillar);
}

// Add Square Pillar
addSquarePillar();

// Add Floor and Walls
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(80, 60), // Increase the length along the x-axis
  new THREE.MeshStandardMaterial({ color: 0xaaaaaa })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -0.1; // Ensure it sits just above the base to avoid Z-fighting
floor.position.set(10, 0, 0); // Adjusted to center more with the room and extend past the right wall
scene.add(floor);

// Back Wall (aligned with left and right walls at the back of the room)
const backWall = new THREE.Mesh(
  new THREE.PlaneGeometry(80, 15), // Adjusted to the same width as the left and right walls
  new THREE.MeshStandardMaterial({ color: 0xdddddd, side: THREE.DoubleSide })
);
backWall.position.set(10, 7.5, -30); // Positioned at the back of the room
scene.add(backWall);

// Fourth Wall (aligned with left and right walls at the front of the room)
const fourthWall = new THREE.Mesh(
  new THREE.PlaneGeometry(80, 15), // Same width as the left and right walls
  new THREE.MeshStandardMaterial({ color: 0xdddddd, side: THREE.DoubleSide })
);
fourthWall.position.set(10, 7.5, 30); // Positioned at the front of the room
fourthWall.rotation.y = Math.PI; // Ensure it faces inward
scene.add(fourthWall);

// Left Wall
const leftWall = new THREE.Mesh(
  new THREE.PlaneGeometry(60, 15), // Same width as the back and right walls
  new THREE.MeshStandardMaterial({ color: 0xdddddd, side: THREE.DoubleSide })
);
leftWall.rotation.y = Math.PI / 2;
leftWall.position.set(-30, 7.5, 0); // Positioned on the left side of the room
scene.add(leftWall);

// Right Wall
const rightWall = new THREE.Mesh(
  new THREE.PlaneGeometry(60, 15), // Same width as the back and left walls
  new THREE.MeshStandardMaterial({ color: 0xdddddd, side: THREE.DoubleSide })
);
rightWall.rotation.y = Math.PI / 2;
rightWall.position.set(5, 7.5, 0); // Positioned on the right side of the room
scene.add(rightWall);

// Fifth Wall (to close off the back side of the room)
const fifthWall = new THREE.Mesh(
  new THREE.PlaneGeometry(60, 15), // Adjust the width and height as needed
  new THREE.MeshStandardMaterial({ color: 0xdddddd, side: THREE.DoubleSide })
);
fifthWall.position.set(50, 7.5, 0); // Positioned behind the current room space
fifthWall.rotation.y = -Math.PI / 2;
scene.add(fifthWall);

// Position the camera and render the scene
camera.position.set(0, 15, 30); // Set the camera position
controls.update();
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
