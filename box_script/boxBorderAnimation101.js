/** @type {HTMLCanvasElement} */

const CANVAS_WIDTH = 480;
const CANVAS_HEIGHT = 620;

let snowBgCanvas;
let branchCanvas;

function initializeCanvas(canvasID) {
  const canvas = document.getElementById(canvasID);
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  return canvas;
}

function main() {
  snowBgCanvas = initializeCanvas('canvasSnowBackground');
  branchCanvas = initializeCanvas('canvasTreeBranches');
  const treeLocation = [CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.95];
  drawBranches(branchCanvas, treeLocation, 100, 0, 20);
  drawLeaves(branchCanvas);
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
      let green = 255 * (CANVAS_HEIGHT - loc[1]) / CANVAS_HEIGHT;
      ctx.fillStyle = 'rgba(0,' + green +',0,0.4)';
      ctx.save()
      ctx.translate(...loc)
      ctx.rotate(Math.random() * Math.PI * 2)
      ctx.arc(0, 0, 4, 0, Math.PI);
      ctx.fill();
      ctx.restore()
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
