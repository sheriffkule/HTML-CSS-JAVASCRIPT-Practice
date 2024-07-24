const list = document.querySelectorAll('li');
list.forEach((li) => {
	li.addEventListener('click', () => {
		list.forEach((li) => {
			li.classList.remove('active');
		});
        li.classList.toggle('active');
	});
});

document.body.addEventListener('click', (event) => {
	if (event.target !== event.currentTarget) return;
	list.forEach((li) => li.classList.remove('active'));
});