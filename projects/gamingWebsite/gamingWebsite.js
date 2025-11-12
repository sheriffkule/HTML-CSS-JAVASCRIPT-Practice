'use strict';

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

const navbar = document.querySelector('[data-navbar]');
const navToggler = document.querySelector('[data-nav-toggler]');
const navLinks = document.querySelectorAll('[data-nav-link]');

const toggleNav = function () {
  navbar.classList.toggle('active');
  this.classList.toggle('active');
};

navToggler.addEventListener('click', toggleNav);

const navClose = () => {
  navbar.classList.remove('active');
  navToggler.classList.remove('active');
};

addEventOnElements(navLinks, 'click', navClose);

const header = document.querySelector('[data-header]');
const backTopBtn = document.querySelector('[data-back-top-btn]');

const activeEl = function () {
  if (window.scrollY > 100) {
    header.classList.add('active');
    backTopBtn.classList.add('active');
  } else {
    header.classList.remove('active');
    backTopBtn.classList.remove('active');
  }
};

window.addEventListener('scroll', activeEl);

const buttons = document.querySelectorAll('[data-btn]');

const buttonHoverRipple = function (event) {
  this.style.setProperty('--top', `${event.offsetY}px`);
  this.style.setProperty('--left', `${event.offsetX}px`);
};

addEventOnElements(buttons, 'mousemove', buttonHoverRipple);

const revealElements = document.querySelectorAll('[data-reveal]');

const revealElementOnScroll = function () {
  for (let i = 0, len = revealElements.length; i < len; i++) {
    const isElementInsideWindow = revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.1;

    if (isElementInsideWindow) {
      revealElements[i].classList.add('revealed');
    } else {
      revealElements[i].classList.remove('revealed');
    }
  }
};

window.addEventListener('scroll', revealElementOnScroll);

window.addEventListener('load', revealElementOnScroll);

const cursor = document.querySelector('[data-cursor]');
const hoverElements = [...document.querySelectorAll('a'), ...document.querySelectorAll('button')];

const cursorMove = function (event) {
  cursor.style.top = `${event.clientY}px`;
  cursor.style.left = `${event.clientX}px`;
};

window.addEventListener('mousemove', cursorMove);

addEventOnElements(hoverElements, 'mouseover', function () {
  cursor.classList.add('hovered');
});

addEventOnElements(hoverElements, 'mouseout', function () {
  cursor.classList.remove('hovered');
});

function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');

  if (!yearElement) {
    console.error('Year element not found');
    return;
  }

  if (yearElement) {
    yearElement.setAttribute('datetime', currentYear.toString());
    yearElement.dateTime = currentYear;
    yearElement.textContent = currentYear.toString();
  }
}

window.addEventListener('load', updateYear);
