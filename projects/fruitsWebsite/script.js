const navMenu = document.querySelector('.nav-menu');
const navToggle = document.querySelector('.nav-toggle');
const navClose = document.querySelector('.nav-close');

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
	const navMenu = document.querySelector('.nav-menu');
	navMenu.classList.remove('show-menu');
};

navLink.forEach((n) => n.addEventListener('click', linkAction));

const shadowHeader = () => {
	const header = document.getElementById('header');
	this.scrollY >= 200
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
};

window.addEventListener('scroll', scrollUp);



const section = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollDown = window.scrollY;

    section.forEach((current) => {
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

const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'ri-sun-line';

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line';

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark'? 'add' :'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'ri-moon-line'? 'add' :'remove'](iconTheme);
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);

    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});

const sr = ScrollReveal({
    origin: 'top',
    distance: '120px',
    duration: 2000,
    reset: true,
    mobile: true,
    viewFactor: 0.2,
    delay: 300,
});

sr.reveal('.home-data, .join-container');
sr.reveal('.home-img', { origin: 'bottom' });
sr.reveal('.enjoy-card, .popular-card, .footer-container', { interval: 200 });
sr.reveal('.about-data', { origin: 'right' });
sr.reveal('.about-img', { origin: 'left' });