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
navLink.forEach((n) => n.addEventListener('click', linkAction));

const scrollHeader = () => {
  const header = document.getElementById('header');
  this.scrollY >= 50 ? header.classList.add('scroll-header') : header.classList.remove('scroll-header');
};
window.addEventListener('scroll', scrollHeader);

const scrollUp = () => {
  const scrollUp = document.getElementById('scroll-up');
  this.scrollY >= 350 ? scrollUp.classList.add('show-scroll') : scrollUp.classList.remove('show-scroll');
};
window.addEventListener('scroll', scrollUp);

const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 58;
    const sectionId = current.getAttribute('id');
    const sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      sectionsClass.classList.add('active-link');
    } else {
      sectionsClass.classList.remove('active-link');
    }
  });
};
window.addEventListener('scroll', scrollActive);

const sr = ScrollReveal({
  origin: 'bottom',
  distance: '120px',
  duration: 1500,
  delay: 300,
  easing: 'cubic-bezier(0.5, 0, 0, 1)',
});

sr.reveal(`.home__title`, { origin: 'top' });
sr.reveal(`.home__button`, { delay: 600, origin: 'top' });
sr.reveal(`.home__fryingpan`, { delay: 600, rotate: { z: 60 } });
sr.reveal(`.home__rosemary-1`, { delay: 1200, origin: 'right', rotate: { z: -60 } });
sr.reveal(`.home__rosemary-2`, { delay: 1200, origin: 'left', rotate: { z: -60 } });
sr.reveal(`.home__tomato`, { delay: 1200, origin: 'right', rotate: { z: -60 } });
sr.reveal(`.home__spoon`, { delay: 600, origin: 'bottom' });
sr.reveal(`.home__onion`, { delay: 1200, origin: 'right', rotate: { z: -60 } });
sr.reveal(`.home__pepper`, { delay: 1200, origin: 'top', distance: '120px' });
sr.reveal(`.home__salt-1`, { delay: 1200, origin: 'left', distance: '120px' });
sr.reveal(`.home__salt-2`, { delay: 1200, origin: 'right', distance: '120px' });

sr.reveal(`.about__data > *`, { origin: 'top' });
sr.reveal(`.about__flour`, { delay: 900 });
sr.reveal(`.about__rosemary`, { delay: 1200, origin: 'bottom' });

sr.reveal(`.menu__header`);
sr.reveal(`.menu__dish-1, .menu__dish-2, .menu__dish-3, .menu__dish-4`, {
  distance: '0',
  duration: 2000,
  rotate: { z: -30 },
});
sr.reveal(`.menu__rosemary, .menu__four-2, .menu__tomato, .menu__flour-4`, { delay: 600 });
sr.reveal(`.menu__flour-1, .menu__pepper, .menu__flour-3`, { delay: 900 });
sr.reveal(`.menu__info`, { delay: 600, origin: 'left' });

sr.reveal(`.events__data > *`, { origin: 'top' });
sr.reveal(`.events__flour`, { delay: 900 });
sr.reveal(`.events__spoon`, { delay: 1200, origin: 'bottom' });

sr.reveal(`.ingredients__data`);
sr.reveal(`.ingredients__images > img`, { delay: 1200, distance: '0', scale: 0.1 });
sr.reveal(`.ingredients__img-1`, { delay: 600, distance: '0', scale: 1.5 });

sr.reveal(`.contact__map`, { origin: 'left' });
sr.reveal(`.contact__content`, { origin: 'right' });

sr.reveal(`.reservation__contact, .footer__container`);
