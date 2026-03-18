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

const scrollHeader = () => {
  const header = document.getElementById('header');
  this.scrollY >= 50 ? header.classList.add('scroll-header') : header.classList.remove('scroll-header');
};

window.addEventListener('scroll', scrollHeader);

const swiperWork = new Swiper('.work__swiper', {
  loop: true,
  slidesPerView: 'auto',
  spaceBetween: 24,
  grabCursor: true,

  pagination: {
    el: '.work__data .swiper-pagination',
    type: 'fraction',
  },

  navigation: {
    nextEl: '.work__data .swiper-button-next',
    prevEl: '.work__data .swiper-button-prev',
  },
});

const swiperTestimonial = new Swiper('.service__swiper', {
  loop: true,
  slidesPerView: 'auto',
  spaceBetween: 56,
  grabCursor: true,

  pagination: {
    el: '.service__swiper .swiper-pagination',
  },

  navigation: {
    nextEl: '.service__swiper .swiper-button-next',
    prevEl: '.service__swiper .swiper-button-prev',
  },
});