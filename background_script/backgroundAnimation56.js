const spans = [];
const numSpans = 20;

for (let i = 0; i < numSpans; i++) {
  const span = document.createElement('span');
  document.body.appendChild(span);
  spans.push(span);
}

document.addEventListener('mousemove', (event) => {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  spans.forEach((span, index) => {
    const delay = Math.random() * 500;

    setTimeout(() => {
      span.style.top = `${mouseY + index * 5}px`;
      span.style.left = `${mouseX + 30}px`;
    }, delay);
  });
});
