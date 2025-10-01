/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.lineWidth = 1;
ctx.shadowOffsetX = 10;
ctx.shadowOffsetY = 10;
ctx.shadowBlur = 10;
ctx.shadowColor = 'black';
let hue = 0;
let drawing = false;
// ctx.globalCompositeOperation = 'difference';

function drawShape(x, y, radius, inset, n) {
  //   ctx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
  ctx.beginPath();
  ctx.save();
  ctx.translate(x, y);
  ctx.moveTo(0, 0 - radius);

  for (let i = 0; i < n; i++) {
    ctx.rotate(Math.PI / n);
    ctx.lineTo(0, 0 - radius * inset);
    ctx.rotate(Math.PI / n);
    ctx.lineTo(0, 0 - radius);
  }

  ctx.restore();
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}

const radius = 40;
const inset = 0.4;
const n = 2;

// drawShape(80, 80, radius * 0.9, 0.2, 5);
// drawShape(120, 120, radius, inset, n);

let angle = 0;
window.addEventListener('mousemove', function (e) {
  if (drawing) {
    ctx.save();
    ctx.translate(e.x, e.y);
    // hue += 3;
    ctx.rotate(angle);
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    drawShape(2, 2, radius, 1, 3);

    ctx.rotate(-angle * 3);
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'white';
    drawShape(radius / 2 + 15, radius / 2 + 15, radius * 0.5, 0.5, 3);

    ctx.rotate(-angle * 0.5);
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'black';
    drawShape(radius / 1.5 + 10, radius / 1.5 + 10, radius * 0.2, 0.5, 3);

    angle += 0.05;
    ctx.restore();
  }
});

window.addEventListener('mousedown', () => {
  drawing = true;
});

window.addEventListener('mouseup', () => {
  drawing = false;
});
