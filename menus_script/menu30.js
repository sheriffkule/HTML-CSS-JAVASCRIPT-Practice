let menuToggle = document.querySelector('.toggle');
let menu = document.querySelector('.menu');

menu.onclick = function () {
    menuToggle.classList.toggle('active');
    menu.classList.toggle('active');
}

document.addEventListener('click', (event) => {
	if (!menuToggle.contains(event.target) && !menu.contains(event.target)) {
		menuToggle.classList.remove('active');
		menu.classList.remove('active');
	}
});

links.forEach((link) => {
	link.addEventListener('click', () => {
		menuToggle.classList.remove('active');
		menu.classList.remove('active');
	});
});