function startAnimation() {
  const canvasWidth = window.innerWidth;
  const canvasHeight = window.innerHeight;
  const cursorRadius = 250;
  const MIN = 0;
  const MAX = canvasWidth;
  let cursor = [-1500, -1500];

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  let canvasOffset = {
    x0: ctx.canvas.offsetLeft,
    y0: ctx.canvas.offsetTop,
    x1: ctx.canvas.offsetLeft + ctx.canvas.width,
    y1: ctx.canvas.offsetTop + ctx.canvas.height,
  };
  function clamp(number, min = MIN, max = MAX) {
    return Math.max(min, Math.min(number, max));
  }
  function random(factor) {
    return clamp(Math.floor(Math.random() * factor));
  }
  function degreeToRadian(deg){
    return deg * Math.PI / 180;
  }
}
