let menuToggle = document.querySelector('.toggle');
let title = document.querySelector('h1');
let body = document.querySelector('body')

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');

  if (menuToggle.classList.contains('active')) {
    body.style.background = '#003357'
    title.style.color = '#4169e1';
    title.style.fontWeight = 'bold';
    title.textContent = 'Close';
  } else {
    body.style.background = ''
    title.style.color = '';
    title.textContent = 'Open';
    title.style.fontWeight = 400;
  }
});