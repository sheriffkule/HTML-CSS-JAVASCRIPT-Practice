const levels = [
  ['fun', 'sky', 'sun', 'cat', 'dog', 'red', 'big', 'run', 'eat', 'car', 'hat', 'box', 'cup', 'pen', 'bag'],
  [
    'blue',
    'game',
    'play',
    'jump',
    'walk',
    'book',
    'tree',
    'fish',
    'bird',
    'moon',
    'star',
    'door',
    'hand',
    'foot',
    'head',
  ],
  [
    'happy',
    'water',
    'house',
    'green',
    'smile',
    'music',
    'dance',
    'light',
    'phone',
    'chair',
    'table',
    'paper',
    'money',
    'world',
    'heart',
  ],
  [
    'computer',
    'keyboard',
    'function',
    'variable',
    'programming',
    'algorithm',
    'javascript',
    'developer',
    'technology',
    'application',
    'framework',
    'database',
    'interface',
    'responsive',
    'optimization',
  ],
];

let currentWord = '';
let currentLevel = 0;
let score = 0;
let timeLeft = 60;
let timeInterval;

// Shuffle Letters
function shuffleWord(word) {
  return word
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
}

// Start new word without resetting the timer
function newWord() {
  const wordList = levels[currentLevel];
  if (!wordList) return;
  currentWord = wordList[Math.floor(Math.random() * wordList.length)];
  let scrambled = shuffleWord(currentWord);
  while (scrambled === currentWord) scrambled = shuffleWord(currentWord);
  // Update UI: show scrambled word, clear input and message
  const scrambledEl = document.getElementById('scrambledWord');
  if (scrambledEl) scrambledEl.textContent = scrambled;
  const inputEl = document.getElementById('guessInput');
  if (inputEl) inputEl.value = '';
  const msgEl = document.getElementById('message');
  if (msgEl) msgEl.textContent = '';
}

// Timer function
function startTimer() {
  if (timeInterval) return; // Prevent multiple intervals
  timeInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').textContent = `Time: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timeInterval);
      timeInterval = null;
      resetGame();
    }
  }, 1000);
}

// Reset score and level when time runs out
function resetGame() {
  document.getElementById('message').textContent = `Time's up! Game reset.`;
  score = 0;
  currentLevel = 0;
  timeLeft = 30;
  document.getElementById('score').textContent = `Score: ${score}`;
  document.getElementById('level').textContent = `Level: ${currentLevel + 1}`;
  document.getElementById('timer').textContent = `Time: ${timeLeft}s`;
  setTimeout(() => {
    newWord();
    startTimer();
  }, 2000);
}

// Check the player's guess
function checkGuess() {
  const guess = document.getElementById('guessInput').value.toLowerCase();
  if (guess === currentWord) {
    score += 10;
    timeLeft += 5;
    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('timer').textContent = `Time: ${timeLeft}s`;
    document.getElementById('message').textContent = '☑ Correct! + 5 seconds!';
    launchConfetti();
    nextLevelOrWord();
  } else {
    document.getElementById('message').textContent = 'X Try again!';
  }
}

// Handle level progression
function nextLevelOrWord() {
  if (score >= (currentLevel + 1) * 40) {
    currentLevel++;
    if (currentLevel >= levels.length) {
      document.getElementById('message').textContent = `You completed all levels! Final Score: ${score}`;
      document.getElementById('level').textContent = `Level: Max`;
      document.getElementById('scrambledWord').textContent = '';
      clearInterval(timeInterval);
      timeInterval = null;
      return;
    } else {
      document.getElementById('level').textContent = `Level: ${currentLevel + 1}`;
    }
  }
  newWord();
}

// Confetti effect
function launchConfetti() {
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      confetti.style.left = Math.random() * window.innerWidth + 'px';
      confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      confetti.style.animationDuration = Math.random() * 0.6 + 1.4 + 's';
      confetti.style.width = Math.random() * 10 + 10 + 'px';
      confetti.style.height = Math.random() * 10 + 10 + 'px';
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 1500);
    }, Math.random() * 200);
  }
}

// Event listeners
document.getElementById('checkBtn').addEventListener('click', checkGuess);
document.getElementById('newWordBtn').addEventListener('click', newWord);
document.getElementById('guessInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') checkGuess();
});

// Initialize game
document.getElementById('level').textContent = `Level: ${currentLevel + 1}`;
document.getElementById('score').textContent = `Score: ${score}`;
document.getElementById('timer').textContent = `Time: ${timeLeft}s`;
newWord();
startTimer();
