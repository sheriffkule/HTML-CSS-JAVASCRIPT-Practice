const spans = [];
const numSpans = 20;

for (let i = 0; i < numSpans; i++) {
  const span = document.createElement('span');
  document.body.appendChild(span);
  span.setAttribute('title', 'gicule');
  spans.push(span);
}

document.addEventListener('mousemove', (event) => {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  spans.forEach((span, index) => {
    const delay = Math.random() * 500;

    setTimeout(() => {
      span.style.top = `${mouseY}px`;
      span.style.left = `${mouseX - 50}px`;

      span.style.rotate = `${mouseY + index * 18}deg`;
      span.style.filter = `hue-rotate(${mouseY + index * 18}deg)`
    }, delay);
  });
});
