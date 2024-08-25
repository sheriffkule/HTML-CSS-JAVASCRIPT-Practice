let boxes = document.querySelectorAll('.box');
let glow = document.querySelector('.glow');

boxes.forEach((box) => {
	box.addEventListener('dragover', (e) => {
		e.preventDefault();
	});
	box.addEventListener('drop', () => {
		box.appendChild(glow);
	});
});