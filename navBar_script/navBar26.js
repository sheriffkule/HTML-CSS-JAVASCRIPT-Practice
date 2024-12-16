const menu_toggle = document.querySelector('.menu_toggle');
const navigation = document.querySelector('.navigation');
let links = document.querySelectorAll('.menu');

menu_toggle.addEventListener('click', () => {
	navigation.classList.toggle('active');
	menu_toggle.classList.toggle('active');
});

document.addEventListener('click', (event) => {
	if (
		!menu_toggle.contains(event.target) &&
		!navigation.contains(event.target)
	) {
		navigation.classList.remove('active');
		menu_toggle.classList.remove('active');
	}
});

links.forEach((link) => {
	link.addEventListener('click', () => {
		menu_toggle.classList.remove('active');
		navigation.classList.remove('active');
	});
});

const theme = document.querySelector('.theme');
const icon = document.querySelector('.themeIcon');

theme.addEventListener('click', () => {
	document.body.classList.toggle('dark');

	if (localStorage.getItem('icon') === 'moon-outline') {
		icon.setAttribute('name', 'sunny-outline');
	} else {
		icon.setAttribute('name', 'moon-outline');
	}

	localStorage.setItem('icon', icon.getAttribute('name'));
	localStorage.setItem('iconName', icon.getAttribute('name'));
});

window.onload = () => {
	const iconName = localStorage.getItem('icon');
	if (iconName === 'moon-outline') {
		document.body.classList.add('dark');
		icon.setAttribute('name', 'moon-outline');
	} else {
		icon.setAttribute('name', 'sunny-outline');
	}
};