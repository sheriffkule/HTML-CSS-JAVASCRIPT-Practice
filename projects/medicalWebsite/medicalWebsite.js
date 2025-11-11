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

const swiperPrices = new Swiper('.prices__swiper', {
  loop: true,
  grabCursor: true,
  spaceBetween: 24,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
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
    const sectionClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

    if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
      sectionClass.classList.add('active-link');
    } else {
      sectionClass.classList.remove('active-link');
    }
  });
};

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

window.addEventListener('scroll', scrollActive);

const sr = ScrollReveal({
  origin: 'top',
  distance: '150px',
  duration: 2000,
  reset: true,
});
console.log(sr);

sr.reveal(`.home__content`, { origin: 'bottom' });
sr.reveal(`.home__info`, { origin: 'bottom', delay: 800 });
sr.reveal(`.home__data`, { delay: 1400 });
sr.reveal(`.home__button`, { origin: 'left', delay: 1800 });

sr.reveal(`.delivery__data`, { origin: 'right' });
sr.reveal(`.delivery__content`, { origin: 'left', delay: 600 });
sr.reveal(`.delivery__img`, { delay: 1200 });

sr.reveal(`.about__data, .contact__map`, { origin: 'left' });
sr.reveal(`.about__img, .contact__data`, { origin: 'right' });

sr.reveal(`.prices__box`);
sr.reveal(`.prices__swiper`, { origin: 'bottom', delay: 600 });

sr.reveal(`.gallery__image`, { interval: 200 });

sr.reveal(`.footer__container`);

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
