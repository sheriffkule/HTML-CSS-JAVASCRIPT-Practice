const container = document.querySelector('.container');

for (let i = 1; i < 11; i++) {
  const card = document.createElement('div');
  card.classList.add('box');
  card.setAttribute('title', 'trbule');
  for (let i = 1; i < 17; i++) {
    const card2 = document.createElement('div');
    card2.classList.add('card');
    card2.setAttribute('title', 'krtica');
    card.appendChild(card2);
  }
  container.appendChild(card);
}

let cursor = document.getElementById('cursor');

window.onmousemove = function (e) {
  requestAnimationFrame(() => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
};