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

// Services accordion
const servicesCards = document.querySelectorAll('.services__card');
const servicesButtons = document.querySelectorAll('.services__button');

servicesButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const currentCard = button.closest('.services__card');
    const isOpen = currentCard.classList.contains('services-open');

    servicesCards.forEach((card) => {
      card.classList.replace('services-open', 'services-close');
    });

    if (!isOpen) {
      currentCard.classList.replace('services-close', 'services-open');
    }
  });
});

// Testimonials of duplicated cards
const tracks = document.querySelectorAll('.testimonials__content');

tracks.forEach((track) => {
  const cards = [...track.children];

  for (const card of cards) {
    track.appendChild(card.cloneNode(true));
  }
});

// Contact email js
// const contactForm = document.getElementById('contact-form');
// const contactMessage = document.getElementById('contact-message');

// const sendEmail = async (e) => {
//   e.preventDefault();

//   try {
//     // serviceID - templateID - #form - publicKey
//     await emailjs.sendForm('', '', '', '');

//     contactMessage.textContent = 'Message sent successfully!';
//     contactForm.reset()
//   } catch (e) {
//     contactMessage.textContent = 'Message not sent (service error)';
//   } finally {
//     setTimeout(() => contactMessage.textContent = '', 5000)
//   }
// };
// contactForm.addEventListener('submit', contactMessage);

// Show scroll up
const scrollUp = () => {
  const scrollUp = document.getElementById('scroll-up');
  this.scrollY >= 350 ? scrollUp.classList.add('show-scroll') : scrollUp.classList.remove('show-scroll');
};
window.addEventListener('scroll', scrollUp);

// Scroll section active link
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
  const scrollY = window.scrollY;

  sections.forEach((section) => {
    const id = section.id;
    const top = section.offsetTop - 50;
    const height = section.offsetHeight;
    const link = document.querySelector('.nav__menu a[href*=' + id + ']');

    if (!link) return;

    link.classList.toggle('active-link', scrollY > top && scrollY <= top + height);
  });
};

window.addEventListener('scroll', scrollActive);

// Custom cursor
const cursor = document.querySelector('.cursor');
let mouseX = 0;
let mouseY = 0;

const cursorMove = () => {
  cursor.style.left = `${mouseX}px`;
  cursor.style.top = `${mouseY}px`;
  cursor.style.transform = 'translate(-50%, -50%)';

  requestAnimationFrame(cursorMove);
};

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

cursorMove();

const a = document.querySelectorAll('a');

a.forEach((item) => {
  item.addEventListener('mouseover', () => {
    cursor.classList.add('hide-cursor');
  });

  item.addEventListener('mouseleave', () => {
    cursor.classList.remove('hide-cursor');
  });
});

// ScrollReveal animation
const sr = new ScrollReveal({
  origin: 'bottom',
  distance: '120px',
  duration: 1200,
  delay: 300,
  easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
});

sr.reveal(`.home__subtitle`);
sr.reveal(`.home__title`, { delay: 600 });
sr.reveal(`.home__description`, { delay: 900 });
sr.reveal(`.home__box-1`, { delay: 1200, rotate: { z: -20 } });
sr.reveal(`.home__box-2`, { delay: 1300, rotate: { z: -30 } });
sr.reveal(`.home__box-3`, { delay: 1400, rotate: { z: -40 } });
sr.reveal(`.home__img`, { delay: 1700, distance: '-120px' });
sr.reveal(`.home__circle`, { delay: 2000, distance: '-180px' });

sr.reveal(`.about__title`);
sr.reveal(`.about__description`, { delay: 600 });
sr.reveal(`.about__button`, { delay: 900 });

sr.reveal(`.work__swiper`);

sr.reveal(`.services__card:nth-child(odd)`, { interval: 200, origin: 'left', distance: '150px' });
sr.reveal(`.services__card:nth-child(even)`, { interval: 200, origin: 'right', distance: '150px' });

sr.reveal(`.skills__description`);
sr.reveal(`.skills__card`, { delay: 600, interval: 200 });
sr.reveal(`.skills__profession`, { delay: 900 });
sr.reveal(`.skills__list`, { delay: 1200, interval: 200 });

sr.reveal(`.testimonials__container`);

sr.reveal(`.contact__form`);
sr.reveal(`.contact__link`, { delay: 600, interval: 200 });

sr.reveal(`.footer__container`);
