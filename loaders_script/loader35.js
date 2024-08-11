let list = document.querySelector('.list');

for (let i = 0; i <= 53; i++) {
	let item = document.createElement('li');
	item.style.setProperty('--i', i);
	list.appendChild(item);
}