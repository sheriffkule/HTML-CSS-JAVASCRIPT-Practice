const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const login = document.getElementById('login');

registerBtn.addEventListener('click', () => {
  container.classList.add('active');
});

login.addEventListener('click', () => {
  container.classList.remove('active');
});

function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');
  yearElement.dateTime = currentYear;
  yearElement.textContent = currentYear;
}

updateYear();

const canvas = document.getElementById('snowfall');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let numOfflakes = 50;
const snowFlakes = [];

function createSnowFlake() {
  const snowFlake = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 5,
    speedX: Math.random() * 1.1,
    speedY: Math.random() * 1.7,
  };
  snowFlakes.push(snowFlake);
}

for (let i = 0; i < numOfflakes; i++) {
  createSnowFlake();
}

function drawSnowFlake(snowFlake) {
  ctx.beginPath();
  ctx.arc(snowFlake.x, snowFlake.y, snowFlake.size, 0, Math.PI * 2);
  ctx.fillStyle = '#fffafa';
  ctx.fill();
}

function updateSnowFlakes(snowFlake) {
  snowFlake.x += snowFlake.speedX;
  snowFlake.y += snowFlake.speedY;

  if (snowFlake.y > canvas.height) {
    snowFlake.x = Math.random() * canvas.width - 200;
    snowFlake.y = -50;
  }
}

function snowFall() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snowFlakes.length; i++) {
    drawSnowFlake(snowFlakes[i]);
    updateSnowFlakes(snowFlakes[i]);
  }

  requestAnimationFrame(snowFall);
}

snowFall();