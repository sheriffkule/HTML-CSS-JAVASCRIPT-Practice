let prev = document.querySelector('.prev');
let next = document.querySelector('.next');

next.addEventListener('click', () => {
	let items = document.querySelectorAll(`.item`);
	let slider = document.querySelector('.slide');
	slider.appendChild(items[0]);
});

prev.addEventListener('click', () => {
	let items = document.querySelectorAll(`.item`);
	let slider = document.querySelector('.slide');
	slider.insertBefore(items[items.length - 1], items[0]);
});
