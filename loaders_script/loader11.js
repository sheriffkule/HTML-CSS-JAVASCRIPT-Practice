let load = document.querySelector('.load');

for (let i = 1; i <= 20; i++) {
	let span = document.createElement('span');
	span.style.setProperty('--i', i);
	load.appendChild(span);
}