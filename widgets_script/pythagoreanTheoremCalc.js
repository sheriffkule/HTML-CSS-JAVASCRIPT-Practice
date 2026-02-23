document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const modeButtons = document.querySelectorAll('.mode-btn');
  const hypotenuseInputs = document.getElementById('hypotenuse-inputs');
  const legInputs = document.getElementById('leg-inputs');
  const calculateBtn = document.getElementById('calculate-btn');
  const resetBtn = document.getElementById('reset-btn');
  const resultDisplay = document.getElementById('result');
  const formulaText = document.getElementById('formula-text');
  const copyBtn = document.getElementById('copy-btn');
  const historyList = document.getElementById('history-list');
  const clearHistoryBtn = document.getElementById('clear-history');
  const triangleSvg = document.getElementById('triangle-svg');
  const labelA = document.getElementById('label-a');
  const labelB = document.getElementById('label-b');
  const labelC = document.getElementById('label-c');
  const rootStyles = getComputedStyle(document.documentElement);
  const primaryColor = rootStyles.getPropertyValue('--primary').trim();

  // Current mode (find-hypotenuse or find-leg)
  let currentMode = 'find-hypotenuse';

  // Initialize
  loadHistory();
  drawTriangle(3, 4, 5); // Default triangle

  // Event listeners
  modeButtons.forEach((button) => {
    button.addEventListener('click', function () {
      // Update active button
      modeButtons.forEach((btn) => btn.classList.remove('active'));
      this.classList.add('active');

      // Update mode
      currentMode = this.dataset.mode;

      // Toggle input sections
      if (currentMode === 'find-hypotenuse') {
        hypotenuseInputs.classList.remove('hidden');
        legInputs.classList.add('hidden');
        formulaText.textContent = 'a² + b² = c²';
      } else {
        hypotenuseInputs.classList.add('hidden');
        legInputs.classList.remove('hidden');
        formulaText.textContent = 'c² + a² = b²';
      }

      // Clear result
      resultDisplay.textContent = '-'
    });
  });

  calculateBtn.addEventListener('click', calculate)
  resetBtn.addEventListener('click', resetForm)
  copyBtn.addEventListener('click', copyResult)
  clearHistoryBtn.addEventListener('click', clearHistory)
});
