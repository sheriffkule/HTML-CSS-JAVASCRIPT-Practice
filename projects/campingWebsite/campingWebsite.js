let menu = document.querySelector('.menu-icon');

menu.addEventListener('click', function () {
  menu.classList.toggle('move');
});

let swiper = new Swiper('.categorySwiper', {
  loop: true,
  parallax: true,
  grabCursor: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    280: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    510: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    750: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    900: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  },
});
