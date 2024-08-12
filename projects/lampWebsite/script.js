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

const scrollHeader = () => {
	const header = document.getElementById('header');
	this.scrollY >= 100
		? header.classList.add('scroll-header')
		: header.classList.remove('scroll-header');
};

window.addEventListener('scroll', scrollHeader);

const popularSwiper = new Swiper('.popular-content', {
	loop: true,
	slidesPerView: 'auto',
	centeredSlides: true,

	pagination: {
		el: '.swiper-pagination',
		clickable: true,
		bulletActiveClass: 'swiper-pagination-bullet-active',
	},

	effect: 'coverflow',

	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},

	breakpoints: {
		768: {
			centeredSlides: true,
		},
	},
});

const faqItems = document.querySelectorAll('.choose-faq-item');

//Select each item
faqItems.forEach((item) => {
	const faqHeader = item.querySelector('.choose-faq-header');

	// select each button click
	faqHeader.addEventListener('click', () => {
		const openItem = document.querySelector('.faq-open');

		// Call the toggleItem function
		toggleItem(item);

		// If an open item exists and it's not the clicked one
		if (openItem && openItem !== item) {
			toggleItem(openItem);
		}
	});
});

// Function to toggle open and close classes
const toggleItem = (item) => {
	const faqContent = item.querySelector('.choose-faq-content');

	// If the same item contains the faq-open classs, remove
	if (item.classList.contains('faq-open')) {
		faqContent.removeAttribute('style');
		item.classList.remove('faq-open');
	} else {
		// If not, add the style property with the height of the content and add the faq-open class
		faqContent.style.height = faqContent.scrollHeight + 'px';
		item.classList.add('faq-open');
	}
};

const scrollUp = () => {
	const scrollUp = document.getElementById('scroll-up');

    this.scrollY >= 350
        ? scrollUp.classList.add('show-scroll')
		: scrollUp.classList.remove('show-scroll');
};

window.addEventListener('scroll', scrollUp);

const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollDown = window.scrollY;

    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        if (scrollDown >= sectionTop && scrollDown < sectionTop + sectionHeight) {
            document.querySelector('.nav-menu a[href*="#' + sectionId + '"]').classList.add('active-link');
        } else {
            document.querySelector('.nav-menu a[href*="#' + sectionId + '"]').classList.remove('active-link');
        }
    });
};

window.addEventListener('scroll', scrollActive);

const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'ri-sun-line';

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');


const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line';

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme);
} else {
    document.body.classList.add(darkTheme);
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
    // reset: true,
    mobile: true,
}); 

sr.reveal(`.home-content, .popular-container, .products-container, .join-bg, .footer-container`)
sr.reveal(`.home-image`, {origin: 'bottom'})
sr.reveal(`.choose-image, .features-image`, {origin: 'left'})
sr.reveal(`.choose-content, .features-content`, {origin: 'right'})

const year = document.getElementById('year');
const thisYear = new Date().getFullYear();

year.setAttribute('datetime', thisYear);
year.textContent = thisYear;