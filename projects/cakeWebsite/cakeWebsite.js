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
  grabCursor: true,
  speed: 800,
  effect: 'creative',
  creativeEffect: {
    prev: {
      translate: ['-120%', 0, -500],
      rotate: [0, 0, -45],
      opacity: 0,
    },
    next: {
      translate: ['120%', 0, -500],
      rotate: [0, 0, 45],
      opacity: 0,
    },
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

const scrollHeader = () => {
  const header = document.getElementById('header');

  this.scrollY >= 50 ? header.classList.add('scroll-header') : header.classList.remove('scroll-header');
};

window.addEventListener('scroll', scrollHeader);

const swiperTabs = new Swiper('.product__tabs', {
  slidesPerView: 'auto',
});

const swiperProducts = new Swiper('.product__content', {
  loop: true,
  spaceBetween: 32,
  thumbs: {
    swiper: swiperTabs,
  },
});

const swiperNew = new Swiper('.new__swiper', {
  loop: true,
  grabCursor: true,
  centeredSlides: 'auto',
  slidesPerView: 'auto',
  speed: 600,
  effect: 'creative',
  creativeEffect: {
    limitProgress: 2,
    prev: {
      translate: ['-32%', 0, 0],
      scale: 0.58,
    },
    next: {
      translate: ['32%', 0, 0],
      scale: 0.58,
    },
  },

  navigation: {
    nextEl: '.new .swiper-button-next',
    prevEl: '.new .swiper-button-prev',
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
  const scrollY = window.scrollY;

  sections.forEach((section) => {
    const id = section.id;
    const top = section.offsetTop - 50;
    const height = section.offsetHeight;
    const link = document.querySelector('.nav__menu a[href*=' + id + ']');

    if (!link) return;

    link.classList.toggle('active-link', scrollY > top && scrollY <= top + height);
  });
};

window.addEventListener('scroll', scrollActive);

const sr = ScrollReveal({
  origin: 'bottom',
  distance: '120px',
  duration: '1500',
  delay: 300,
  easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
});

sr.reveal(`.home__title`, { origin: 'top' });
sr.reveal(`.home__description`, { delay: 600, origin: 'top' });
sr.reveal(`.home__data .button`, { delay: 900, distance: 0, scale: 0, origin: 'top' });
sr.reveal(`.home__base`, { delay: 900 });
sr.reveal(`.home__swiper`, { delay: 1200, origin: 'top' });
sr.reveal(`.home__data img`, { delay: 2100, distance: 0, interval: 200, scale: 0 });
sr.reveal(`.home__leaf-1, .home__leaf-2, .home__sticker-3, .home__sticker-4`, {
  delay: 2100,
  distance: 0,
  interval: 200,
  scale: 0,
});

sr.reveal(`.about__cupcake-1, .about__cupcake-2`, { rotate: { x: 0, y: 0, z: 120 } });
sr.reveal(`.about__data .section__title`, { delay: 900 });
sr.reveal(`.about__description`, { delay: 1200 });
sr.reveal(`.about__data .button`, { delay: 1500, distance: 0, scale: 0 });
sr.reveal(`.about__blob`, { delay: 1800, origin: 'right' });
sr.reveal(`.about__img`, { delay: 2100, origin: 'left' });
sr.reveal(`.about__leaf, .about__cupcake-3`, { delay: 2700, distance: 0, interval: 200, scale: 0 });
sr.reveal(`.about__data img`, { delay: 3000, distance: 0, interval: 200, scale: 0 });

sr.reveal(`.product .section__title`, {});
sr.reveal(`.product__button`, { delay: 600, interval: 150 });
sr.reveal(`.product__content`, { delay: 900 });

sr.reveal(`.new__data .section__title`, {});
sr.reveal(`.new__description`, { delay: 600 });
sr.reveal(`.new__data .button`, { delay: 900 });
sr.reveal(`.new__swiper`, { delay: 1200 });
sr.reveal(`.new__leaf-1, .new__leaf-2, .new__leaf-3`, { delay: 1500, distance: 0, interval: 200, scale: 0 });
sr.reveal(`.new__titles`, { delay: 1800, scale: 0 });

sr.reveal(`.contact__content .section__title`, {});
sr.reveal(`.contact__info`, { delay: 600, interval: 150 });
sr.reveal(`.contact__map`, { delay: 900, origin: 'top' });
sr.reveal(`.contact__data img`, { delay: 1500, distance: 0, interval: 200, scale: 0 });

sr.reveal(`.footer__container`, {});
sr.reveal(`.footer__leaf-1, .footer__leaf-2`, { delay: 600, interval: 200 });
sr.reveal(`.footer__blob`, { delay: 600 });
