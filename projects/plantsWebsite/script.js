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

function shadowHeader() {
	const header = document.getElementById('header');
	if (this.scrollY >= 100) {
		header.classList.add('shadow-header');
	} else {
		header.classList.remove('shadow-header');
	}
}

window.addEventListener('scroll', shadowHeader);

const accordionItems = document.querySelectorAll('.questions-item');

accordionItems.forEach((item) => {
	const accordionHeader = item.querySelector('.questions-header');

	accordionHeader.addEventListener('click', () => {
		const openItem = document.querySelector('.accordion-open');
		toggleItem(item);

		if (openItem && openItem !== item) {
			toggleItem(openItem);
		}
	});
});

const toggleItem = (item) => {
	const accordionContent = item.querySelector('.questions-content');

	if (item.classList.contains('accordion-open')) {
		accordionContent.removeAttribute('style');
		item.classList.remove('accordion-open');
	} else {
		accordionContent.style.height = accordionContent.scrollHeight + 'px';
		item.classList.add('accordion-open');
	}
};

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

function scrollUp() {
	const scrollUp = document.getElementById('scroll-up');

	if (this.scrollY >= 400) {
		scrollUp.classList.add('show-scroll');
	} else {
		scrollUp.classList.remove('show-scroll');
	}
}

window.addEventListener('scroll', scrollUp);

const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'ri-sun-line';

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () =>
	document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () =>
	themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line';

if (selectedTheme) {
	document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](
		darkTheme
	);
	themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](
		iconTheme
	);
} else {
	document.body.classList.add(darkTheme);
	themeButton.classList.add(iconTheme);
}
themeButton.addEventListener('click', () => {
	document.body.classList.toggle(darkTheme);
	themeButton.classList.toggle(iconTheme);

	localStorage.setItem('selected-theme', getCurrentTheme());
	localStorage.setItem('selected-icon', getCurrentIcon());
});

const sr = ScrollReveal({
	origin: 'top',
	distance: '220px',
	duration: 2000,
	delay: 300,
	opacity: 0,
	reset: true,
	mobile: true,
});

sr.reveal('.home-data');
sr.reveal('.home-img', { delay: 500 });
sr.reveal('.home-social', { delay: 700 });
sr.reveal('.about-img, .contact-box', {
	origin: 'left',
	rotate: {
		y: -60,
		z: -60,
	},
});
sr.reveal('.about-data, .contact-form', {
	origin: 'right',
	rotate: {
		y: 60,
		z: 60,
	},
});
sr.reveal('.steps-card, .product-card, .questions-group, .footer-content', {
	interval: 200,
});

const year = document.getElementById('year');
const thisYear = new Date().getFullYear();

year.setAttribute('datetime', thisYear);
year.textContent = thisYear;