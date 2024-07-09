let button = document.getElementById('button');
button.addEventListener('click', function () {
	for (let i = 0; i < 50; i++) {
		let spark = document.createElement('i');
		spark.classList.add('spark');

		const randomX = (Math.random() - 0.5) * window.innerWidth;
		const randomY = (Math.random() - 0.5) * window.innerHeight;
		spark.style.setProperty('--x', randomX + 'px');
		spark.style.setProperty('--y', randomY + 'px');

		const randomSize = Math.random() * 8 + 2;
		spark.style.width = randomSize + 'px';
		spark.style.height = randomSize + 'px';

		document.body.appendChild(spark);

		setTimeout(() => {
			spark.remove();
		}, 3000);
	}
});
