let menuBox = document.getElementById('menuBox');
let menuIcon = document.getElementById('menuIcon');

menuIcon.addEventListener('click', () => {
	menuBox.classList.toggle('open-menu');

	if (menuBox.classList.contains('open-menu')) {
		menuIcon.src = '/icons/close.png';
	} else {
		menuIcon.src = '/icons/menu.png';
	}
});