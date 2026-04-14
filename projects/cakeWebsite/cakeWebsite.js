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
