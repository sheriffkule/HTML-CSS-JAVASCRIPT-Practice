const container = document.getElementById('container');
const addBtn = document.getElementById('addFrame');
const removeBtn = document.getElementById('removeFrame');
let frameCount = 5;
let speedMultiplier = 1;
let colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'ping', 'royalblue'];

function createFrames(count) {
  for (let i = 0; i < count; i++) {
    addFrame();
  }
}

function addFrame() {
  const frame = document.createElement('div');
  frame.className = 'frame';

  const size = Math.floor(Math.random() * 200) + 100;
  frame.style.width = `${size}px`;
  frame.style.height = `${size}px`;

  frame.style.top = `${Math.random() * 80}%`;
  frame.style.left = `${Math.random() * 80}%`;

  const moveDuration = Math.floor(Math.random() * 30) + 10;
  const rotateDuration = Math.floor(Math.random() * 30) + 20;
  const colorDuration = Math.floor(Math.random() * 20) + 10;

  frame.style.animation = `
    move ${moveDuration / speedMultiplier}s linear infinite, 
    rotate ${rotateDuration / speedMultiplier}s linear infinite, 
    colorChange ${colorDuration / speedMultiplier}s linear infinite
  `;

  frame.style.borderWidth = `${Math.floor(Math.random() * 10) + 5}px`;

  container.appendChild(frame);
  frameCount++;
}

function removeFrame() {
  if (frameCount > 0) {
    const frames = document.querySelectorAll('.frame');
    if (frames.length > 0) {
      container.removeChild(frames[frames.length - 1]);
      frameCount--;
    }
  }
}

addBtn.addEventListener('click', addFrame);
removeBtn.addEventListener('click', removeFrame);

createFrames(frameCount);

setInterval(() => {
  const frames = document.querySelectorAll('.frame');
  frames.forEach((frame) => {
    if (Math.random() > 0.95) {
      frame.style.top = `${Math.random() * 80}%`;
      frame.style.left = `${Math.random() * 80}%`;
    }
  });
}, 3000);
