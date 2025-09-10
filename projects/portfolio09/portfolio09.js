const { animate, text, stagger } = anime;

const { chars: chars1 } = text.split('.home__profession-1', { chars: true });
const { chars: chars2 } = text.split('.home__profession-2', { chars: true });

animate([chars1, chars2], {
  y: [{ to: ['100%', '0%'] }, { to: '-100%', delay: 4000, ease: 'in(3)' }],
  duration: 900,
  ease: 'out(3)',
  delay: stagger(80),
  loop: true,
});

const swiperProjects = new Swiper('.projects__swiper', {
  loop: true,
  spaceBetween: 24,
  slidesPerView: 'auto',
  grabCursor: true,
  speed: 600,
  centeredSlides: true,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

const tabs = document.querySelectorAll('[data-target]');
const tabContent = document.querySelectorAll('[data-content]');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const targetSelector = tab.dataset.target;
    const targetContent = document.querySelector(targetSelector);

    tabContent.forEach((content) => content.classList.remove('work-active'));
    tabs.forEach((t) => t.classList.remove('work-active'));

    tab.classList.add('work-active');
    targetContent.classList.add('work-active');
  });
});

const servicesButtons = document.querySelectorAll('.services__button');

servicesButtons.forEach((button) => {
  const heightInfo = document.querySelector('.services__info');
  heightInfo.style.height = heightInfo.scrollHeight + 'px';

  button.addEventListener('click', () => {
    const servicesCards = document.querySelectorAll('.services__card');
    const currentCard = button.parentNode;
    const currentInfo = currentCard.querySelector('.services__info');
    const isOpen = currentCard.classList.contains('services-open');

    servicesCards.forEach((card) => {
      card.classList.replace('services-open', 'services-close');

      const info = card.querySelector('.services__info');
      info.style.height = '0';
    });

    if (!isOpen) {
      currentCard.classList.replace('services-close', 'services-open');
      currentInfo.style.height = currentInfo.scrollHeight + 'px';
    }
  });
});

const tracks = document.querySelectorAll('.testimonials__content');

tracks.forEach((track) => {
  const cards = [...track.children];

  for (const card of cards) {
    track.appendChild(card.cloneNode(true));
  }
});

const copyBtn = document.getElementById('contact-btn');
const copyEmail = document.getElementById('contact-email').textContent;

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(copyEmail).then(() => {
    copyBtn.innerHTML = `Email Copied <i class="ri-check-line"></i>`;
    copyBtn.style.color = '#0f0';

    setTimeout(() => {
      copyBtn.innerHTML = `Copy Email <i class="ri-file-copy-line">`;
      copyBtn.style.color = '#f1f1f3';
    }, 2000);
  });
});

const textYear = document.getElementById('year');
const currentYear = new Date().getFullYear();

textYear.textContent = currentYear;

const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const id = section.id;
    const top = section.offsetTop - 50;
    const height = section.offsetHeight;
    const link = document.querySelector(`.nav__menu a[href*=${id}]`);

    if (scrollY > top && scrollY <= top + height) {
      link.classList.add('active-link');
    } else {
      link.classList.remove('active-link');
    }
  });
};

window.addEventListener('scroll', scrollActive);

const cursor = document.querySelector('.cursor');
let mouseX = 0;
let mouseY = 0;

const cursorMove = () => {
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
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

const sr = ScrollReveal({
  origin: 'top',
  distance: '200px',
  duration: 2000,
  delay: 300,
  reset: true,
});

sr.reveal(`.home__image, .projects__container, .work__container, .testimonials__container, .contact__container`);
sr.reveal(`.home__data`, { delay: 900, origin: 'bottom' });
sr.reveal(`.home__info`, { delay: 1200, origin: 'bottom' });
sr.reveal(`.home__social, .home__cv`, { delay: 1500 });
sr.reveal(`.about__data`, { origin: 'left' });
sr.reveal(`.about__image`, { origin: 'right' });
sr.reveal(`.services__card, .interval`, { interval: 400 });

