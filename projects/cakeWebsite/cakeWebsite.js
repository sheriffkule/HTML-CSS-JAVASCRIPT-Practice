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
//   autoplay: {
//     delay: 3000,
//     disableOnInteraction: false,
//   },
});
