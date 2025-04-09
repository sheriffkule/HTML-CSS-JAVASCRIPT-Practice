const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');

menuBtn.addEventListener('click', () => {
  menu.classList.toggle('change');
});

document.addEventListener('click', (e) => {
  if (e.target !== menuBtn && !menu.contains(e.target)) {
    menu.classList.remove('change');
  }
});

const navLinks = [...document.querySelectorAll('.nav-link')];

navLinks.forEach((link, i) => {
  link.textContent.split('').forEach((letter) => {
    const span = document.createElement('span');
    span.classList.add('letter');
    span.textContent = letter;
    link.appendChild(span);
  });
  link.addEventListener('click', () => {
    menu.classList.remove('change');
  });
  link.removeChild(link.childNodes[0]);
});
