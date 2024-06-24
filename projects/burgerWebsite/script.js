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

const scrollUp = () => {
	const scrollUp = document.getElementById('scroll-up');
    if (this.scrollY >= 400) {
        scrollUp.classList.add('show-scroll');
    } else {
        scrollUp.classList.remove('show-scroll');
    }
}

window.addEventListener("scroll", scrollUp);

const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
	const scrollDown = window.scrollY;

    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58;
        const sectionId = current.getAttribute('id');
        const sectionClass = document.querySelector('.nav-menu a[href*=' + sectionId + ']');

        if (scrollDown >= sectionTop && scrollDown <= sectionTop + sectionHeight) {
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
    mobile: true,
});

sr.reveal('.home-data, .footer');
sr.reveal('.home-dish', {delay: 500, distance: '100px', origin: 'bottom'});
sr.reveal('.home-burger', { delay: 1000, distance: '100px', duration: 1500 });
sr.reveal('.home-ingredient', { delay: 1400, interval: 200 });
sr.reveal('.recipe-img, .delivery-img, .contact-image', { origin: 'left' });
sr.reveal('.recipe-data, .delivery-data, .contact-data', { origin: 'right' });
sr.reveal('.popular-card, .recipe-card', {
	interval: 300,
	delay: 100,
});