const showMenu = (navId, toggleId, toggleIcon) => {
  const nav = document.getElementById(navId);
  const toggle = document.getElementById(toggleId);

  toggle.addEventListener('click', () => {
    nav.classList.toggle('show-menu');
  });
};

showMenu('nav-menu', 'nav-toggle');

const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
  const navMenu = document.getElementById('nav-menu');
  navMenu.classList.remove('show-menu');
}

navLink.forEach((n) => n.addEventListener('click', linkAction));

const shadowHeader = () => {
  const header = document.getElementById('header');
  this.scrollY >= 50 ? header.classList.add('shadow-header') : header.classList.remove('shadow-header');
};

window.addEventListener('scroll', shadowHeader);

const swiperReviews = new Swiper('.reviews__swiper', {
  loop: true,
  spaceBetween: 16,
  grabCursor: true,
  speed: 600,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

const scrollUp = () => {
  const scrollUp = document.getElementById('scroll-up');
  this.scrollY >= 350 ? scrollUp.classList.add('show-scroll') : scrollUp.classList.remove('show-scroll');
};

window.addEventListener('scroll', scrollUp);

const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
  const scrollDown = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 58;
    const sectionId = current.getAttribute('id');
    const sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

    if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
      sectionsClass.classList.add('active-link');
    } else {
      sectionsClass.classList.remove('active-link');
    }
  });
};

window.addEventListener('scroll', scrollActive);

const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'ri-sun-fill';

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () => (document.body.classList.contains(darkTheme) ? 'dark' : 'light');
const getCurrentIcon = () => (themeButton.classList.contains(iconTheme) ? 'ri-moon-fill' : 'ri-sun-fill');

if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
  themeButton.classList[selectedIcon === 'ri-moon-fill' ? 'add' : 'remove'](iconTheme);
}

themeButton.addEventListener('click', () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);

  localStorage.setItem('selected-theme', getCurrentTheme());
  localStorage.setItem('selected-icon', getCurrentIcon());
});

const sr = ScrollReveal({
  origin: 'top',
  distance: '150px',
  duration: 2000,
  // reset: true,
});

sr.reveal(`.home__title, .home__description, .home__data .button`, { interval: 100 });
sr.reveal(`.home__image`, { delay: 900 });
sr.reveal(`.home__phone`, { origin: 'left', delay: 1500 });
sr.reveal(`.home__comment`, { origin: 'right', delay: 1800 });
sr.reveal(`.home__social`, { origin: 'bottom', delay: 2100 });
sr.reveal(`.service__card, .service__title, .service__description`, { interval: 100 });
sr.reveal(`.menu__card`, { interval: 100 });
sr.reveal(`.reviews__content`, { origin: 'right' });
sr.reveal(`.reviews__image`, { origin: 'left', delay: 600 });
sr.reveal(`.app .section__subtitle, .app .section__title, .app__description, .app .button`, {
  interval: 100,
});
sr.reveal(`.app__image`, { origin: 'bottom', delay: 900 });
sr.reveal(`.map__area`, { origin: 'right' });
sr.reveal(`.map__card`, { origin: 'left', delay: 600 });
sr.reveal(`.footer__data, .footer__content div`, { interval: 100 });

function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');

  if (!yearElement) {
    console.error('Year element not found');
    return;
  }

  if (yearElement) {
    yearElement.setAttribute('datetime', currentYear.toString());
    yearElement.dateTime = currentYear;
    yearElement.textContent = currentYear.toString();
  }
}

window.addEventListener('load', updateYear);
