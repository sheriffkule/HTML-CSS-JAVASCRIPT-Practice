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
  this.scrollY >= 350 ? scrollUp.classList.add('show-scroll') : scrollUp.classList.add('show-scroll');
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
