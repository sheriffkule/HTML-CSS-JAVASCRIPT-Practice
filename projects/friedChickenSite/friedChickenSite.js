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

const navLink = document.querySelectorAll('.nav__link');

const linkAction = () => {
  const navMenu = document.getElementById('nav-menu');
  navMenu.classList.remove('show-menu');
};

navLink.forEach((link) => link.addEventListener('click', linkAction));

const scrollHeader = () => {
  const header = document.getElementById('header');
  if (this.scrollY >= 80) {
    header.classList.add('scroll-header');
  } else {
    header.classList.remove('scroll-header');
  }
};

window.addEventListener('scroll', scrollHeader);

const scrollUp = () => {
  const scrollUp = document.getElementById('scroll-up');
  this.scrollY >= 350 ? scrollUp.classList.add('show-scroll') : scrollUp.classList.remove('show-scroll');
};

window.addEventListener('scroll', scrollUp);

const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
  const scrollDown = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute('id');
    const sectionClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

    if (scrollDown >= sectionTop && scrollDown <= sectionTop + sectionHeight) {
      sectionClass.classList.add('active-link');
    } else {
      sectionClass.classList.remove('active-link');
    }
  });
};

window.addEventListener('scroll', scrollActive);

const sr = ScrollReveal({
  origin: 'top',
  distance: '120px',
  duration: 2000,
  delay: 300,
});

sr.reveal('.home__data, .about__data, .footer__container');
sr.reveal('.home--images', { delay: 1000 });
sr.reveal('.home__dam-1', { delay: 1000, scale: 0, rotate: { z: 45 } });
sr.reveal('.home__dam-2, .home__dam-3', { delay: 1400, scale: 0, rotate: { z: 45 } });
sr.reveal('.home__dam-4', { delay: 1700, scale: 0, rotate: { z: 45 } });
sr.reveal('.home__dam-5', { delay: 1800, scale: 0, rotate: { z: 45 } });
sr.reveal('.about__img-1', { delay: 600, origin: 'right' });
sr.reveal('.about__img-2', { delay: 800, origin: 'left' });
sr.reveal('.about__tooltip-1', { delay: 1600, origin: 'left' });
sr.reveal('.about__tooltip-2', { delay: 1800, origin: 'right' });
sr.reveal('.order__card:nth-child(1)', { origin: 'right' });
sr.reveal('.order__card:nth-child(2)', { origin: 'left' });
sr.reveal('.order__tooltip-1', { delay: 800, origin: 'right' });
sr.reveal('.order__tooltip-2', { delay: 800, origin: 'left' });
sr.reveal('.combo_titles', { origin: 'bottom' });
sr.reveal('.combo__img', { delay: 1000 });
sr.reveal('.combo__data', { delay: 1600 });
sr.reveal('.combo__numbers', { delay: 1600, origin: 'bottom' });
sr.reveal('.contact__data', { origin: 'right' });
sr.reveal('.contact__info', { origin: 'left' });
sr.reveal('.contact__img-1', { delay: 1000, distance: 0, scale: 0, rotate: { z: -45 } });
sr.reveal('.contact__img-2', { delay: 1200, distance: 0, scale: 0, rotate: { z: 45 } });
sr.reveal('.contact__dam-1', { delay: 1400, scale: 0, rotate: { z: 45 } });
sr.reveal('.contact__dam-3', { delay: 1600, scale: 0, rotate: { z: 45 } });
sr.reveal('.contact__dam-2', { delay: 1800, scale: 0, rotate: { z: 45 } });
sr.reveal('.contact__dam-4', { delay: 2000, scale: 0, rotate: { z: 45 } });

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
