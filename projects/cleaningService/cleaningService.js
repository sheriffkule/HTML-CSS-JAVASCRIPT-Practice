const toggle = document.getElementById('toggle');
const menu = document.querySelector('.menu');

toggle.addEventListener('click', function () {
  menu.classList.toggle('active');
});

let swiper = new Swiper('.testimonials_swiper', {
  loop: false,
  grabCursor: true,
  slidesPerView: 2,
  spaceBetween: 30,
  breakpoints: {
    1000: {
      slidesPerView: 2,
    },
    0: {
      slidesPerView: 1,
    },
  },
});

document.querySelectorAll('.faq_item').forEach((item) => {
  const question = item.querySelector('.faq_question');
  const answer = item.querySelector('.faq_answer');
  const icon = question.querySelector('i');

  question.addEventListener('click', function () {
    const isActive = item.classList.toggle('active');

    document.querySelectorAll('.faq_item').forEach((otherItem) => {
      if (otherItem != item) {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq_answer').style.maxHeight = null;
        otherItem.querySelector('.faq_question i').classList.replace('fa-minus', 'fa-plus');
      }
    });

    if (isActive) {
      answer.style.maxHeight = answer.scrollHeight + 'px';
      icon.classList.replace('fa-plus', 'fa-minus');
    } else {
      answer.style.maxHeight = null;
      icon.classList.replace('fa-minus', 'fa-plus');
    }
  });
});

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
})

function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');
  yearElement.dateTime = currentYear;
  yearElement.textContent = currentYear;
}

updateYear();