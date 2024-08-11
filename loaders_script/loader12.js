let loaders = document.querySelectorAll('.loader');

for (let i = 0; i <= 9; i++) {
	for (let loader of loaders) {
		let dot = document.createElement('div');
		dot.classList.add('dot');
		dot.style.setProperty('--i', i);
		loader.appendChild(dot);
	}
}