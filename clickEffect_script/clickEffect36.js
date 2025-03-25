document.addEventListener('DOMContentLoaded', function () {
  const buttonContainer = document.querySelector('.button-container');
  const button = document.querySelector('.button');

  button.addEventListener('click', () => {
    for (let i = 0; i < 100; i++) {
      const piece = document.createElement('div');
      piece.classList.add('glass-piece');

      const shape = generateRandomShape();
      piece.style.clipPath = shape;

      const angle = Math.random() * 2 * Math.PI;

      const distance = Math.random() * 400;
      const x = distance * Math.cos(angle);
      const y = distance * Math.sin(angle);
      const rotate = Math.random() * 360;

      piece.style.setProperty('--x', `${x}px`);
      piece.style.setProperty('--y', `${y}px`);
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.top = `${Math.random() * 80}%`;
      piece.style.setProperty('--rotate', `${rotate}deg`);
      piece.style.animationDelay = `${Math.random() * 0.5}s`;

      buttonContainer.appendChild(piece);

      piece.addEventListener('animationend', () => {
        piece.remove();
      });
    }
  });
});

function generateRandomShape() {
  const points = [];
  for (let i = 0; i < 4; i++) {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    points.push(`${x}% ${y}%`);
  }
  return `polygon(${points.join(', ')})`;
}
