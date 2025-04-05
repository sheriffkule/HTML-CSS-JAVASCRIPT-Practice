const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};

canvas.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

class Star {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.z = Math.random() * 1000;
  }

  update() {
    this.z -= 3;
    if (this.z <= 0) this.z = 1000;
    const scale = 1000 / this.z;
    const x = (this.x - mouse.x) * scale + mouse.x;
    const y = (this.y - mouse.y) * scale + mouse.y;
    const dist = Math.sqrt((x - mouse.x) ** 2 + (y - mouse.y) ** 2);

    ctx.beginPath();
    ctx.arc(x, y, scale, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${dist % 360}, 100%, 50%)`;
    ctx.fill();
  }
}

const stars = Array(1000).fill().map(() => new Star());

function animate() {
  ctx.fillStyle = 'rgba(0,0,0,0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  stars.forEach((star) => star.update());

  requestAnimationFrame(animate);
}

animate();