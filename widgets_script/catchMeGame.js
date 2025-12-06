const playArea = document.getElementById('playArea');
const catcher = document.getElementById('catcher');
const scoreEl = document.getElementById('score');
const levelEl = document.getElementById('level');
const timerEl = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const themeBtn = document.getElementById('themeBtn');
const startTimerInput = document.getElementById('startTimer');
const startTimerLabel = document.getElementById('startTimerLabel');
const escapeRange = document.getElementById('escapeRange');
const escapeLabel = document.getElementById('escapeLabel');
const bestEl = document.getElementById('best');

let score = 0;
let level = 1;
let timeLeft = parseInt(startTimerInput.value);
let timerInterval = null;
let running = false;
let escapeDistance = parseInt(escapeRange.value);

let best = parseInt(localStorage.getItem('cm_best') || '0');
bestEl.textContent = best;

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function randomPosition(size) {
  const rect = playArea.getBoundingClientRect();
  const x = Math.random() * (rect.width - size) + size * 0.5;
  const y = Math.random() * (rect.height - size) + size * 0.5;
  return { x, y };
}

function moveCatcherTo(x, y) {
  const rect = playArea.getBoundingClientRect();
  const btnRect = catcher.getBoundingClientRect();
  const left = clamp(x - btnRect.width * 0.5, 6, rect.width - btnRect.width - 6);
  const top = clamp(y - btnRect.height * 0.5, 6, rect.height - btnRect.height - 6);
  catcher.style.left = left + 'px';
  catcher.style.top = top + 'px';
  catcher.style.transform = 'none';
}

function centerCatcher() {
  const rect = playArea.getBoundingClientRect();
  moveCatcherTo(rect.width * 0.5, rect.height * 0.5);
}

window.addEventListener('resize', () => {
  centerCatcher();
});

playArea.addEventListener('mousemove', (e) => {
  if (!running) return;
  const rect = playArea.getBoundingClientRect();
  const bx = catcher.offsetLeft + catcher.offsetWidth * 0.5;
  const by = catcher.offsetTop + catcher.offsetHeight * 0.5;
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;
  const dx = bx - mx;
  const dy = by - my;
  const dist = Math.hypot(dx, dy);
  if (dist < escapeDistance) {
    const strength = (escapeDistance - dist) / escapeDistance;
    const fleeX = bx + (dx / dist || 0) * (120 + 200 * strength) + (Math.random() - 0.5) * 80;
    const fleeY = bx + (dx / dist || 0) * (120 + 200 * strength) + (Math.random() - 0.5) * 80;
    moveCatcherTo(fleeX, fleeY);
  }
});

catcher.addEventListener('click', () => {
  if (!running) return;
  score += 1;
  scoreEl.textContent = score;
  timeLeft += Math.max(0, 1 + Math.floor(level / 3));
  timerEl.textContent = timeLeft;
  const pos = randomPosition(catcher.offsetWidth);
  moveCatcherTo(pos.x, pos.y);
  if (score > 0 && score % 7 === 0) {
    level += 1;
    levelEl.textContent = level;
    escapeDistance = clamp(escapeDistance - 10, 40, 260);
    escapeRange.value = escapeDistance;
    escapeLabel.textContent = escapeDistance;
  }
  if (score > best) {
    best = score;
    localStorage.setItem('cm_best', String(best));
    bestEl.textContent = best;
  }
});
