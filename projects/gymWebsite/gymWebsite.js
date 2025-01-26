const calculateForm = document.getElementById('calculate-form');
const calculateCm = document.getElementById('calculate-cm');
const calculateKg = document.getElementById('calculate-kg');
const calculateMessage = document.getElementById('calculate-message');

const calculateBmi = (e) => {
  e.preventDefault();

  if (calculateCm.value === '' || calculateKg.value === '') {
    calculateMessage.classList.remove('color-first');
    calculateMessage.classList.add('color-red');

    calculateMessage.textContent = 'Please enter both height and weight.';

    setTimeout(() => {
      calculateMessage.textContent = '';
    }, 3000);
  } else {
    const cm = calculateCm.value / 100;
    const kg = calculateKg.value;
    const bmi = Math.round(kg / (cm * cm));

    if (bmi < 18.5) {
      calculateMessage.classList.add('color-first');
      calculateMessage.textContent = `Your BMI is ${bmi}. You are underweight.`;
    } else if (bmi < 25) {
      calculateMessage.classList.add('color-first');
      calculateMessage.textContent = `Your BMI is ${bmi}. You are normal weight.`;
    } else {
      calculateMessage.classList.add('color-first');
      calculateMessage.textContent = `Your BMI is ${bmi}. You are overweight.`;
    }

    calculateCm.value = '';
    calculateKg.value = '';

    setTimeout(() => {
      calculateMessage.textContent = '';
    }, 4000);
  }
};

calculateForm.addEventListener('submit', calculateBmi);

const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

navToggle.addEventListener('click', () => {
  navMenu.classList.add('show-menu');
});

navClose.addEventListener('click', () => {
  navMenu.classList.remove('show-menu');
});

const navLink = document.querySelectorAll('.nav-link');

const linkAction = () => {
  const navMenu = document.getElementById('nav-menu');

  navMenu.classList.remove('show-menu');
};

navLink.forEach((n) => n.addEventListener('click', linkAction));

const scrollHeader = () => {
  const header = document.getElementById('header');

  this.scrollY >= 100
    ? header.classList.add('bg-header')
    : header.classList.remove('bg-header');
};

window.addEventListener('scroll', scrollHeader);

const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 58;
    const sectionId = current.getAttribute('id');
    const sectionClass = document.querySelector('.nav-menu a[href*=' + sectionId + ']');
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      sectionClass.classList.add('active-link');
    } else {
      sectionClass.classList.remove('active-link');
    }
  });
};

window.addEventListener('scroll', scrollActive);

const scrollUp = () => {
  const scrollUp = document.getElementById('scroll-up');

  this.scrollY >= 350
    ? scrollUp.classList.add('show-scroll')
    : scrollUp.classList.remove('show-scroll');
};

window.addEventListener('scroll', scrollUp);

const sr = ScrollReveal({
  origin: 'top',
  distance: '200px',
  duration: 2500,
  delay: 400,
});

sr.reveal('.home-data, .footer-container, .footer-group');
sr.reveal('.home-img', { delay: 700, origin: 'bottom' });
sr.reveal('.logo-img, .program-card, .pricing-card', { interval: 200 });
sr.reveal('.choose-group, .calculate-content', { origin: 'left' });
sr.reveal('.choose-content, .calculate-images', { origin: 'right' });

const year = document.getElementById('year');
const thisYear = new Date().getFullYear();

year.setAttribute('datetime', thisYear);
year.textContent = thisYear;
