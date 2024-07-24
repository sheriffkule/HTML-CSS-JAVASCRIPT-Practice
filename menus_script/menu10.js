let list = document.querySelectorAll('.list');
function activeLink() {
	list.forEach((item) => item.classList.remove('active'));
	this.classList.add('active');
}
list.forEach((item) => item.addEventListener('click', activeLink));

document.body.addEventListener('click', (event) => {
	if (event.target !== event.currentTarget) return;
	list.forEach((li) => li.classList.remove('active'));
});