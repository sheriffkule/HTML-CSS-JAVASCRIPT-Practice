const toggleBtn = document.querySelector('.toggle-btn');
const menu = document.querySelector('.menu');
const links = document.querySelectorAll('.links a');

toggleBtn.addEventListener('click', () => {
	toggleBtn.classList.toggle('open');
	menu.classList.toggle('open');

	const isOpen = toggleBtn.classList.contains('open');
	toggleBtn.innerHTML = isOpen
		? '<i class="ri-close-line"></i>'
		: '<i class="ri-menu-line"></i>';
});

links.forEach((link) => {
	link.addEventListener('click', () => {
		links.forEach((link) => link.classList.remove('active'));
		link.classList.add('active');
		menuClose();
	});
});

function menuClose() {
	menu.classList.remove('open');
	toggleBtn.classList.remove('open');
}
