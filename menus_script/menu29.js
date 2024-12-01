let navLink = document.querySelector('.navigation-square');
let toggle = document.querySelector('.toggle');
const links = navLink.querySelectorAll('a');

toggle.addEventListener('click', () => {
	toggle.classList.toggle('active');
	navLink.classList.toggle('active');
});

document.addEventListener('click', (event) => {
	if (!toggle.contains(event.target) && !navLink.contains(event.target)) {
		toggle.classList.remove('active');
		navLink.classList.remove('active');
	}
});

links.forEach((link) => {
    link.addEventListener('click', () => {
        toggle.classList.remove('active');
        navLink.classList.remove('active');
    });
});