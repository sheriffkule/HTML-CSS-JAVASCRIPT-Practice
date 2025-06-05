const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY >= 100) {
    nav.classList.add('fix_nav');
  } else {
    nav.classList.remove('fix_nav');
  }
});

const bars = document.querySelector('.bars');
const secNav = document.querySelector('.second_nav');
const closeMenu = document.querySelector('.close');
const nav_btn_show = document.querySelector('.nav_btn_show');
const nav_icon_menu = document.querySelector('.nav_icon_btn');

bars.addEventListener('click', () => {
  secNav.classList.toggle('show_sec_nav');
});

closeMenu.addEventListener('click', () => {
  secNav.classList.toggle('show_sec_nav');
});

nav_btn_show.addEventListener('click', () => {
  nav_icon_menu.classList.toggle('show_nav_icon_btn');
});

let swiper = new Swiper('.trustSwiper', {
  slidesPerView: 5,
  spaceBetween: 30,
  loop: true,
  autoplay: true,
  breakpoints: {
    1400: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    1000: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});
