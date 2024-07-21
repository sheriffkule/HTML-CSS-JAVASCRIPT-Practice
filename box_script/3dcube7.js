document.addEventListener('DOMContentLoaded', function () {
	let cube = document.querySelector('.cube');
	let grids = document.querySelectorAll('.grid');

	grids.forEach((grid) => {
		for (let i = 0; i < 100; i++) {
			let span = document.createElement('span');
			grid.appendChild(span);
		}
	});

	function addRandomActiveClass() {
		grids.forEach((grid) => {
			let spans = grid.querySelectorAll('span');
			let randomIndex = Math.floor(Math.random() * spans.length);
			spans[randomIndex].classList.add('active');
            
            const RemoveTime = Math.floor(Math.random() * 1000) + 500;
			function randomActiveColor() {
				let colors = [
					'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown', 'cyan', 'magenta', 'lightblue', 'darkblue', 'darkgreen', 'darkorange', 'darkred', 'darkviolet', 'lightgreen', 'lightpink', 'lightyellow', 'lightgray', 'darkgray', 'royalblue'

				];
				let randomColor =
					colors[Math.floor(Math.random() * colors.length)];
				let aciveSpan = spans[randomIndex];
                aciveSpan.style.background = randomColor;
                setTimeout(() => {
					aciveSpan.style.background = '';
				}, RemoveTime);
			}
            
            randomActiveColor();
            
            setTimeout(() => {
                spans[randomIndex].classList.remove('active');
            }, RemoveTime);
            
		});
	}

	function randomInterval() {
		let interval = Math.floor(Math.random() * 200) + 100;
		addRandomActiveClass();
		setTimeout(randomInterval, interval);
	}
	randomInterval();

	document.addEventListener('mousemove', (e) => {
		let x = e.clientX / window.innerWidth - 0.5;
		let y = e.clientY / window.innerHeight - 0.5;
		cube.style.transform = `rotateX(${y * 360}deg) rotateY(${x * 360}deg)`;
	});
});
