// Open / close menu
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// Open menu
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
const navLink = document.querySelectorAll('.nav_link');

const linkAction = () => {
  const navMenu = document.getElementById('nav-menu');
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove('show-menu');
};

navLink.forEach((n) => n.addEventListener('click', linkAction));

// Change header styles
const scrollHeader = () => {
  const header = document.getElementById('header');
  this.scrollY >= 50 ? header.classList.add('scroll-header') : header.classList.remove('scroll-header');
};

window.addEventListener('scroll', scrollHeader);
