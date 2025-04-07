const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let canvasOffset = {
  x0: ctx.canvas.offsetLeft,
  y0: ctx.canvas.offsetTop,
  x1: ctx.canvas.offsetLeft + ctx.canvas.width,
  y1: ctx.canvas.offsetTop + ctx.canvas.height,
};

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
class Particle {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = 1.5;
    this.color = '#fff';
    this.vx = Math.random() * 0.5;
    this.vy = Math.random() * 0.5;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }
}

let circle = [];
for (let i = 0; i < 200; i++) {
  circle.push(new Particle(ctx));
}

function animate() {
  clearCanvas();
  circle.forEach((item) => {
    item.draw();

    item.x += item.vx;
    item.y += item.vy;

    if (item.x + item.size > canvas.width || item.x - item.size < 0) {
      item.vx *= -1;
    }
    if (item.y + item.size > canvas.height || item.y - item.size < 0) {
      item.vy *= -1;
    }
  });
  requestAnimationFrame(animate);
}

function handleResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  circle.forEach((item) => {
    item.x = Math.random() * canvas.width;
    item.y = Math.random() * canvas.height;
  });
}

window.addEventListener('resize', handleResize);
animate();
