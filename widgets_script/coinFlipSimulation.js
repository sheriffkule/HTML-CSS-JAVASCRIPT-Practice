window.addEventListener('DOMContentLoaded', function () {
  const coin = document.getElementById('coin');
  const flipBtn = document.getElementById('flip-btn');
  const resetBtn = document.getElementById('resetBtn');
  const totalFlipsEl = document.getElementById('total-flips');
  const headsCountEl = document.getElementById('heads-count');
  const tailsCountEl = document.getElementById('tails-count');
  const headsPercentEl = document.getElementById('heads-percent');
  const historyList = document.getElementById('history-list');

  let totalFlips = 0;
  let headsCount = 0;
  let tailsCount = 0;
  let isFlipping = false;

  // Load data from localStorage if available
  if (localStorage.getItem('coinFlipData')) {
    const data = JSON.parse(localStorage.getItem('coinFlipData'));
    totalFlips = data.totalFlips;
    headsCount = data.headsCount;
    tailsCount = data.tailsCount;
    updateDisplay();

    // Load history
    if (data.history) {
      data.history.forEach((result) => {
        addToHistory(result);
      });
    }
  }
});
