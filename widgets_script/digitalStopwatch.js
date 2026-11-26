const display = document.getElementById('display');
const progressTicks = document.getElementById('progressTicks');
const lapsDiv = document.getElementById('laps');
const modeSelect = document.getElementById('mode');
const countdownInputs = document.getElementById('cdInput');
const minuteInput = document.getElementById('min');
const secondInput = document.getElementById('sec');

const tickCount = 60;
const tickElements = [];
let currentTickCount = -1;

for (let index = 0; index < tickCount; index++) {
  const angle = (index / tickCount) * Math.PI * 2 - Math.PI / 2;
  const innerRadius = 94;
  const outerRadius = 103;
  const tick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  tick.setAttribute('x1', String(110 + Math.cos(angle) * innerRadius));
  tick.setAttribute('y1', String(110 + Math.sin(angle) * innerRadius));
  tick.setAttribute('x2', String(110 + Math.cos(angle) * outerRadius));
  tick.setAttribute('y2', String(110 + Math.sin(angle) * outerRadius));
  tick.classList.add('progress-tick');
  tickElements.push(tick);
  progressTicks.append(tick);
}

let timer = null;
let startTime = 0;
let elapsed = 0;
let mode = 'stopwatch';
let countdownStart = 0;
let lapsArray = [];

function start() {
  if (timer) return;

  if (mode === 'countdown' && elapsed === 0) {
    const minutes = Number(minuteInput.value) || 0;
    const seconds = Number(secondInput.value) || 0;
    countdownStart = (minutes * 60 + seconds) * 1000;

    if (!Number.isFinite(countdownStart) || countdownStart <= 0) {
      secondInput.setCustomValidity('Enter a countdown greater than zero.');
      secondInput.reportValidity();
      return;
    }

    minuteInput.setCustomValidity('');
    secondInput.setCustomValidity('');
    elapsed = countdownStart;
    draw(elapsed, 1);
  }

  startTime = Date.now();
  timer = setInterval(update, 16);
}

function pause() {
  clearInterval(timer);
  timer = null;
}

function resume() {
  start();
}

function reset() {
  pause();
  elapsed = 0;
  countdownStart = 0;
  lapsArray = [];
  display.textContent = '00:00:00.00';
  lapsDiv.replaceChildren();
  localStorage.removeItem('laps');
  draw(0, 0);
  display.classList.remove('warning');
}

function update() {
  const now = Date.now();
  const delta = now - startTime;
  startTime = now;

  if (mode === 'stopwatch') {
    elapsed += delta;
    draw(elapsed, (elapsed % 60000) / 60000);
  } else {
    elapsed = Math.max(0, elapsed - delta);
    draw(elapsed, countdownStart > 0 ? elapsed / countdownStart : 0);

    if (elapsed === 0) {
      pause();
    }
  }

  display.classList.toggle('warning', mode === 'countdown' && elapsed > 0 && elapsed <= 5000);
}

function draw(ms, percent) {
  updateDisplay(ms);
  const nextTickCount = Math.floor(Math.max(0, Math.min(1, percent)) * tickCount);
  if (nextTickCount !== currentTickCount) {
    tickElements.forEach((tick, index) => {
      tick.classList.toggle('active', index < nextTickCount);
    });
    currentTickCount = nextTickCount;
  }
}

function updateDisplay(ms) {
  const cs = Math.floor((ms % 1000) / 10);
  const s = Math.floor(ms / 1000) % 60;
  const m = Math.floor(ms / 60000) % 60;
  const h = Math.floor(ms / 3600000);

  display.textContent = `${pad(h)}:${pad(m)}:${pad(s)}.${pad(cs)}`;
}

function lap() {
  if (mode !== 'stopwatch' || !timer) return;

  lapsArray.unshift({
    label: `Lap ${lapsArray.length + 1}: `,
    time: display.textContent,
  });

  renderLaps();
  localStorage.setItem('laps', JSON.stringify(lapsArray));
}

function renderLaps() {
  lapsDiv.replaceChildren();
  lapsArray.forEach((lapEntry) => {
    const lapElement = document.createElement('div');
    if (typeof lapEntry === 'string') {
      lapElement.textContent = lapEntry;
    } else {
      const label = document.createElement('span');
      label.textContent = lapEntry.label;
      const time = document.createElement('span');
      time.textContent = lapEntry.time;
      lapElement.append(label, time);
    }
    lapsDiv.append(lapElement);
  });
}

function changeMode() {
  reset();
  mode = modeSelect.value;
  countdownInputs.style.display = mode === 'countdown' ? 'block' : 'none';
}

function pad(n) {
  return n.toString().padStart(2, '0');
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && !['INPUT', 'SELECT', 'BUTTON'].includes(e.target.tagName)) {
    e.preventDefault();
    timer ? pause() : start();
  }
  if (e.key.toLowerCase() === 'l') lap();
  if (e.key.toLowerCase() === 'r') reset();
});

const savedLaps = localStorage.getItem('laps');
if (savedLaps) {
  try {
    const parsedLaps = JSON.parse(savedLaps);
    if (Array.isArray(parsedLaps)) {
      lapsArray = parsedLaps.filter(
        (lapEntry) =>
          typeof lapEntry === 'string' ||
          (lapEntry !== null &&
            typeof lapEntry === 'object' &&
            typeof lapEntry.label === 'string' &&
            typeof lapEntry.time === 'string')
      );
    } else {
      localStorage.removeItem('laps');
    }
  } catch {
    localStorage.removeItem('laps');
  }
}
renderLaps();
