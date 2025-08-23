const cursorElement = document.getElementById('custom-cursor');
const buttons = document.querySelectorAll('[data-cursor]');
const resetButton = document.getElementById('reset-cursor');

let activeCursor = null;

document.addEventListener('mousemove', () => {
  if (activeCursor) {
    cursorElement.style.left = e.clientX + 'px';
    cursorElement.style.top = e.clientY + 'px';
  }
});

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const cursorType = button.getAttribute('data-cursor');
    const imagePath = `{cursorType}.png`;
    cursorElement.style.backgroundImage = `url(${imagePath})`;
    cursorElement.style.display = 'block';
    cursorElement.style.animation = 'fadeIn 0.25s ease-out';
    activeCursor = cursorType;
    document.body.classList.add('hide-default-cursor');
  });
});

resetButton.addEventListener('click', () => {
  activeCursor = null;
  cursorElement.style.display = 'none';
  document.body.classList.remove('hide-default-cursor');
});
