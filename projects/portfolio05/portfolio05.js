const header = document.querySelector('header');

window.addEventListener('scroll', function () {
	header.classList.toggle('sticky', window.scrollY > 130);
});

let menu = document.getElementById('menu-icon');
let menulist = document.querySelector('.menulist');

menu.addEventListener('click', function () {
	menu.classList.toggle('bx-x');
	menulist.classList.toggle('open');
});

const navLink = document.querySelectorAll('.nav-link');

const linkAction = () => {
	const menulist = document.querySelector('.menulist');
	menulist.classList.remove('open');
};

navLink.forEach((link) => {
	link.addEventListener('click', linkAction);
});

function shadowHeader() {
	const header = document.getElementById('header');
	if (this.scrollY >= 100) {
		header.classList.add('shadow-header');
	} else {
		header.classList.remove('shadow-header');
	}
}

window.addEventListener('scroll', shadowHeader);

const section = document.querySelectorAll('section[id]');

const scrollActive = () => {
	const scrollDown = window.scrollY;

	section.forEach((current) => {
		const sectionHeight = current.offsetHeight;
		const sectionTop = current.offsetTop - 50;
		const sectionId = current.getAttribute('id');
		const sectionLink = document.querySelector(
			'.menulist a[href*=' + sectionId + ']'
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

function scrollTop() {
	const scrollUp = document.querySelector('.scroll-top');

	if (this.scrollY >= 400) {
		scrollUp.classList.add('show-scroll');
	} else {
		scrollUp.classList.remove('show-scroll');
	}
}

window.addEventListener('scroll', scrollTop);

var typed = new Typed('.input', {
	strings: ['Frontend.', 'UI/UX Designer.', 'Web Developer.'],
	typeSpeed: 120,
	backSpeed: 70,
	loop: true,
	loopCount: Infinity,
	showCursor: true,
	cursorChar: '|',
	smartBackspace: true,
});

const sr = ScrollReveal({
	distance: '180px',
	duration: 2000,
	delay: 300,
	reset: true,
	mobile: true,
	opacity: 0.5,
});

sr.reveal('.home-text, .about-img, .services-left, .mid-text, .contact-main', {
	origin: 'left',
	rotate: {
		x: -20,
		z: -20,
	},
	scale: 0.5,
});
sr.reveal('.home-img, .about-text, .services-right, .contact-form', {
	origin: 'right',
	rotate: {
		x: 20,
		z: 20,
	},
	scale: 0.5,
});
sr.reveal('.row', { distance: '300px', origin: 'top', interval: 300 });