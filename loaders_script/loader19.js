let box = document.querySelector('.box');

for (let i = 0; i < 16; i++) {
	let span = document.createElement('span');
	span.style.setProperty('--i', i);
	box.appendChild(span);

	let item = document.createElement('i');
	span.appendChild(item);
}