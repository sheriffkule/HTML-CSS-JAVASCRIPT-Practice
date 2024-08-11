let navLinks = document.getElementById('nav_links');
let menuBtn = document.getElementById('menu_btn');
let closeBtn = document.getElementById('close_btn');

menuBtn.addEventListener('click', () => {
	navLinks.classList.add('show');
});

closeBtn.addEventListener('click', () => {
	navLinks.classList.remove('show');
});

document.addEventListener('click', (event) => {
	if (
		event.target === document.body &&
		event.target !== menuBtn &&
		event.target !== closeBtn &&
		navLinks.classList.contains('show')
	) {
		navLinks.classList.remove('show');
	}
});

const year = document.getElementById('year');
const thisYear = new Date().getFullYear();

year.setAttribute('datetime', thisYear);
year.textContent = thisYear;