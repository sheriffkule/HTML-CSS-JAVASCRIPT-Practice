document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.querySelector('.cursor');

  for (let i = 0; i < 25; i++) {
    const span = document.createElement('span');
    span.classList.add('box');
    span.style.setProperty('--i', i + 1);
    span.style.left = i * 20 + 'px';
    span.style.filter = `hue-rotate(${i * 13}deg)`;
    cursor.appendChild(span);
  }
});

document.addEventListener('mousemove', (e) => {
  gsap.to('.box', {
    x: e.clientX,
    y: e.clientY,
    stagger: 0.05,
  });
});