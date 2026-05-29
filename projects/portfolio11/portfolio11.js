// Show & hide menu
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

// Remove mobile menu
const navLink = document.querySelectorAll('.nav__link, .nav__contact');

const linkAction = () => {
  const NavMenu = document.getElementById('nav-menu');
  navMenu.classList.remove('show-menu');
};
navLink.forEach((n) => n.addEventListener('click', linkAction));

// Home text circular
const homeText = document.getElementById('home-text');
const letters = homeText.textContent.trim().split('');
const angleStep = 360 / letters.length;

homeText.textContent = '';

// Iterates through each letter
letters.forEach((char, i) => {
  const span = document.createElement('span');
  span.textContent = char;
  span.style.transform = `rotate(${i * angleStep}deg)`;
  homeText.appendChild(span);
});

// Home typed JS
const typedHome = new Typed('#home-typed', {
  strings: ['Web Developer', 'Freelancer', 'Frontend Master'],
  typeSpeed: 100,
  backSpeed: 60,
  backDelay: 2000,
  loop: true,
});

// Change header styles
const scrollHeader = () => {
  const header = document.getElementById('header');
  this.scrollY >= 50 ? header.classList.add('scroll-header') : header.classList.remove('scroll-header');
};
window.addEventListener('scroll', scrollHeader);

// Swiper for work cards
const swiperWork = new Swiper('.work__swiper', {
  loop: true,
  spaceBetween: 24,
  slidesPerView: 'auto',
  grabCursor: true,
  speed: 600,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});
