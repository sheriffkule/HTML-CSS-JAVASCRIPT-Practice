function randomText() {
  let text = 'ABCDEFGHIJKLMNOPRQSTUWXYZ';

  letter = text[Math.floor(Math.random() * text.length)];

  return letter;
}

function rain() {
  const fontStyles = ['normal', 'bold', 'italic', 'oblique'];
  let e = document.createElement('div');

  let left = Math.floor(Math.random() * 110);
  let size = Math.random() * 1.8;
  let duration = Math.random() * 115;

  e.classList.add('text');
  e.innerText = randomText();
  document.body.appendChild(e);

  e.style.left = left + '%';
  e.style.fontSize = 0.3 + size + 'em';
  e.style.animationDuration = 30 + duration + 's';
  e.style.color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  e.style.fontStyle = fontStyles[Math.floor(Math.random() * fontStyles.length)];
  e.style.transform = `translateX(${Math.floor(Math.random() * 100)}px)`;

  setTimeout(function () {
    document.body.removeChild(e);
  }, 30000);
}

setInterval(function () {
  rain();
}, 300);