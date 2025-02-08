const smallCups = document.querySelectorAll('.cup-small');
const liters = document.getElementById('liters');
const percentage = document.getElementById('percentage');
const remained = document.getElementById('remained');
const goalText = document.getElementById('goal-text');

updateBigCup();

smallCups.forEach((cup, idx) => {
  cup.addEventListener('click', () => highlightCups(idx));
});

function highlightCups(idx) {
  if (idx === 7 && smallCups[idx].classList.contains('full')) idx--;
  else if (
    smallCups[idx].classList.contains('full') &&
    !smallCups[idx].nextElementSibling.classList.contains('full')
  ) {
    idx--;
  }

  smallCups.forEach((cup, idx2) => {
    if (idx2 <= idx) {
      cup.classList.add('full');
    } else {
      cup.classList.remove('full');
    }
  });

  updateBigCup();
}

function updateBigCup() {
  const fullCups = document.querySelectorAll('.cup-small.full').length;
  const totalCups = smallCups.length;

  if (fullCups === 0) {
    percentage.style.visibility = 'hidden';
    percentage.style.height = 0;
  } else {
    percentage.style.visibility = 'visible';
    percentage.style.height = `${fullCups / totalCups * 330}px`;
    percentage.innerText = `${(fullCups / totalCups) * 100}%`;
  }

  if (fullCups === totalCups) {
    remained.style.visibility = 'hidden';
    remained.style.height = 0;
    goalText.innerText = 'You have reached your goal!';
  } else {
    remained.style.visibility = 'visible';
    liters.innerText = `${2 - (250 * fullCups / 1000)}L`;
    goalText.innerText = 'Goal: 2 Liters';
  }
}

setInterval(() => {
    updateBigCup();
}, 500);

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