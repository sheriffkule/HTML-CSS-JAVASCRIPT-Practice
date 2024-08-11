let container = document.querySelector('.container');

for (let i = 0; i < 20; i++) {
	let span = document.createElement('span');
	span.style.setProperty('--i', i);
	container.appendChild(span);
}