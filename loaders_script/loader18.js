let loader = document.querySelector('.loader');

for (let i = 0; i < 21; i++) {
	let span = document.createElement('span');

	span.style.setProperty('--i', i);
	loader.appendChild(span);
}