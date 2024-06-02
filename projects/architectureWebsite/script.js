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

const swiperHome = new Swiper('.home-swiper', {
    loop: true,
    speed: 800,
    parallax: true,
    effect: 'fade',

	pagination: {
        el: '.swiper-pagination',
        type: 'fraction',

        formatFractionCurrent: (number) => { return '0' + number },
        formatFractionTotal: (number) => {return '0' + number}
	},

	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});