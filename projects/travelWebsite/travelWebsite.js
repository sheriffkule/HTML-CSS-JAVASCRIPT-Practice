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

const linkAction = () => {
  const navMenu = document.getElementById('nav-menu');
  navMenu.classList.remove('show-menu');
};

navLink.forEach((n) => n.addEventListener('click', linkAction));

const swiperHome = new Swiper('.home__swiper', {
  loop: true,
  slidesPerView: 'auto',
  grabCursor: true,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

const bgHeader = () => {
  const header = document.getElementById('header');

  this.scrollY >= 100 ? header.classList.add('bg-header') : header.classList.remove('bg-header');
};

window.addEventListener('scroll', bgHeader);

const swiperTestimonial = new Swiper('.testimonial__swiper', {
  loop: true,
  slidesPerView: 'auto',
  spaceBetween: 48,
  grabCursor: true,

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
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute('id');
    const sectionClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

    if (sectionClass) {
      if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
        sectionClass.classList.add('active-link');
      } else {
        sectionClass.classList.remove('active-link');
      }
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
  themeButton.classList[selectedIcon === 'ri-sun-fill' ? 'add' : 'remove'](iconTheme);
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
  delay: 300,
});

sr.reveal('.home__container, .testimonial__container, .footer__container');
sr.reveal('.home__title, .section__title', { delay: 600 });
sr.reveal('.home__description', { delay: 900 });
sr.reveal('.home__data .button', { delay: 1200 });
sr.reveal('.destination__card, .gallery__card', { interval: 150 });
sr.reveal('.join__data', { origin: 'left' });
sr.reveal('.join__img', { origin: 'right' });
sr.reveal('.footer__content div', { interval: 200 });

function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');
  yearElement.dateTime = currentYear;
  yearElement.textContent = currentYear;
}

updateYear();
