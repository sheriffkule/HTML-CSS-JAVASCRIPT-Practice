/**@type {HTMLCanvasElement} */
const canvas = document.getElementById('shape');
const ctx = canvas.getContext('2d');

let w = (canvas.width = window.innerWidth);
let h = (canvas.height = window.innerHeight);

window.addEventListener('resize', () => {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
});

let mouse = { x: w / 2, y: h / 2 };

document.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

let dots = Array.from({ length: 150 }, (_, i) => ({
  angle: -i * 0.3,
  radius: i * 2,
  color: `hsl(${(i * 360) / 150}, 100%, 70%)`,
}));

function animate() {
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(0, 0, w, h);

  dots.forEach((dot) => {
    dot.angle += 0.015;
    const x = mouse.x + dot.radius * Math.cos(dot.angle);
    const y = mouse.y + dot.radius * Math.sin(dot.angle);
    ctx.beginPath();
    ctx.fillStyle = dot.color;
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();
