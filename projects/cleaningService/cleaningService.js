const toggle = document.getElementById('toggle');
const menu = document.querySelector('.menu');

toggle.addEventListener('click', function () {
  menu.classList.toggle('active');
});

let swiper = new Swiper('.testimonials_swiper', {
  loop: false,
  grabCursor: true,
  slidesPerView: 2,
  spaceBetween: 30,
  breakpoints: {
    1000: {
      slidesPerView: 2  
    },
    0: {
        slidesPerView: 1
    }
  }
});
