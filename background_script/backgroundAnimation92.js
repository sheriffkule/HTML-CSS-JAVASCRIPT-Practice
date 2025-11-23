function lines() {
  let size = Math.random() * 12;
  let duration = Math.random() * 9;
  let hue = Math.random() * 360;
  let e = document.createElement('div');
  e.setAttribute('class', 'circle');
  document.body.appendChild(e);
  e.style.setProperty('--hue', hue);
  e.style.width = size + 'px';
  e.style.left = Math.random() * innerWidth + 'px';
  e.style.animationDuration = 2 + duration + 's';

  setTimeout(function () {
    document.body.removeChild(e);
  }, 5000);
}

setInterval(function () {
  lines();
}, 200);
