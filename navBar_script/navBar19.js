const sidebarToggle = document.querySelector('.sidebar .toggle');
const sidebar = document.querySelector('.sidebar');

sidebarToggle.addEventListener('click', () => {
	sidebar.classList.toggle('open');
});

const links = document.querySelectorAll('.item');

links.forEach((link) => {
	link.addEventListener('click', () => {
		links.forEach((link) => link.classList.remove('active'));
		link.classList.add('active');
	});
});
