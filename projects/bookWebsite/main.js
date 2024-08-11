const searchButton = document.getElementById('search-button');
const searchClose = document.getElementById('search-close');
const searchContent = document.getElementById('search-content');

if (searchButton) {
	searchButton.addEventListener('click', () => {
		searchContent.classList.add('show-search');
	});
}

if (searchClose) {
	searchClose.addEventListener('click', () => {
		searchContent.classList.remove('show-search');
	});
}

const loginButton = document.getElementById('login-button');
const loginClose = document.getElementById('login-close');
const loginContent = document.getElementById('login-content');

if (loginButton) {
	loginButton.addEventListener('click', () => {
		loginContent.classList.add('show-login');
	});
}

if (loginClose) {
	loginClose.addEventListener('click', () => {
		loginContent.classList.remove('show-login');
	});
}

const shadowHeader = () => {
	const header = document.getElementById('header');
	this.scrollY >= 50
		? header.classList.add('shadow-header')
		: header.classList.remove('shadow-header');
};

window.addEventListener('scroll', shadowHeader);

const swiperHome = new Swiper('.home-swiper', {
	loop: true,
	spaceBetween: -24,
	grabCursor: true,
	slidesPerView: 'auto',
	centeredSlides: 'auto',

	autoplay: {
		delay: 3000,
		disableOnInteraction: true,
	},

	breakpoints: {
		1220: {
			spaceBetween: -32,
		},
	},
});

const swiperFeatured = new Swiper('.featured-swiper', {
	loop: true,
	spaceBetween: 16,
	grabCursor: true,
	slidesPerView: 'auto',
	centeredSlides: 'auto',

	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},

	breakpoints: {
		1100: {
			slidesPerView: 4,
			centeredSlides: false,
		},
	},
});

const swiperNew = new Swiper('.new-swiper', {
	loop: true,
	spaceBetween: 16,
	slidesPerView: 'auto',

	breakpoints: {
		1100: {
			slidesPerView: 3,
		},
	},
});

const swiperTestimonial = new Swiper('.testimonial-swiper', {
	loop: true,
	spaceBetween: 16,
	grabCursor: true,
	slidesPerView: 'auto',
	centeredSlides: 'auto',

	breakpoints: {
		1100: {
			slidesPerView: 3,
			centeredSlides: false,
		},
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
		const sectionTop = current.offsetTop - 50;
		const sectionId = current.getAttribute('id');
		const sectionClass = document.querySelector(
			'.nav-menu a[href*=' + sectionId + ']'
		);

		if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
			sectionClass.classList.add('active-link');
		} else {
			sectionClass.classList.remove('active-link');
		}
	});
};

window.addEventListener('scroll', scrollActive);

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
    delay: 400,
    reset: true,
    mobile: true,
})

sr.reveal(`.home-data, .featured-container, .new-container, .join-data, .testimonial-container, .footer`)
sr.reveal(`.home-images`, {delay: 600})
sr.reveal(`.services-card`, {interval: 200})
sr.reveal(`.discount-data`, {origin: 'left'})
sr.reveal(`.discount-images`, {origin: 'right'})

const year = document.getElementById('year');
const thisYear = new Date().getFullYear();

year.setAttribute('datetime', thisYear);
year.textContent = thisYear;