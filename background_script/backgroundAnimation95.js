document.addEventListener('mousemove', function (e) {
  let trail = document.createElement('div');
  trail.className = 'trail';

  trail.style.left = e.pageX + 'px';
  trail.style.top = e.pageY + 'px';

  document.body.appendChild(trail);

  setTimeout(() => {
    trail.remove();
  }, 1000);
});
