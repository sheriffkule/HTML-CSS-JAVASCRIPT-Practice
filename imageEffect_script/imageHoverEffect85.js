/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const particles = [];

let mouseX = Infinity;
let mouseY = Infinity;

canvas.addEventListener('mousemove', (event) => {
  mouseX = event.offsetX;
  mouseY = event.offsetY;
});

canvas.addEventListener('mouseleave', () => {
  mouseX = Infinity;
  mouseY = Infinity;
});

const img = new Image();
img.src = '../images/clint.jpeg';

const PARTICLE_DIAMETER = 5;

img.addEventListener('load', () => {
  canvas.width = img.width;
  canvas.height = img.height;

  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, img.width, img.height).data;

  const numRows = Math.round(img.height / PARTICLE_DIAMETER);
  const numColumns = Math.round(img.width / PARTICLE_DIAMETER);

  for (let row = 0; row < numRows; row++) {
    for (let column = 0; column < numColumns; column++) {
      const pixelIndex = (row * PARTICLE_DIAMETER * img.width + column * PARTICLE_DIAMETER) * 4;

      const red = imageData[pixelIndex];
      const green = imageData[pixelIndex + 1];
      const blue = imageData[pixelIndex + 2];
      const alpha = imageData[pixelIndex + 3];

      particles.push({
        x: Math.floor(Math.random() * numColumns * PARTICLE_DIAMETER + PARTICLE_DIAMETER),
        y: Math.floor(Math.random() * numRows * PARTICLE_DIAMETER + PARTICLE_DIAMETER),
        originalX: column * PARTICLE_DIAMETER + PARTICLE_DIAMETER / 2,
        originalY: row * PARTICLE_DIAMETER + PARTICLE_DIAMETER / 2,
        color: `rgba(${red}, ${green}, ${blue}, ${alpha / 255})`,
      });
    }
  }
  drawParticles();
});

function drawParticles() {
  updateParticles();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, PARTICLE_DIAMETER / 2, 0, 2 * Math.PI);
    ctx.fillStyle = particle.color;
    ctx.fill();
  });
  requestAnimationFrame(drawParticles);
}

function updateParticles() {
  const REPEL_RADIUS = 50;
  const REPEL_SPEED = 5;
  const RETURN_SPEED = 0.1;

  particles.forEach((particle) => {
    const distanceFromMouseX = mouseX - particle.x;
    const distanceFromMouseY = mouseY - particle.y;
    const distanceFromMouse = Math.sqrt(distanceFromMouseX ** 2, distanceFromMouseY ** 2);

    if (distanceFromMouse < REPEL_RADIUS) {
      const angle = Math.atan2(distanceFromMouseY, distanceFromMouseX);
      const force = (REPEL_RADIUS - distanceFromMouse) / REPEL_RADIUS;
      const moveX = Math.cos(angle) * force * REPEL_SPEED;
      const moveY = Math.sin(angle) * force * REPEL_SPEED;

      particle.x -= moveX;
      particle.y -= moveY;
    } else if (particle.x !== particle.originalX || particle.y !== particle.originalY) {
      const distanceFromOriginX = particle.originalX - particle.x;
      const distanceFromOriginY = particle.originalY - particle.y;
      const distanceFromOrigin = Math.hypot(distanceFromOriginX, distanceFromOriginY);

      const angle = Math.atan2(distanceFromOriginY, distanceFromOriginX);
      const moveX = Math.cos(angle) * distanceFromOrigin * RETURN_SPEED;
      const moveY = Math.sin(angle) * distanceFromOrigin * RETURN_SPEED;

      particle.x += moveX;
      particle.y += moveY;
    }
  });
}
