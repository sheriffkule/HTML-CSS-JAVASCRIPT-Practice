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
  navMenu.classList.remove('show-menu');
};

navLink.forEach((n) => n.addEventListener('click', linkAction));

const scrollHeader = () => {
  const header = document.getElementById('header');

  this.scrollY >= 50
    ? header.classList.add('scroll-header')
    : header.classList.remove('scroll-header');
};

window.addEventListener('scroll', scrollHeader);

const swiperPopular = new Swiper('.popular__swiper', {
  loop: true,
  grabCursor: true,
  spaceBetween: 32,
  slidesPerView: 'auto',
  centeredSlides: 'auto',

  breakpoints: {
    1150: {
      spaceBetween: 80,
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
    const sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

    if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
      sectionsClass.classList.add('active-link');
    } else {
      sectionsClass.classList.remove('active-link');
    }
  });
};

window.addEventListener('scroll', scrollActive);

const sr = ScrollReveal({
  origin: 'top',
  distance: '120px',
  duration: 2000,
  delay: 300,
  reset: true,
});

sr.reveal(`.popular__swiper, .footer__container, .footer__copy`, { interval: 250 });
sr.reveal(`.home__shape`, { origin: 'bottom' });
sr.reveal(`.home__coffee`, { delay: 1000, distance: '200px', duration: 1500 });
sr.reveal(`.home__splash`, { delay: 1600, scale: 0, duration: 1500 });
sr.reveal(`.home__bean-1, .home__bean-2`, {
  delay: 2200,
  scale: 0,
  duration: 1500,
  rotate: { z: 180 },
});
sr.reveal(`.home__ice-1, .home__ice-2`, {
  delay: 2600,
  scale: 0,
  duration: 1500,
  rotate: { z: 180 },
});
sr.reveal(`.home__leaf`, { delay: 2800, scale: 0, duration: 1500, rotate: { z: 90 } });
sr.reveal(`.home__title`, { delay: 3500 });
sr.reveal(`.about__data`, { origin: 'left' });
sr.reveal(`.about__images`, { origin: 'right' });
sr.reveal(`.about__coffee`, { delay: 1000 });
sr.reveal(`.about__leaf-1, .about__leaf-2`, { delay: 1400, rotate: { z: 90 } });
sr.reveal(`.products__card, .contact__info`, { interval: 300 });
sr.reveal(`.contact__shape`, { delay: 600, scale: 0 });
sr.reveal(`.contact__delivery`, { delay: 1200, scale: 0 });

function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');
  yearElement.dateTime = currentYear;
  yearElement.textContent = currentYear;
}

updateYear();