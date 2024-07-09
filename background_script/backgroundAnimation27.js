let container = document.querySelector('.container');
let count = 600;
for (let i = 0; i < count; i++) {
	let box = document.createElement('div');
	box.className = 'box';
	container.appendChild(box);
}

let box = document.querySelectorAll('.box');
for (let i = 0; i < box.length; i++) {
	let duration = Math.random() * 6;
	let changeColor = Math.random() * 360;
	box[i].addEventListener('mouseover', (e) => {
		box[i].classList.add('active');
		box[i].style.animationDuration = 1 + duration + 's';
		box[i].style.filter = 'hue-rotate(' + changeColor + 'deg)';
	});
}