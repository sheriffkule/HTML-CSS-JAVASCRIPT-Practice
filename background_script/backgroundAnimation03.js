const canvas = document.getElementById('snowfall');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let numOfflakes = 120;
const snowFlakes = [];

function createSnowFlake() {
	const snowFlake = {
		x: Math.random() * canvas.width,
		y: Math.random() * canvas.height,
		size: Math.random() * 5,
		speedX: Math.random() * 1.5,
		speedY: Math.random() * 4,
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
		snowFlake.x = Math.random() * canvas.width;
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