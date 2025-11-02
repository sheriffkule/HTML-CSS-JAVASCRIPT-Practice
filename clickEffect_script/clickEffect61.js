let cursor = document.getElementById('cursor');
let body = document.body;

document.addEventListener('mousemove', (e) => {
  body.style.backgroundPositionX = e.pageX / -4 + 'px';
  body.style.backgroundPositionY = e.pageY / -4 + 'px';
  cursor.style.top = e.pageY + 'px';
  cursor.style.left = e.pageX + 'px';
});

document.addEventListener('click', (e) => {
  document.querySelector('p').classList.toggle('show');
  document.querySelector('p').style.top = e.pageY + 'px';
  document.querySelector('p').style.left = e.pageX + 'px';
});
