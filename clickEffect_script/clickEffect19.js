let boxes = document.querySelectorAll('.box');
let button = document.querySelector('button');

button.addEventListener('click', function () {
	setTimeout(() => {
		load_bars();
	}, 500);
});

function load_bars() {
	boxes.forEach((box) => {
		let line = box.querySelector('.line');
		let increasing_percentage = box.querySelector('.increasing_percentage');
		let total_percentage = box.querySelector('.total_percentage');

		let p = 0;
		let my_interval = setInterval(() => {
			p++;
			line.style.width = p + '%';
			increasing_percentage.innerHTML = p + '%';
			if (increasing_percentage.innerHTML === total_percentage.innerHTML) {
				clearInterval(my_interval);
			}
		}, 50);
	});
}
