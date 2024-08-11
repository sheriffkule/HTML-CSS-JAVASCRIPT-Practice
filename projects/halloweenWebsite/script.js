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
	this.scrollY >= 100
		? header.classList.add('shadow-header')
		: header.classList.remove('shadow-header');
};

window.addEventListener('scroll', shadowHeader);

let homeSwiper = new Swiper('.home-swiper', {
	slidesPerView: 1,
	spaceBetween: 30,
	loop: true,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	mousewheel: {
		sensitivity: 1,
	},
});

const scrollUp = () => {
	const scrollUp = document.getElementById('scroll-up');
	if (this.scrollY >= 400) {
		scrollUp.classList.add('show-scroll');
	} else {
		scrollUp.classList.remove('show-scroll');
	}
};

window.addEventListener('scroll', scrollUp);

let newSwiper = new Swiper('.new-swiper', {
	centeredSlides: true,
	slidesPerView: 'auto',
	spaceBetween: 20,
	loop: true,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	mousewheel: {
		sensitivity: 1,
	},
});

const section = document.querySelectorAll('section[id]');

function scrollActive() {
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
}

window.addEventListener('scroll', scrollActive);

const sr = ScrollReveal({
	origin: 'top',
	distance: '120px',
	duration: 2000,
	delay: 300,
	reset: true,
});

sr.reveal('.home-swiper, .new-swiper, .newsletter-container');
sr.reveal('.category-data, .trick-content, .footer-content', { interval: 300 });
sr.reveal('.about-data, .discount-img', { origin: 'left' });
sr.reveal('.about-img, .discount-data', { origin: 'right' });

VanillaTilt.init(document.querySelectorAll('.trick-content'), {
	max: 12,
	speed: 400,
	glare: true,
	'max-glare': 0.1,
	scale: 1.1,
	perspective: 1000,
	transition: true,
});

VanillaTilt.init(
	document.querySelectorAll('.category-img, .footer-img-one, .footer-img-two'), {
		max: 35,
		speed: 400,
		glare: true,
		'max-glare': 0.8,
		scale: 1.1,
		perspective: 500,
		transition: true,
	}
);

const year = document.getElementById('year');
const thisYear = new Date().getFullYear();

year.setAttribute('datetime', thisYear);
year.textContent = thisYear;