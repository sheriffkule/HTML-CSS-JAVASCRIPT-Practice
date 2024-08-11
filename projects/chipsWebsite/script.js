const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

if (navToggle) {
	navToggle.addEventListener('click', () => {
		navMenu.classList.add('show-menu');
	});
}

if (navClose) {
	navClose.addEventListener('click', () => {
		navMenu.classList.remove('show-menu');
	});
}

const navLink = document.querySelectorAll('.nav-link');

const linkAction = () => {
	const navMenu = document.getElementById('nav-menu');
	navMenu.classList.remove('show-menu');
};

navLink.forEach((n) => n.addEventListener('click', linkAction));

const shadowHeader = () => {
	const header = document.getElementById('header');
	this.scrollY >= 50
		? header.classList.add('shadow-header')
		: header.classList.remove('shadow-header');
};

window.addEventListener('scroll', shadowHeader);

const swiperFavorites = new Swiper('.favorites-swiper', {
	loop: true,
	grabCursor: true,
	slidesPerView: 'auto',
	centeredSlides: true,
	mousewheel: {
		sensitivity: 1,
	},
});

const scrollUp = () => {
	const scrollUp = document.getElementById('scroll-up');
	this.scrollY >= 350
		? scrollUp.classList.add('show-scroll')
		: scrollUp.classList.remove('show-scroll');
};

window.addEventListener('scroll', scrollUp);

const section = document.querySelectorAll('section[id]');

const scrollActive = () => {
	const scrollDown = window.scrollY;

	section.forEach((current) => {
		const sectionHeight = current.offsetHeight;
		const sectionTop = current.offsetTop - 58;
		const sectionId = current.getAttribute('id');
		const sectionClass = document.querySelector(
			'.nav-menu a[href*=' + sectionId + ']'
		);

		if (
			scrollDown >= sectionTop &&
			scrollDown <= sectionTop + sectionHeight
		) {
			sectionClass.classList.add('active-link');
		} else {
			sectionClass.classList.remove('active-link');
		}
	});
};

window.addEventListener('scroll', scrollActive);

const sr = ScrollReveal({
	origin: 'top',
	distance: '80px',
	duration: 2500,
	delay: 300,
	reset: true,
});

sr.reveal('.home-data, .favorites-container, .footer-container');
sr.reveal('.home-circle, .home-img', { delay: 600, scale: 0.5 });
sr.reveal('.home-chips-1, .home-chips-2, .home-chips-3', {
	delay: 1000,
	interval: 100,
});
sr.reveal('.home-leaf', { delay: 1200 });
sr.reveal('.home-tomato-1, .home-tomateo-2', { delay: 1400, interval: 100 });
sr.reveal('.care-img, .contact-img', { origin: 'left' });
sr.reveal('.care-list, .contact-data', { origin: 'right' });
sr.reveal('.banner-item, .products-card', { interval: 100 });
