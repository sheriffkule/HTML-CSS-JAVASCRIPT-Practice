window.addEventListener('load', function () {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.fillStyle = 'green';
  ctx.lineCap = 'round';
  ctx.shadowColor = 'rgba(0, 0, 0, 0,7)';
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 5;
  ctx.shadowBlur = 10;

  let size = canvas.width < canvas.height ? canvas.width * 0.25 : canvas.height * 0.25;
  const maxLevel = 4;
  const branches = 2;

  let sides = 5;
  let scale = 0.5;
  let spread = 0.1;
  let color = 'hsl(' + Math.random() * 360 + ', 100%, 50%)';
  let lineWidth = Math.floor(Math.random() * 20 + 10);

  const randomizeButton = document.getElementById('randomizeButton');
  const resetButton = document.getElementById('resetButton');
  const slider_spread = document.getElementById('spread');
  const label_spread = document.querySelector('[for="spread"]');
  const slider_sides = document.getElementById('sides');
  const label_sides = document.querySelector('[for="sides"]');

  slider_spread.addEventListener('change', function (e) {
    spread = e.target.value;
    updateSliders();
    drawFractal();
  });

  slider_sides.addEventListener('change', function (e) {
    sides = e.target.value;
    updateSliders();
    drawFractal();
  });

  function drawBranch(level) {
    if (level > maxLevel) return;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(size, 0);
    ctx.stroke();

    for (let i = 0; i < branches; i++) {
      ctx.save();
      ctx.translate(size - (size / branches) * i, 0);
      ctx.scale(scale, scale);

      ctx.save();
      ctx.rotate(spread);
      drawBranch(level + 1);
      ctx.restore();

      ctx.save();
      ctx.rotate(-spread);
      drawBranch(level + 1);
      ctx.restore();

      ctx.restore();
    }
  }

  function drawFractal() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.translate(canvas.width / 2, canvas.height / 2);

    for (let i = 0; i < sides; i++) {
      ctx.rotate((Math.PI * 2) / sides);
      drawBranch(0);
    }
    ctx.restore();

    randomizeButton.style.backgroundColor = color;
    resetButton.style.backgroundColor = color;
  }
  drawFractal();

  function randomizeFractal() {
    sides = Math.floor(Math.random() * 7 + 2);
    scale = Math.random() * 0.2 + 0.4;
    spread = Math.random() * 2.9 + 0.1;
    color = 'hsl(' + Math.random() * 360 + ', 100%, 50%)';
    lineWidth = Math.floor(Math.random() * 20 + 10);
  }

  randomizeButton.addEventListener('click', function () {
    randomizeFractal();
    updateSliders();
    drawFractal();
  });

  function resetFractal() {
    sides = 5;
    scale = 0.5;
    spread = 0.7;
    color = 'hsl(40, 100%, 50%)';
    lineWidth = 15;
  }

  resetButton.addEventListener('click', function() {
    resetFractal();
    updateSliders();
    drawFractal();
  })

  function updateSliders() {
    slider_spread.value = spread;
    label_spread.innerText = 'Spread: ' + Number(spread).toFixed(2);
    slider_sides.value = sides;
    label_sides.innerText = 'Sides: ' + sides;
  }
  updateSliders();
});

function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');

  if (yearElement) {
    yearElement.setAttribute('datetime', currentYear.toString());
    yearElement.dateTime = currentYear;
    yearElement.textContent = currentYear.toString();
  }
}

updateYear();