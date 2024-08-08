document.addEventListener('DOMContentLoaded', () => {
	let container = document.querySelector('.container');
	for (let j = 0; j < 4; j++) {
		let loader = document.createElement('div');
		loader.classList.add('loader');
		loader.style.setProperty('--j', j);
		for (let i = 1; i <= 20; i++) {
			let span = document.createElement('span');
			span.style.setProperty('--i', i);
			loader.appendChild(span);
		}
		container.appendChild(loader);
	}
});
