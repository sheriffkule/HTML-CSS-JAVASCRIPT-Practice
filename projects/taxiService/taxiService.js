const header = document.querySelector('header');

window.addEventListener('scroll', function () {
  header.classList.toggle('sticky', window.scrollY > 150);
});

let menu = document.querySelector('#menu-icon');
let navLinks = document.querySelector('.nav-links');

menu.addEventListener('click', function () {
  menu.classList.toggle('bx-x');
  navLinks.classList.toggle('open');
});

window.onscroll = function () {
  menu.classList.remove('bx-x');
  navLinks.classList.remove('open');
};

document.addEventListener('click', function (event) {
  if (!navLinks.contains(event.target) && !menu.contains(event.target)) {
    navLinks.classList.remove('open');
    menu.classList.remove('bx-x');
  }
});

const scrollUp = () => {
  const scrollUp = document.getElementById('scroll-up');

  this.scrollY >= 350
    ? scrollUp.classList.add('show-scroll')
    : scrollUp.classList.remove('show-scroll');
};

window.addEventListener('scroll', scrollUp);

const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 300;
    const sectionId = current.getAttribute('id');
    const sectionClass = document.querySelector('.nav-links a[href*=' + sectionId + ']');
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      sectionClass.classList.add('active-link');
    } else {
      sectionClass.classList.remove('active-link');
    }
  });
};

window.addEventListener('scroll', scrollActive);

function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');
  yearElement.dateTime = currentYear;
  yearElement.textContent = currentYear;
}

updateYear();

const animate = ScrollReveal({
  origin: 'top',
  distance: '200px',
  duration: 2500,
  delay: '400',
  reset: true,
  mobile: true,
  scale: 0.5,
  easing: 'ease',
});

animate.reveal('.home-text, .social-icons, .about-img, .feature-left', {
  origin: 'left',
});
animate.reveal('.arrow, .info-box, .about-text, .feature-right', { origin: 'right' });
animate.reveal(
  '.home-img, .text-center, .services-content, .feature-middle, .contact-box',
  { interval: '200' }
);
animate.reveal('.row', { delay: '500', interval: '600' });