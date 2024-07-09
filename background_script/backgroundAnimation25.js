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
			radius: Math.random() * 2,
			speed: Math.random() * 0.6 + 0.1,
		});
	}
}

function drawStars() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (const star of stars) {
		ctx.beginPath();
		ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
		ctx.fillStyle = 'white';
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