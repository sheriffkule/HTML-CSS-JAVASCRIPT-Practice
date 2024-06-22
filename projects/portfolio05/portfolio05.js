const header = document.querySelector('header');

window.addEventListener('scroll', function() {
    header.classList.toggle('sticky', window.scrollY > 130);
});

let menu = document.getElementById('menu-icon');
let menulist = document.querySelector('.menulist');

menu.addEventListener('click', function () {
    menu.classList.toggle('bx-x');
    menulist.classList.toggle('open');
});

window.onscroll = () => {
    menu.classList.remove('bx-x');
    menulist.classList.remove('open')
};

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
sr.reveal('.row', {distance: '300px', origin: 'top', interval: 300});