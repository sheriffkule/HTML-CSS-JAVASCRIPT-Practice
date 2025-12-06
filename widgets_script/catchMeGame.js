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
