const gallery = document.getElementById('gallery');
const spinBtn = document.getElementById('spin');
const photos = document.querySelectorAll('.photo');
const colorOverlays = document.querySelectorAll('.color-overlay');

let isSpinning = true;
const colorCombos = [
  ['#ff00cc', '#3333ff'],
  ['#00ffcc', '#ff0066'],
  ['#ffcc00', '#6600ff'],
  ['#00ff66', '#ff3300'],
  ['#0066ff', '#ffcc00'],
  ['#ff0066', '#00ccff'],
  ['#00ff99', '#ff00ff'],
  ['#ff6600', '#00ffff'],
  ['#9900ff', '#ffff00'],
  ['#00ff33', '#ff0099'],
];

spinBtn.addEventListener('click', () => {
  isSpinning = !isSpinning;
  spinBtn.textContent = isSpinning ? 'Pause Spin' : 'Auto Spin';
  if (isSpinning) {
    gallery.style.animationPlayState = 'running';
  } else {
    gallery.style.animationPlayState = 'paused';
  }
});

document.addEventListener('mousemove', (e) => {
  if (!isSpinning) {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
    gallery.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg`;
  }
});
