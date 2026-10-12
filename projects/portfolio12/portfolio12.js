// Show & close menu
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// Show menu
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
  });
}

// Close menu
if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
}

// Remove mobile menu
const navLing = document.querySelectorAll('.nav__link');

const linkAction = () => {
  const navMenu = document.getElementById('nav-menu');
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove('show-menu');
};
navLing.forEach((n) => n.addEventListener('click', linkAction));

// Change header styles
const scrollHeader = () => {
  const header = document.getElementById('header');
  // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
  this.scrollY >= 50 ? header.classList.add('scroll-header') : header.classList.remove('scroll-header');
};
window.addEventListener('scroll', scrollHeader);

// Swiper cases
const swiperCase = new Swiper('.case__swiper', {
  loop: true,
  grabCursor: true,
  slidesPerView: 'auto',
  centeredSlides: 'auto',
  spaceBetween: 16,
  speed: 600,
  effect: 'creative',
  creativeEffect: {
    limitProgress: 2,
    prev: {
      translate: ['-100%', 0, 0],
      scale: 0.85,
    },
    next: {
      translate: ['100%', 0, 0],
      scale: 0.85,
    },
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

// Questions FAQS
const questionsCards = document.querySelectorAll('.questions__card');
const questionsButton = document.querySelectorAll('.questions__button');

questionsButton.forEach((button) => {
  button.addEventListener('click', () => {
    const currentCard = button.closest('.questions__card');
    const isOpen = currentCard.classList.contains('questions-open');

    // Close all other services data
    questionsCards.forEach((card) => {
      card.classList.replace('questions-open', 'questions-close');
    });

    // If clicked card was closed, it opens it.
    if (!isOpen) currentCard.classList.replace('questions-close', 'questions-open');
  });
});

// Swiper clients
const swiperClients = new Swiper('.clients__swiper', {
  loop: true,
  grabCursor: true,
  slidesPerView: 'auto',
  centeredSlides: 'auto',
  spaceBetween: 16,
  speed: 600,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

// Contact email js
const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');

const sendEmail = async (e) => {
  e.preventDefault();

  try {
    await emailjs.sendForm('service_8ii265', 'template_85g6ftk', '#contact-form', 'VQaq6RG_bXgUd7BNm');

    contactMessage.textContent = 'Message sent successfully ✅';

    contactForm.reset();
  } catch (error) {
    contactMessage.textContent = 'Message not sent (service error) ❌';
    console.error(error);
  } finally {
    setTimeout(() => (contactMessage.textContent = ''), 5000);
  }
};
contactForm.addEventListener('submit', sendEmail);

// Current year of the footer
const textYear = document.getElementById('footer-date');
const currentYear = new Date().getFullYear();

// Each year it is updated to the current year
textYear.textContent = currentYear;

// Scroll up
const scrollUp = () => {
  const scrollUp = document.getElementById('scroll-up');
  // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scroll-up id
  this.scrollY >= 350 ? scrollUp.classList.add('show-scroll') : scrollUp.classList.remove('show-scroll');
};
window.addEventListener('scroll', scrollUp);

// Scroll sections active link
const sections = document.querySelectorAll('section[id]');

// Link the ID of each section (section id="home") to each link (a href="home")
// and activate the link with the class .active-link
const scrollActive = () => {
  const scrollY = window.scrollY;

  sections.forEach((section) => {
    const id = section.id;
    const top = section.offsetTop - 58;
    const height = section.offsetHeight;
    const link = document.querySelector('.nav__menu a[href*=' + id + ']');

    if (!link) return;

    link.classList.toggle('active-link', scrollY > top && scrollY <= top + height);
  });
};
window.addEventListener('scroll', scrollActive);
