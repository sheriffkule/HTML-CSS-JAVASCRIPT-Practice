'use strict';

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

const loadingElement = document.querySelector('[data-loading]');

window.addEventListener('load', function () {
  loadingElement.classList.add('loaded');
  document.body.classList.remove('active');
});

const [navTogglers, navLinks, navbar, overlay] = [
  document.querySelectorAll('[data-nav-toggler]'),
  document.querySelectorAll('[data-nav-link]'),
  document.querySelector('[data-navbar]'),
  document.querySelector('[data-overlay]'),
];

const toggleNav = function () {
  navbar.classList.toggle('active');
  overlay.classList.toggle('active');
  document.body.classList.toggle('active');
};

addEventOnElements(navTogglers, 'click', toggleNav);

const closeNav = function () {
  navbar.classList.remove('active');
  overlay.classList.remove('active');
  document.body.classList.remove('active');
};

addEventOnElements(navLinks, 'click', closeNav);

const header = document.querySelector('[data-header]');

const activeElementOnScroll = function () {
  if (window.scrollY > 50) {
    header.classList.add('active');
  } else {
    header.classList.remove('active');
  }
};

window.addEventListener('scroll', activeElementOnScroll);

const letterBoxes = document.querySelectorAll('[data-letter-effect]');

let activeLetterBoxIndex = 0;
let lastActiveLetterBoxIndex = 0;
let totalLetterBoxDelay = 0;

const setLetterEffect = function () {
  for (let i = 0; i < letterBoxes.length; i++) {
    let letterAnimationDelay = 0;
    const letters = letterBoxes[i].textContent.trim();

    letterBoxes[i].textContent = '';

    for (let j = 0; j < letters.length; j++) {
      const span = document.createElement('span');
      span.style.animationDelay = `${letterAnimationDelay}s`;
      span.classList.add(i === activeLetterBoxIndex ? 'in' : 'out');

      span.textContent = letters[j];
      if (letters[j] === ' ') span.classList.add('space');
      letterBoxes[i].appendChild(span);

      if (j >= letters.length - 1) break;

      letterAnimationDelay += 0.1;
    }

    if (i === activeLetterBoxIndex) totalLetterBoxDelay = Number(letterAnimationDelay.toFixed(2));
    letterBoxes[i].classList.toggle('active', i === lastActiveLetterBoxIndex);
  }

  setTimeout(function () {
    lastActiveLetterBoxIndex = activeLetterBoxIndex;
    activeLetterBoxIndex >= letterBoxes.length - 1 ? (activeLetterBoxIndex = 0) : activeLetterBoxIndex++;

    setLetterEffect();
  }, totalLetterBoxDelay * 1000 + 3000);
};
window.addEventListener('load', setLetterEffect);

const backTopBtn = document.querySelector('[data-back-top-btn]');

window.addEventListener('scroll', function () {
  const bodyHeight = document.body.scrollHeight;
  const windowHeight = window.innerHeight;
  const scrollEnd = bodyHeight - windowHeight;
  const percentage = (window.scrollY / scrollEnd) * 100;

  backTopBtn.textContent = `${percentage.toFixed(1)}%`;

  if (percentage > 5) {
    backTopBtn.classList.add('show');
  } else {
    backTopBtn.classList.remove('show');
  }
});

const revealElements = document.querySelectorAll('[data-reveal]');

const scrollReveal = function () {
  for (let i = 0; i < revealElements.length; i++) {
    const elementIsInScreen = revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.15;

    if (elementIsInScreen) {
      revealElements[i].classList.add('revealed');
    } else {
      revealElements[i].classList.remove('revealed');
    }
  }
};

window.addEventListener('scroll', scrollReveal);

scrollReveal();

const cursor = document.querySelector('[data-cursor]');
const anchorElements = document.querySelectorAll('a');
const buttons = document.querySelectorAll('button');

document.body.addEventListener('mousemove', function (event) {
  setTimeout(function () {
    cursor.style.top = `${event.clientY}px`;
    cursor.style.left = `${event.clientX}px`;
  }, 100);
});

addEventOnElements(anchorElements, 'mouseover', function () {
  cursor.classList.add('hovered');
});

addEventOnElements(anchorElements, 'mouseout', function () {
  cursor.classList.remove('hovered');
});

addEventOnElements(buttons, 'mouseover', function () {
  cursor.classList.add('hovered');
});

addEventOnElements(buttons, 'mouseout', function () {
  cursor.classList.remove('hovered');
});

document.body.addEventListener('mouseout', function () {
  cursor.classList.add('disabled');
});

document.body.addEventListener('mouseover', function () {
  cursor.classList.remove('disabled');
});
