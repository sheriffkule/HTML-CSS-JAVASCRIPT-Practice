const showSidebar = (toggleId, sidebarId, headerId, mainId) => {
	const toggle = document.getElementById(toggleId);
    const sidebar = document.getElementById(sidebarId);
    const header = document.getElementById(headerId);
    const main = document.getElementById(mainId);

	if (toggle && sidebar && header && main) {
		toggle.addEventListener('click', () => {
            sidebar.classList.toggle('show-sidebar');
            
            header.classList.toggle('left-pd');

            main.classList.toggle('left-pd')
		});
	}
};

showSidebar('header-toggle', 'sidebar', 'header', 'main');

const activeLink = document.querySelectorAll('.sidebar__list a');

function linkColor() {
	activeLink.forEach((l) => l.classList.remove('active__link'));
	this.classList.add('active__link');
}

activeLink.forEach((l) => l.addEventListener('click', linkColor));

const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'ri-sun-fill';

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () =>
	document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () =>
	themeButton.classList.contains(iconTheme)
		? 'ri-moon-clear-fill'
		: 'ri-sun-line';

if (selectedTheme) {
	document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](
		darkTheme
	);
	themeButton.classList[
		selectedIcon === 'ri-moon-clear-fill' ? 'add' : 'remove'
	](iconTheme);
}

themeButton.addEventListener('click', () => {
	document.body.classList.toggle(darkTheme);
	themeButton.classList.toggle(iconTheme);

	localStorage.setItem('selected-theme', getCurrentTheme());
	localStorage.setItem('selected-icon', getCurrentIcon());
});