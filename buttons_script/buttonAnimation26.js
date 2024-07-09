VanillaTilt.init(document.querySelectorAll('.sci li a'), {
	max: 50,
	speed: 400,
	glare: true,
	'max-glare': 1,
});

let list = document.querySelectorAll('.sci li');
let bg = document.querySelector('.social');

list.forEach((elements) => {
	elements.addEventListener('mouseenter', function (event) {
		let color = event.target.getAttribute('data-color');
		bg.style.backgroundColor = color;
	});
	elements.addEventListener('mouseleave', function (event) {
		bg.style.backgroundColor = '#ccc';
	});
});
