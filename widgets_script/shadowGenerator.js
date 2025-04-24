const preview = document.getElementById('preview');
const styles = document.getElementById('styles');
const ranges = document.querySelectorAll('.settings input');
const copyButton = document.getElementById('copy-styles');

ranges.forEach((slider) => {
  slider.addEventListener('input', generateStyles);
});

function generateStyles() {
  const xShadow = document.getElementById('x-shadow').value;
  const yShadow = document.getElementById('y-shadow').value;
  const blurRadius = document.getElementById('blur-r').value;
  const spreadRadius = document.getElementById('spread-r').value;
  const shadowOpacity = document.getElementById('shadow-opacity').value;
  const borderRadius = document.getElementById('border-r').value;
  const shadowColor = document.getElementById('shadow-color').value;
  const shadowInset = document.getElementById('inset-shadow').checked;

  const boxShadow = `${
    shadowInset ? 'inset' : ''
  } ${xShadow}px ${yShadow}px ${blurRadius}px ${spreadRadius}px ${hexToRgba(shadowColor, shadowOpacity)}`;

  preview.style.boxShadow = boxShadow;
  preview.style.borderRadius = `${borderRadius}px`;

  styles.textContent = `box-shadow:${boxShadow}; \nborder-radius: ${borderRadius}px;`;
}

function hexToRgba(shadowColor, shadowOpacity) {
  const r = parseInt(shadowColor.substr(1, 2), 16);
  const g = parseInt(shadowColor.substr(3, 2), 16);
  const b = parseInt(shadowColor.substr(5, 2), 16);
  return `rgba(${r},${g},${b},${shadowOpacity})`;
}

function copyStyles() {
  styles.select();
  document.execCommand('copy');
  copyButton.innerText = 'Copied!';
  copyButton.style.background = '#03c03c';

  setTimeout(() => {
    copyButton.innerText = 'Copied!';
    copyButton.style.background = '';
    copyButton.innerText = 'Copy';
  }, 1500);
}

generateStyles();

const title = document.querySelector('.title');

title.innerHTML = title.innerHTML
  .split('')
  .map(
    (letters, i) =>
      `<span style="transition-delay: ${i * 100}ms;
    filter:hue-rotate(${i * 30}deg);
    ">${letters}</span>`
  )
  .join('');

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

const year = document.getElementById('year');
const thisYear = new Date().getFullYear();

year.setAttribute('datetime', thisYear);
year.textContent = thisYear;
