const generateBtn = document.getElementById('generatorBtn');
const colorPalette = document.getElementById('colorPallete');

generateBtn.addEventListener('click', generatePallete);

function generatePallete() {
	colorPalette.innerHTML = '';

	for (let i = 0; i < 5; i++) {
		const color = generateRandomColor();
		const colorBox = createColorBox(color);
		colorPalette.appendChild(colorBox);
	}
}

function generateRandomColor() {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

function createColorBox(color) {
	const colorBox = document.createElement('div');
	colorBox.classList.add('color-box');
	colorBox.style.backgroundColor = color;
	colorBox.textContent = color;
	return colorBox;
}