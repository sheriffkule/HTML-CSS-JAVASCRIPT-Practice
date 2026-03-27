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

const swiperWork = new Swiper('.work__swiper', {
  loop: true,
  slidesPerView: 'auto',
  spaceBetween: 24,
  grabCursor: true,

  pagination: {
    el: '.work__data .swiper-pagination',
    type: 'fraction',
  },

  navigation: {
    nextEl: '.work__data .swiper-button-next',
    prevEl: '.work__data .swiper-button-prev',
  },
});

const swiperTestimonial = new Swiper('.service__swiper', {
  loop: true,
  slidesPerView: 'auto',
  spaceBetween: 56,
  grabCursor: true,

  pagination: {
    el: '.service__swiper .swiper-pagination',
  },

  navigation: {
    nextEl: '.service__swiper .swiper-button-next',
    prevEl: '.service__swiper .swiper-button-prev',
  },
});

const scrollUp = () => {
  const scrollUp = document.getElementById('scroll-up');
  this.scrollY >= 350 ? scrollUp.classList.add('show-scroll') : scrollUp.classList.remove('show-scroll');
};

window.addEventListener('scroll', scrollUp);

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

const reveal = (selector, options = {}) => {
  gsap.from(selector, {
    scrollTrigger: selector,
    opacity: 0,
    duration: 1,
    y: 100,
    delay: 0.3,
    ease: 'power2.out',
    ...options,
  });
};

const tl = gsap.timeline({});
tl.fromTo(
  '.home__bg, .home__shadow',
  {
    y: -800,
    scale: 0.3,
    opacity: 0,
  },
  {
    y: 0,
    scale: 0.3,
    opacity: 1,
    duration: 1,
    ease: 'power3.out',
  },
);

tl.to('.home__bg, .home__shadow', {
  scale: 1,
  duration: 1,
  ease: 'back.out(0.5)',
});

tl.to('.home__bg', {
  scale: 1.08,
  duration: 8,
  ease: 'power1.inOut',
  repeat: -1,
  yoyo: true,
  transformOrigin: 'center center',
});

reveal('.home__logo', { y: 0, scale: 0.3, delay: 1.9, ease: 'elastic.out(0.8, 0.5)' });
reveal('.home__title', { delay: 2.2 });
reveal('.home__description', { delay: 2.5 });
reveal('.home__data .button', { delay: 2.8 });

if (window.scrollY < 100) {
  reveal('.nav > *', { delay: 1.6, y: -30 });
} else {
  gsap.set('.nav > *', { opacity: 1, y: 0 });
}

reveal('.about__data > *', { stagger: 0.2 });
reveal('.about__img > *', { delay: 0.9 });

const aboutCounter = document.querySelectorAll('.about__counter');

aboutCounter.forEach((el) => {
  gsap.from(el, {
    textContent: 0,
    duration: 3,
    ease: 'power1.out',
    snap: { textContent: 1 },
    scrollTrigger: { trigger: el, once: true },
  });
});

reveal('.work__data .section__title', {});
reveal('.work__description', { delay: 0.6 });
reveal('.work__data .swiper-pagination', { delay: 0.9 });
reveal('.work__data :is(.swiper-button-prev, .swiper-button-next', { delay: 1.2 });
reveal('.work__swiper', { delay: 0.9 });

reveal('.service__data .section__title', {});
reveal('.service__plan', { delay: 0.6, stagger: 0.2 });
reveal('.service__swiper', { delay: 0.9, stagger: 0.2 });

reveal('.expert .section__title', {});
reveal('.expert__description', { delay: 0.6 });
reveal('.expert__card', { delay: 0.9, stagger: 0.2 });

reveal('.contact__data .section__title', {});
reveal('.contact__description', { delay: 0.6 });
reveal('.contact__data .button', { delay: 0.9, y: 0, scale: 0 });
reveal('.contact__map', { delay: 0.9 });
reveal('.contact__card', { delay: 1.2, stagger: 0.2 });

reveal('.footer__container', {});
