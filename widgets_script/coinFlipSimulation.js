window.addEventListener('DOMContentLoaded', function () {
  const coin = document.getElementById('coin');
  const flipBtn = document.getElementById('flip-btn');
  const resetBtn = document.getElementById('reset-btn');
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

  flipBtn.addEventListener('click', flipCoin);

  resetBtn.addEventListener('click', function () {
    if (confirm('Are you sure you want to reset all statistics?')) {
      totalFlips = 0;
      headsCount = 0;
      tailsCount = 0;
      historyList.innerHTML = '';
      updateDisplay();
      saveData();
    }
  });

  function flipCoin() {
    if (isFlipping) return;

    isFlipping = true;
    coin.classList.add('flipping');

    // Disable button during flip
    flipBtn.disabled = true;

    // Random result (true for heads, false for tails)
    const isHead = Math.random() > 0.5;

    setTimeout(() => {
      coin.classList.remove('flipping');

      isHead ? (coin.style.transform = 'rotateY(0deg)') : (coin.style.transform = 'rotateY(180deg)');

      // Update stats
      totalFlips++;
      isHead ? headsCount++ : tailsCount++;

      updateDisplay();
      addToHistory(isHead ? 'Heads' : 'Tails');
      saveData();

      isFlipping = false;
      flipBtn.disabled = false;
    }, 1500);
  }

  function updateDisplay() {
    totalFlipsEl.textContent = totalFlips;
    headsCountEl.textContent = headsCount;
    tailsCountEl.textContent = tailsCount;

    const headsPercent = totalFlips > 0 ? ((headsCount / totalFlips) * 100).toFixed(1) : 0;
    headsPercentEl.textContent = `${headsPercent}%`;
  }

  function addToHistory(result) {
    const historyItem = document.createElement('div');
    historyItem.classList.add('history-item');
    historyItem.classList.add(result === 'Heads' ? 'heads-bg' : 'tails-bg');

    const resultText = document.createElement('span');
    resultText.textContent = result;
    resultText.style.fontWeight = 'bold';
    resultText.style.color = result === 'Heads' ? '#dfbd00' : '#6c5ce7';

    const flipCount = document.createElement('span');
    flipCount.classList.add('flip-count');
    flipCount.textContent = `${totalFlips + 1}`;

    historyItem.appendChild(resultText);
    historyItem.appendChild(flipCount);

    historyList.firstChild
      ? historyList.insertBefore(historyItem, historyList.firstChild)
      : historyList.appendChild(historyItem);

    // Limit history to 50 items
    if (historyList.children.length > 50) historyList.removeChild(historyList.lastChild);
  }

  function saveData() {
    const history = [];
    const historyItems = historyList.querySelectorAll('.history-item');

    historyItems.forEach((item) => {
      const result = item.querySelector('span').textContent;
      history.push(result);
    });

    const data = {
      totalFlips,
      headsCount,
      tailsCount,
      history,
    };

    localStorage.setItem('coinFlipData', JSON.stringify(data));
  }
});
