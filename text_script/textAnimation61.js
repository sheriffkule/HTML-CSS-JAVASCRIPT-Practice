const splatter = document.querySelector('.splatter');

for (let i = 0; i < 100; i++) {
  let span = document.createElement('span');
  span.style.setProperty('--x', Math.random() * 2);
  span.style.setProperty('--y', Math.random() * 2);
  splatter.appendChild(span);
}
