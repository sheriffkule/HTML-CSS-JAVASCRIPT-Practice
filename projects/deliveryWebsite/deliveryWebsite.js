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
//   autoplay: {
//     delay: 3000,
//     disableOnInteraction: false,
//   },
});
