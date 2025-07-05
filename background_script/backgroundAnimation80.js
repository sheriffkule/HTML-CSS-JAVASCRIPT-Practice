let indicator = document.querySelector('.scrollIndicator');
let textValue = document.getElementById('textValue');

let maxHeight = document.documentElement.scrollHeight - window.innerHeight;

window.addEventListener('scroll', () => {
  let scrollRatio = window.scrollY / maxHeight;
  let angle = scrollRatio * 360;
  let percent = Math.round(scrollRatio * 100);

  indicator.style.background = `conic-gradient(from 0deg, #008eff 0%, #f00 ${angle}deg, #000 ${angle}deg)`;
  textValue.textContent = percent + '%';
});
