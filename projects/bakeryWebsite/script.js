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

const blurHeader = () => {
	const header = document.getElementById('header');
	const offset = window.scrollY;
	if (offset > 100) {
		header.classList.add('blur-header');
	} else {
		header.classList.remove('blur-header');
	}
};

window.addEventListener('scroll', blurHeader);

const scrollUp = () => {
	const scrollUp = document.getElementById('scroll-up');
	if (window.scrollY > 500) {
		scrollUp.classList.add('show-scroll');
	} else {
		scrollUp.classList.remove('show-scroll');
	}
};

window.addEventListener('scroll', scrollUp);

const section = document.querySelectorAll('section[id]');

const scrollActive = () => {
	const scrollDown = window.scrollY;

	section.forEach((current) => {
		const sectionHeight = current.offsetHeight;
		const sectionTop = current.offsetTop - 50;
		const sectionId = current.getAttribute('id');
		const sectionLink = document.querySelector(
			'.nav-menu a[href*=' + sectionId + ']'
		);

		if (
			scrollDown >= sectionTop &&
			scrollDown <= sectionTop + sectionHeight
		) {
			sectionLink.classList.add('active-link');
		} else {
			sectionLink.classList.remove('active-link');
		}
	});
};

window.addEventListener('scroll', scrollActive);

const sr = ScrollReveal({
	origin: 'top',
	distance: '160px',
	duration: 2000,
	delay: 300,
	opacity: 1,
	scale: 1.1,
	reset: true,
	mobile: true,
});

sr.reveal('.home-data, .about-img, .about-data, .visit-data');
sr.reveal('.home-image, .footer-img-1, .footer-img-2', { rotate: { z: -15 } });
sr.reveal('.home-bread, about-bread', { rotate: { z: 15 } });
sr.reveal('.home-footer', { scale: 1, origin: 'bottom' });

sr.reveal('.new-card:nth-child(1) img', { rotate: { z: -30 }, distance: 0 });
sr.reveal('.new-card:nth-child(2) img', {rotate: { z: 15 },distance: 0,delay: 600,});
sr.reveal('.new-card:nth-child(3) img', {rotate: { z: -30 },distance: 0,delay: 900,});

sr.reveal('.favorite-card img', {interval: 200,rotate: { z: 15 },distance: 0,});

sr.reveal('.footer-container', { scale: 1, });

const year = document.getElementById('year');
const thisYear = new Date().getFullYear();

year.setAttribute('datetime', thisYear);
year.textContent = thisYear;