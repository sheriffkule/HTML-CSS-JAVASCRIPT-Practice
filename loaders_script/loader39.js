let div = document.querySelector('div');

for (let i = 1; i <= 35; i++) {
	let span = document.createElement('span');
	span.style.setProperty('--i', i);
	div.appendChild(span);
}