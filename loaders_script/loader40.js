let container = document.querySelector('.container');

for (let i = 0; i <= 25; i++) {
	let div = document.createElement('div');
	div.classList.add('item');
	div.style.setProperty('--i', i);
	container.appendChild(div);
}