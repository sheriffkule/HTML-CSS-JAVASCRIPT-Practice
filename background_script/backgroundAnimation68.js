function startAnimation() {
  const CANVAS_WIDTH = window.innerWidth;
  const CANVAS_HEIGHT = window.innerHeight;
  const CURSOR_RADIUS = 250;
  const MIN = 0;
  const MAX = CANVAS_WIDTH;
  let cursor = [-1500, -1500];

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

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
  class Particle{
    x = random(canvasOffset.x1);
    y = random(canvasOffset.y1);
    size = random(4);
    color = '#ffffff';
    opacity = 1;

    constructor(ctx) {
        this.ctx = ctx;
        this.vx = (Math.random() * 0.5) * 1;
        this.vy = (Math.random() * 0.5) * 1;
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }
  }
  let circle = [];
  for (let i = 0; i < 250; i++){
    circle.push(new Particle(ctx));
  }
  canvas.addEventListener('mousemove', function(evt) {
    cursor = [evt.clientX, evt.clientY];
  });
  canvas.addEventListener('mouseleave', function(evt) {
    cursor = [ -1500, -1500 ];
  });
  function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  let d = 0;

  function animate(){
    clearCanvas();
    circle.forEach((item) => {
        d = Math.sqrt(
            Math.pow(item.x - cursor[0], 2) + Math.pow(item.y - cursor[1], 2)
        );
        if(d < CURSOR_RADIUS) {
            ctx.strokeStyle = '#fff';
            ctx.moveTo(cursor[0], cursor[1]);
            ctx.lineTo(item.x, item.y);
            ctx.stroke();
        }
        item.draw();

        item.x += item.vx;
        item.y += item.vy;

        if(item.x < canvasOffset.x0 || item.x > canvasOffset.x1){
            item.vx *= -1;
        }else if (item.y < canvasOffset.y0 || item.y > canvasOffset.y1) {
            item.vy *= -1;
        }
    })
    requestAnimationFrame(animate);
  }
  animate();
}

startAnimation();
window.addEventListener('resize', startAnimation);