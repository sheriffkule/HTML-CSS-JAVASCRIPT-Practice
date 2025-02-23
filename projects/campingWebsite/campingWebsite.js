let menu = document.querySelector('.menu-icon');
let navbar = document.querySelector('.navbar');

menu.addEventListener('click', function () {
  menu.classList.toggle('move');
  navbar.classList.toggle('open-menu');
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

let swiper2 = new Swiper('.selling-slider', {
  loop: true,
  parallax: true,
  grabCursor: true,
  autoplay: {
    delay: 4500,
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
    920: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  },
});

const animate = ScrollReveal({
  origin: 'top',
  distance: '150px',
  duration: 2500,
  delay: 400,
});

animate.reveal('.nav, .heading, .hero-content h2', { distance: '60px' });
animate.reveal('.backpack-content', { origin: 'left' });
animate.reveal('.hero-img img, .btn, .btn img, .backpack img, .single-post', {
  origin: 'bottom',
});
animate.reveal(
  '.category-box, .product-box, .brand-box, .blog-box, .link-box, .footer-box h3, .footer-box a, .footer-box p',
  { interval: 200 }
);

function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');
  yearElement.dateTime = currentYear;
  yearElement.textContent = currentYear;
}

updateYear();