let section = document.querySelector('section');
let mode = document.querySelector('.site-mode');

mode.addEventListener('click', () => {
	section.style.transition = '.5s';
	if (mode.classList.contains('fa-sun')) {
		section.classList.add('white-mode');
		mode.classList.replace('fa-sun', 'fa-moon');
	} else {
		section.classList.remove('white-mode');
		mode.classList.replace('fa-moon', 'fa-sun');
	}
});

const sr = ScrollReveal({
	origin: 'top',
	distance: '200px',
	duration: 2500,
	delay: 500,
	opacity: 0,
});

sr.reveal('.text');
sr.reveal('.image', { delay: 0 });
sr.reveal('.social', {opacity: 0, delay: 0, origin: 'bottom'});