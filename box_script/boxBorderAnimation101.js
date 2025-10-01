/** @type {HTMLCanvasElement} */

const CANVAS_WIDTH = 480;
const CANVAS_HEIGHT = 620;

let snowBgCanvas;
let branchCanvas;
let snowFgCanvas;

function initializeCanvas(canvasID) {
  const canvas = document.getElementById(canvasID);
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  return canvas;
}

function main() {
  snowBgCanvas = initializeCanvas('canvasSnowBackground');
  branchCanvas = initializeCanvas('canvasTreeBranches');
  snowFgCanvas = initializeCanvas('canvasSnowForeground');
  const treeLocation = [CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.95];
  drawBranches(branchCanvas, treeLocation, 100, 0, 20);
  drawLeaves(branchCanvas);
  setInterval(function () {
    handleSnowflakes(snowBgCanvas);
    drawSnowBackground(snowBgCanvas);
  }, 1000 / 60);
  drawSnowForeground(snowFgCanvas);
}

function drawLeaves(branchCanvas) {
  const ctx = branchCanvas.getContext('2d');
  const imageData = ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  const data = imageData.data;

  let branchPixels = [];

  for (let y = 0; y < CANVAS_HEIGHT; y++) {
    for (let x = 0; x < CANVAS_WIDTH; x++) {
      let red = data[(CANVAS_WIDTH * y + x) * 4];
      let green = data[(CANVAS_WIDTH * y + x) * 4 + 1];
      let blue = data[(CANVAS_WIDTH * y + x) * 4 + 2];
      let alpha = data[(CANVAS_WIDTH * y + x) * 4 + 3];

      if (alpha > 0 && y < CANVAS_HEIGHT * 0.95 - 100) {
        branchPixels.push([x, y]);
      }
    }
  }

  for (let i = 0; i < branchPixels.length; i++) {
    if (Math.random() < 0.3) {
      let loc = branchPixels[i];
      loc[0] += (Math.random() - 0.5) * 10;
      loc[1] += (Math.random() - 0.5) * 10;
      ctx.beginPath();
      let green = (255 * (CANVAS_HEIGHT - loc[1])) / CANVAS_HEIGHT;
      ctx.fillStyle = 'rgba(0,' + green + ',0,0.4)';
      ctx.save();
      ctx.translate(...loc);
      ctx.rotate(Math.random() * Math.PI * 2);
      ctx.arc(0, 0, 4, 0, Math.PI);
      ctx.fill();
      ctx.restore();
    }
  }
}

function drawBranches(canvas, start, len, angle, branchWidth) {
  const ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.save();
  ctx.lineWidth = branchWidth;
  ctx.translate(...start);
  ctx.rotate((angle * Math.PI) / 180);

  ctx.moveTo(0, 0);
  ctx.lineTo(0, -len);
  ctx.stroke();

  if (len > 10) {
    drawBranches(canvas, [0, -len], len * 0.5, 35, branchWidth * 0.7);
    drawBranches(canvas, [0, -len], len * 0.5, -35, branchWidth * 0.7);
    drawBranches(canvas, [0, -len], len * 0.82, 0, branchWidth * 0.7);
  }

  ctx.restore();
}

const snowflakes = new Image();
snowflakes.src = '../icons/snowflakes.png';

class Snowflake {
  constructor() {
    this.x = Math.random() * CANVAS_WIDTH;
    this.y = Math.random() * CANVAS_HEIGHT;
    this.size = Math.random() * 60 + 40;
    this.speed = Math.random() * 0.5 + 0.2;
    this.frameX = Math.floor(Math.random() * 4);
    this.frameY = Math.floor(Math.random() * 4);
    this.frameSize = 160;
    this.angle = 0;
    this.spin = Math.random() > 0.5 ? 0.2 : -0.2;
  }

  update() {
    this.y += this.speed;

    if (this.y - this.size > CANVAS_HEIGHT) this.y = 0 - this.size;
    this.angle += this.spin;
  }

  draw(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.angle * Math.PI) / 180);
    ctx.drawImage(
      snowflakes,
      this.frameX * this.frameSize,
      this.frameY * this.frameSize,
      this.frameSize,
      this.frameSize,
      0 - this.size / 2,
      0 - this.size / 2,
      this.size,
      this.size
    );
    ctx.restore();
  }
}

const particlesArray = [];

for (let i = 0; i < 20; i++) {
  particlesArray.push(new Snowflake());
}

function handleSnowflakes(canvas) {
  clear(canvas);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw(canvas);
  }
}

function clear(canvas) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawSnowBackground(canvas) {
  const ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.moveTo(0, CANVAS_HEIGHT);
  ctx.lineTo(0, CANVAS_WIDTH - 20);
  ctx.fillStyle = '#eee';
  ctx.strokeStyle = 'lightblue';
  ctx.quadraticCurveTo(CANVAS_WIDTH, CANVAS_WIDTH - 30, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.lineTo(CANVAS_WIDTH, CANVAS_WIDTH - 30);
  ctx.fillStyle = 'white';
  ctx.quadraticCurveTo(0, CANVAS_WIDTH + 20, 0, CANVAS_HEIGHT);
  ctx.stroke();
  ctx.fill();
}

function drawSnowForeground(canvas) {
  const ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.moveTo(0, CANVAS_HEIGHT);
  ctx.lineTo(0, CANVAS_WIDTH + 20);
  ctx.fillStyle = '#f9f9f9';
  ctx.strokeStyle = 'lightblue';
  ctx.lineWidth = 2;
  ctx.quadraticCurveTo(CANVAS_WIDTH, CANVAS_WIDTH + 90, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.stroke();
  ctx.fill();
}
