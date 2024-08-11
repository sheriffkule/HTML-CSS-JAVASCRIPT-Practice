let container = document.querySelector('.container');

for (let i = 0; i <= 12; i++) {
	let div = document.createElement('div');
	div.style.setProperty('--i', i);
	container.appendChild(div);
}