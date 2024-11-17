const navMenu = document.getElementById('nav__menu');
const navToggle = document.getElementById('nav__toggle');
const navClose = document.getElementById('nav__close');

if (navToggle) {
	navToggle.addEventListener('click', () => {
		navMenu.classList.add('show__menu');
	});
}

if (navClose) {
	navClose.addEventListener('click', () => {
		navMenu.classList.remove('show__menu');
	});
}

const navLink = document.querySelectorAll('.nav__link');

const linkAction = () => {
	const navMenu = document.getElementById('nav__menu');
	navMenu.classList.remove('show__menu');
};

navLink.forEach((n) => n.addEventListener('click', linkAction));

const shadowHeader = () => {
	const header = document.getElementById('header');

	this.scrollY >= 50
		? header.classList.add('shadow-header')
		: header.classList.remove('shadow-header');
};

window.addEventListener('scroll', shadowHeader);

const swiperPopular = new Swiper('.popular__swiper', {
	loop: true,
	grabCursor: true,
	slidesPerView: 'auto',
	centeredSlides: 'auto',
});

const scrollUp = () => {
	const scrollUp = document.getElementById('scroll-up');

	this.scrollY >= 350
		? scrollUp.classList.add('show-scroll')
		: scrollUp.classList.remove('show-scroll');
};

window.addEventListener('scroll', scrollUp);

const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
	const scrollDown = window.scrollY;

	sections.forEach((current) => {
		const sectionHeight = current.offsetHeight;
		const sectionTop = current.offsetTop - 58;
		const sectionId = current.getAttribute('id');
		const sectionClass = document.querySelector(
			'.nav__menu a[href*=' + sectionId + ']'
		);

		if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
			sectionClass.classList.add('active-link');
		} else {
			sectionClass.classList.remove('active-link');
		}
	});
};

window.addEventListener('scroll', scrollActive);

const sr = ScrollReveal({
	origin: 'top',
	distance: '150px',
	duration: 2500,
	delay: 300,
	mobile: true,
	opacity: 0,
});

sr.reveal('.home__data, .popular__container')
sr.reveal('.home__board', {delay: 700, distance: '200px', origin: 'right'})
sr.reveal('.home__pizza', {delay: 1400, distance: '200px', origin: 'bottom', rotate: {z: -90}})
sr.reveal('.home__ingredient', { delay: 2000, interval: 250})
sr.reveal('.about__data, .recipe__list, .contact__data', {origin: 'right'})
sr.reveal('.about__img, .recipe__img, .contact__image', {origin: 'left'})
sr.reveal('.products__card', { interval: 300, distance: '300px' });
sr.reveal('.footer__container', {distance: '300px', origin: 'bottom' });

const year = document.getElementById('year');
const thisYear = new Date().getFullYear();

year.setAttribute('datetime', thisYear);
year.textContent = thisYear;