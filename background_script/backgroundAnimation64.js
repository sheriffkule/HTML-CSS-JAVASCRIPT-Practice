const container = document.querySelector('.container');

const circles = Array.from({ length: 50 }, (_, i) => {
  const circle = document.createElement('div');
  circle.classList.add('circle');
  circle.style.setProperty('--i', i + 10);
  circle.dataset.text = 'krtica';
  return circle;
});

container.append(...circles);

function generate() {
  const easingFunctions = [
    'easeInOutSine',
    'easeInOutCubic',
    'easeInOutQuart',
    'easeInOutQuint',
    'easeInOutExpo',
    'easeInOutCirc',
    'easeInOutBack',
    'easeInOutElastic',
    'easeInOutBounce',
    'cubicBezier(0.42, 0, 0.58, 1)',
  ];

  const easing = easingFunctions[Math.floor(Math.random() * easingFunctions.length)];

  anime({
    targets: '.circle',
    translateX: () => anime.random(-200, 200),
    translateY: () => anime.random(-200, 200),
    scale: () => anime.random(1, 5),
    backgroundColor: () => {
      const r = anime.random(0, 255);
      const g = anime.random(0, 255);
      const b = anime.random(0, 255);
      return `rgb(${r}, ${g}, ${b})`;
    },
    easing: easing,
  });
  anime({
    targets: 'h1',
    color: () => {
      const r = anime.random(0, 255);
      const g = anime.random(0, 255);
      const b = anime.random(0, 255);
      return `rgb(${r}, ${g}, ${b})`;
    },
    easing: easing,
  });
}

document.addEventListener('DOMContentLoaded', generate);

container.addEventListener('click', generate);