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
      resultDisplay.textContent = '-';
    });
  });

  calculateBtn.addEventListener('click', calculate);
  resetBtn.addEventListener('click', resetForm);
  copyBtn.addEventListener('click', copyResult);
  clearHistoryBtn.addEventListener('click', clearHistory);

  // Calculation function
  function calculate() {
    let a;
    let b;
    let c;
    let result;

    try {
      if (currentMode === 'find-hypotenuse') {
        a = parseFloat(document.getElementById('leg-a').value)
        b = parseFloat(document.getElementById('leg-b').value)

        if (isNaN(a) || isNaN(b)) {
          throw new Error('Please enter valid numbers for both legs.')
        }
        if (a<=0 ||b <= 0) {
          throw new Error('Lengths must be positive numbers')
        }

        c= Math.sqrt(a * a + b * b)
        result = {
          formula: `√(${a}² + ${b}²)`,
          result: c.toFixed(4),
          type: 'hypotenuse',
          values: {a, b, c}
        }
    } else {
      a = parseFloat(document.getElementById('known-leg').value)   
      c = parseFloat(document.getElementById('hypotenuse').value)   

      if (isNaN(a) || isNaN(c)) {
        throw new Error('Please enter valid numbers.')
      }
      if (a <= 0 || c <= 0) {
        throw new Error('Lengths must be positive numbers.')
      }
      if (a >= c) {
        throw new Error('Leg must be shorter than hypotenuse')
      }

      b = Math.sqrt(c * c - a * a)
      result = {
        formula: `√(${c}² + ${a}²)`,
          result: b.toFixed(4),
          type: 'leg',
          values: {a: a, b: b, c: c}
      }
    }
  }
});
