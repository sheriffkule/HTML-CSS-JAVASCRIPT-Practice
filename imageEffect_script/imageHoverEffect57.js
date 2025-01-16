let data = [
  { name: '../thumb/bakeryWebsite.jpg' },
  { name: '../thumb/architectureWebsite.jpg' },
  { name: '../thumb/cactusWebsite.jpg' },
  { name: '../thumb/chipsWebsite.jpg' },
  { name: '../thumb/burgerWebsite.jpg' },
  { name: '../thumb/bookWebsite.jpg' },
  { name: '../thumb/FruitSite.jpg' },
  { name: '../thumb/lampWebsite.jpg' },
  { name: '../thumb/pizzaWebsite.jpg' },
  { name: '../thumb/plantWebsite.jpg' },
  { name: '../thumb/portfolio06.jpg' },
  { name: '../thumb/helloweenSite.jpg' },
  { name: '../thumb/portfolio07.jpg' },
  { name: '../thumb/portfolio08.jpg' },
  { name: '../thumb/portfolio5.jpg' },
];

const params = {
  rows: 5,
  columns: 5,
  curvature: 5,
  spacing: 8,
  imageWidth: 7,
  imageHeight: 4.5,
  depth: 7.5,
  elevation: 0,
  lookAtRange: 20,
  verticalCurvature: 0.5,
};

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  25,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 0, 40);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x667e99);
document.body.appendChild(renderer.domElement);

const DEBUT_MODE = false;
let gui;
if (DEBUT_MODE) {
  gui = new dat.GUI();
  gui.add(params, 'rows', 1, 8).onChange(updateGallery);
  gui.add(params, 'columns', 1, 10).onChange(updateGallery);
  gui.add(params, 'imageWidth', 1, 10).onChange(updateGallery);
  gui.add(params, 'imageHeight', 1, 10).onChange(updateGallery);
  gui.add(params, 'spacing', 2, 10).onChange(updateGallery);
  gui.add(params, 'curvature', 0, 10).onChange(updateGallery);
  gui.add(params, 'depth', 5, 50).onChange(updateGallery);
  gui.add(params, 'verticalCurvature', 0, 2).onChange(updateGallery);
  gui.add(params, 'elevation', -10, 10).onChange(updateGallery);
  gui.add(params, 'lookAtRange', 5, 50).onChange(updateGallery);
}

const header = document.querySelector('.header');
let headerRotationX = 0;
let headerRotationY = 0;
let headerTranslateZ = 0;

let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;
const lookAtTarget = new THREE.Vector3(0, 0, 0);

function createImageElement(imageSource) {
  const image = document.createElement('img');
  image.src = imageSource;
  image.crossOrigin = 'anonymous';
  image.loop = true;
  image.muted = true;
  image.playsInline = true;
//   image.play();
  return image;
}

function calculateRotations(x, y) {
  const a = 1 / (params.depth * params.curvature);
  const slopeY = -2 * a * x;
  const rotationY = Math.atan(slopeY);

  const verticalFactor = params.verticalCurvature;
  const maxYDistance = (params.rows * params.spacing) / 2;
  const normalizedY = y / maxYDistance;
  const rotationX = normalizedY * verticalFactor;

  return { rotationX, rotationY };
}

function calculatePosition(row, col) {
  let x = (col - params.columns / 2) * params.spacing;
  let y = (row - params.rows / 2) * params.spacing;

  let z = (x * x) / (params.depth * params.curvature);

  const normalizedY = y / ((params.rows * params.spacing) / 2);
  z += Math.abs(normalizedY) * normalizedY * params.verticalCurvature * 5;

  y += params.elevation;

  const { rotationX, rotationY } = calculateRotations(x, y);

  return { x, y, z, rotationX, rotationY };
}

let images = [];

function createImagePlane(row, col) {
  const imageData = data[Math.floor(Math.random() * data.length)];

  const geometry = new THREE.PlaneGeometry(params.imageWidth, params.imageHeight);

  const image = createImageElement(imageData.name);
  const imageTexture = new THREE.TextureLoader().load(image.src);
  imageTexture.minFilter = THREE.LinearFilter;
  imageTexture.magFilter = THREE.LinearFilter;

  const material = new THREE.MeshBasicMaterial({
    map: imageTexture,
    side: THREE.DoubleSide,
  });
  console.log(image);

  const plane = new THREE.Mesh(geometry, material);
  const { x, y, z, rotationX, rotationY } = calculatePosition(row, col);

  plane.position.set(x, y, z);
  plane.rotation.x = rotationX;
  plane.rotation.y = rotationY;

  plane.userData.basePosition = { x, y, z };
  plane.userData.baseRotation = { x: rotationX, y: rotationY, z: 0 };
  plane.userData.parallaxFactor = Math.random() * 0.5 + 0.5;
  plane.userData.randomOffset = {
    x: Math.random() * 2 - 1,
    y: Math.random() * 2 - 1,
    z: Math.random() * 2 - 1,
  };
  plane.userData.rotationModifier = {
    x: Math.random() * 0.15 - 0.075,
    y: Math.random() * 0.15 - 0.075,
    z: Math.random() * 0.2 - 0.1,
  };
  plane.userData.phaseOffset = Math.random() * Math.PI * 2;

  plane.userData.image = image;

  return plane;
}

function updateGallery() {
  images.forEach((plane) => {
    if (plane.userData.image) {
      plane.userData.image.pause();
      plane.userData.image.remove();
    }
    scene.remove(plane);
  });

  images = [];

  for (let row = 0; row < params.rows; row++) {
    for (let col = 0; col < params.columns; col++) {
      const plane = createImagePlane(row, col);
      images.push(plane);
      scene.add(plane);
    }
  }
}

document.addEventListener('mousemove', (event) => {
  mouseX = (event.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
  mouseY = (event.clientY - window.innerHeight / 2) / (window.innerHeight / 2);

  headerRotationX = -mouseY * 40;
  headerRotationY = mouseX * 40;
  headerTranslateZ = Math.abs(mouseX * mouseY) * 50;
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);

  const targetTransform = `
        translate(-50%, -50%)
        perspective(1000px)
        rotateX(${headerRotationX}deg)
        rotateY(${headerRotationY}deg)
        translateZ(${headerTranslateZ}px)
    `;

  header.style.transform = targetTransform;
  header.style.transition = 'transform 0.5s ease-in-out';

  targetX += (mouseX - targetX) * 0.05;
  targetY += (mouseY - targetY) * 0.05;

  lookAtTarget.x = targetX * params.lookAtRange;
  lookAtTarget.y = -targetY * params.lookAtRange;
  lookAtTarget.z = (lookAtTarget.x * lookAtTarget.x) / (params.depth * params.curvature);

  const time = performance.now() * 0.001;

  images.forEach((plane) => {
    const {
      basePosition,
      baseRotation,
      parallaxFactor,
      randomOffset,
      rotationModifier,
      phaseOffset,
    } = plane.userData;

    const mouseDistance = Math.sqrt(targetX * targetX + targetY * targetY);
    const parallaxX = targetX * parallaxFactor * 3 * randomOffset.x;
    const parallaxY = targetY * parallaxFactor * 3 * randomOffset.y;
    const oscillation = Math.sin(time + phaseOffset) * mouseDistance * 0.1;

    plane.position.x = basePosition.x + parallaxX + oscillation * randomOffset.x;
    plane.position.y = basePosition.y + parallaxY + oscillation * randomOffset.y;
    plane.position.z = basePosition.z + oscillation * randomOffset.z * parallaxFactor;

    plane.rotation.x = baseRotation.x + targetY * rotationModifier.x * mouseDistance + oscillation * rotationModifier.x * 0.2;
    plane.rotation.y = baseRotation.y + targetX * rotationModifier.y * mouseDistance + oscillation * rotationModifier.y * 0.2;
    plane.rotation.z = baseRotation.z + targetX * targetY * rotationModifier.z * 2 + oscillation * rotationModifier.z * 0.2;
  });

  camera.lookAt(lookAtTarget);
  renderer.render(scene, camera);
}

updateGallery();
animate();