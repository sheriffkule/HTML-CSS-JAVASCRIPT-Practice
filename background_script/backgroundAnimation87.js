/**@type {HTMLCanvasElement} */

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let width, height, particles, comets, mouse, isTouchDevice, animationFrameId;
console.log(ctx);

let PARTICLE_COUNT = 400;
let PARTICLE_COLOR = [
  'rgba(38, 161, 123, 0.7)',
  'rgba(38, 142, 161, 0.7)',
  'rgba(38, 77, 161, 0.7)',
  'rgba(50, 38, 161, 0.7)',
  'rgba(140, 38, 161, 0.7)',
  'rgba(161, 38, 130, 0.7)',
  'rgba(161, 38, 38, 0.7)',
  'rgba(161, 83, 38, 0.7)',
  'rgba(161, 149, 38, 0.7)',
];
let COMET_CHANCE = 0.0025;

mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

function init() {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);

  isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

  if (isTouchDevice || width <= 700) {
    PARTICLE_COUNT = 100;
  }

  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * width,
      radius: Math.random() * 2 + 0.5,
    });
  }
  comets = [];
  draw();
}

function draw() {
  ctx.clearRect(0, 0, width, height);

  if (isTouchDevice) {
    ctx.fillStyle = PARTICLE_COLOR[Math.floor(Math.random() * PARTICLE_COLOR.length)];
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill;
      p.y += 0.3;

      if (p.y > height) {
        p.y = 0;
        p.x = Math.random() * width;
      }
    });
  } else {
    ctx.save();
    ctx.translate(width / 2, height / 2);
    const parallaxX = (mouse.x - width / 2) * 0.02;
    const parallaxY = (mouse.y - height / 2) * 0.02;

    particles.forEach((p) => {
      let scale = width / (width + p.z);
      let x = (p.x - width / 2 + parallaxX) * scale;
      let y = (p.y - height / 2 + parallaxY) * scale;
      let radius = p.radius * scale;
      let alpha = (1 - p.z / width) * 0.8 + 0.2;

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(38, 161, 123, ${alpha})`;
      ctx.fill();

      p.z -= 1.5;
      if (p.z < 0) p.z = width;
    });
    ctx.restore();

    if (Math.random() < COMET_CHANCE) {
      comets.push({
        x: Math.random() * width,
        y: 0,
        radius: Math.random() * 2 + 1,
        speed: Math.random() * 4 + 2,
        length: Math.random() * 120 + 50,
        color: PARTICLE_COLOR[Math.floor(Math.random() * PARTICLE_COLOR.length)],
      });
    }

    comets.forEach((comet, index) => {
      const gradient = ctx.createLinearGradient(comet.x, comet.y, comet.x, comet.y - comet.length);
      gradient.addColorStop(0, comet.color);
      gradient.addColorStop(1, 'rgba(45, 212, 191, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(comet.x - comet.radius, comet.y);
      ctx.lineTo(comet.x + comet.radius, comet.y);
      ctx.lineTo(comet.x, comet.y - comet.length);
      ctx.closePath();
      ctx.fill();
      comet.y += comet.speed;
      if (comet.y > height) comets.splice(index, 1);
    });
  }
  animationFrameId = requestAnimationFrame(draw);
}

function updateMouse(e) {
  if (!isTouchDevice) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }
}

window.addEventListener('resize', init);
window.addEventListener('mousemove', updateMouse);
init();
