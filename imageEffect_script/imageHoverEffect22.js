document.addEventListener('DOMContentLoaded', function () {
	let boxes = document.querySelectorAll('.box');
	boxes.forEach(function (box) {
		let spans = [];
		for (let i = 0; i < 200; i++) {
			let span = document.createElement('span');
			spans.push(span);
			box.appendChild(span);
			span.style.top = `${i * 1.5}px`;
			span.style.backgroundPositionY = `${i * -1}px`;
			span.style.transitionDelay = Math.random() * 1.5 + 0 + 's';
		}
		box.addEventListener('click', function () {
			box.classList.toggle('active');
			spans.forEach(function (span) {
				span.style.setProperty(
					'--x',
					Math.floor(Math.random() * 400 - 200) + 'px'
				);
				span.style.setProperty(
					'--r',
					Math.floor(Math.random() * 360 - 0) + 'deg'
				);
			});
		});
	});
});
