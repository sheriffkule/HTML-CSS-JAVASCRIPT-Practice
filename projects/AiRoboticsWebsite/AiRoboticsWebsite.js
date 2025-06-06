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

const menuBar = document.querySelector('.menu_bars');
const menu = document.querySelector('nav ul');

menuBar.addEventListener('click', () => {
  menu.classList.toggle('active_menu');
});

const bgNav = () => {
  const nav = document.querySelector('nav');

  this.scrollY >= 100 ? nav.classList.add('bg-nav') : nav.classList.remove('bg-nav');
};

window.addEventListener('scroll', bgNav);

const navLink = document.querySelectorAll('.nav_link');

const linkAction = () => {
  menu.classList.remove('active_menu');
};

navLink.forEach((n) => n.addEventListener('click', linkAction));

const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
  const scrollDown = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute('id');
    const sectionClass = document.querySelector('.menu a[href*=' + sectionId + ']');

    if (sectionClass) {
      if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
        sectionClass.classList.add('active-link');
      } else {
        sectionClass.classList.remove('active-link');
      }
    }
  });
};

window.addEventListener('scroll', scrollActive);

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
    800: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    0: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
  },
});

let serviceSwiper = new Swiper('.serviceSwiper', {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  autoplay: true,
  breakpoints: {
    1400: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1000: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    0: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
  },
});

let testimonialSwiper = new Swiper('.testimonialSwiper', {
  slidesPerView: 2,
  spaceBetween: 30,
  loop: true,
  autoplay: true,
  breakpoints: {
    1400: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1000: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    0: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
  },
});

const sr = ScrollReveal({
  origin: 'top',
  distance: '150px',
  duration: 2000,
  delay: 300,
  opacity: 0,
  scale: 0.2,
});

sr.reveal('.service_head, .serviceSwiper, .testimonial_head h1, .testimonialSwiper, .blog_head');
sr.reveal('.blog_card, .about_content', { interval: 300 });
sr.reveal('.hero_content, .page_content, .footer_head h1', { origin: 'left' });
sr.reveal('.hero_image, .page_image, .inputs', { origin: 'right' });
sr.reveal('.footer_link, .trusted', { origin: 'bottom', interval: 200 });
sr.reveal('.hero_content h1', { origin: 'left', interval: 300, delay: 1000, distance: '500px' });

VanillaTilt.init(document.querySelectorAll('.blog_card'), {
  max: 12,
  speed: 400,
  glare: true,
  'max-glare': 0.5,
  scale: 1.1,
  perspective: 1000,
});

const buttons = document.querySelectorAll('button');
let interval;
let spawnDistance = 50;

function createParticles(button) {
  const particles = document.createElement('div');
  particles.classList.add('particles');
  let btnWidth = button.offsetWidth;
  let btnHeight = button.offsetHeight;

  let angle = Math.random() * 2 * Math.PI;
  let x = btnWidth / 2 + Math.cos(angle) * spawnDistance;
  let y = btnHeight / 2 + Math.sin(angle) * spawnDistance;

  let dx = Math.cos(angle) * 150;
  let dy = Math.sin(angle) * 150;

  particles.style.left = `${x}px`;
  particles.style.top = `${y}px`;
  particles.style.setProperty('--dx', `${dx}px`);
  particles.style.setProperty('--dy', `${dy}px`);

  button.appendChild(particles);
  setTimeout(() => {
    particles.remove();
  }, 2000);
}

buttons.forEach((button) => {
  button.addEventListener('mouseenter', () => {
    interval = setInterval(() => createParticles(button), 50);
  });
});

buttons.forEach((button) => {
  button.addEventListener('mouseleave', () => {
    clearInterval(interval);
  });
});

function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');
  yearElement.dateTime = currentYear;
  yearElement.textContent = currentYear;
}

updateYear();
