const input = document.querySelectorAll('.input');

function focusFun() {
  let parent = this.parentNode;
  parent.classList.add('focus');
}

function blurFun() {
  let parent = this.parentNode;
  if (this.value === '') {
    parent.classList.remove('focus');
  }
}

input.forEach((inputs) => {
  inputs.addEventListener('focus', focusFun);
  inputs.addEventListener('blur', blurFun);
});

function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');
  yearElement.dateTime = currentYear;
  yearElement.textContent = currentYear;
}

updateYear();

const sr = ScrollReveal({
  origin: 'top',
  distance: '120px',
  duration: 2000,
  delay: 200,
  mobile: true,
  opacity: 0,
});

sr.reveal(`.form`);
sr.reveal(`.big-circle`, { origin: 'left', distance: '200px', delay: 500 });
sr.reveal(`.contact-info`, { origin: 'left', distance: '300px' });
sr.reveal(`.contact-form`, { origin: 'right', distance: '300px' });
sr.reveal(`.right-circle`, { origin: 'right', distance: '200px', delay: 800 });

const canvas = document.getElementById('effect');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];

function initStars() {
	for (let i = 0; i < 100; i++) {
		stars.push({
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height,
			radius: Math.random() * 5,
			speed: Math.random() * 0.6 + 0.1,
		});
	}
}

function drawStars() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (const star of stars) {
		ctx.beginPath();
		ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
		ctx.fillStyle = 'royalblue';
		ctx.fill();
		ctx.closePath();

		star.x += star.speed;

		if (star.x > canvas.width) {
			star.x = 0;
		}
	}

	requestAnimationFrame(drawStars);
}

initStars();
drawStars();

window.addEventListener('resize', () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	initStars();
});