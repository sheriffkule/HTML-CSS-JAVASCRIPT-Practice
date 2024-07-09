let circle = document.querySelector('.circle');
circle.addEventListener('click', function () {
	for (let i = 0; i < 50; i++) {
		let particles = document.createElement('i');
		particles.classList.add('particles');
		let randomX = (Math.random() - 0.5) * window.innerWidth;
		let randomY = (Math.random() - 0.5) * window.innerHeight;

		particles.style.setProperty('--x', randomX + 'px');
		particles.style.setProperty('--y', randomY + 'px');

		let randomSize = Math.random() * 60 + 10;
		particles.style.width = randomSize + 'px';
		particles.style.height = randomSize + 'px';

		let duration = Math.random() * 3 + 2;
		particles.style.animation = `animate ${duration}s ease forwards`;

		document.body.appendChild(particles);

		setTimeout(() => {
			particles.remove();
		}, 5000);
	}
});