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
        a = parseFloat(document.getElementById('leg-a').value);
        b = parseFloat(document.getElementById('leg-b').value);

        if (isNaN(a) || isNaN(b)) {
          throw new Error('Please enter valid numbers for both legs.');
        }
        if (a <= 0 || b <= 0) {
          throw new Error('Lengths must be positive numbers');
        }

        c = Math.sqrt(a * a + b * b);
        result = {
          formula: `√(${a}² + ${b}²)`,
          result: c.toFixed(4),
          type: 'hypotenuse',
          values: { a, b, c },
        };
      } else {
        a = parseFloat(document.getElementById('known-leg').value);
        c = parseFloat(document.getElementById('hypotenuse').value);

        if (isNaN(a) || isNaN(c)) {
          throw new Error('Please enter valid numbers.');
        }
        if (a <= 0 || c <= 0) {
          throw new Error('Lengths must be positive numbers.');
        }
        if (a >= c) {
          throw new Error('Leg must be shorter than hypotenuse');
        }

        b = Math.sqrt(c * c - a * a);
        result = {
          formula: `√(${c}² + ${a}²)`,
          result: b.toFixed(4),
          type: 'leg',
          values: { a: a, b: b, c: c },
        };
      }

      // Display result
      resultDisplay.textContent = result.result;

      // Draw triangle
      drawTriangle(result.values.a, result.values.b, result.values.c);

      // Save to history
      addToHistory(result);
    } catch (error) {
      alert(error.message);
    }
  }

  // Reset form
  function resetForm() {
    document.querySelectorAll('input').forEach((input) => {
      input.value = '';
    });
    resultDisplay.textContent = '-';

    // Reset to default triangle
    drawTriangle(3, 4, 5);
  }

  // Copy result to clipboard
  function copyResult() {
    if (resultDisplay === '-') return;

    navigator.clipboard.writeText(resultDisplay.textContent).then(() => {
      const originalIcon = copyBtn.innerHTML;
      copyBtn.innerHTML = '<i class="fas fa-check"></i>';
      setTimeout(() => {
        copyBtn.innerHTML = originalIcon;
      }, 2000);
    });
  }

  // History functions
  function addToHistory(calculation) {
    let history = JSON.parse(localStorage.getItem('pythagoreanHistory')) || [];

    const historyItem = {
      formula: calculation.formula,
      result: calculation.result,
      type: calculation.type,
      values: calculation.values,
      timestamp: new Date().toISOString(),
    };

    history.unshift(historyItem);
    if (history.length > 10) history = history.slice(0, 10);

    localStorage.setItem('pythagoreanHistory', JSON.stringify(history));
    loadHistory();
  }

  function loadHistory() {
    const history = JSON.parse(localStorage.getItem('pythagoreanHistory')) || [];
    historyList.innerHTML = '';

    if (history.length === 0) {
      historyList.innerHTML = '<div class="history-item empty">No calculations yet.</div>';
      return;
    }

    history.forEach((item) => {
      const historyItem = document.createElement('div');
      historyItem.className = 'history-item';

      const date = new Date(item.timestamp);
      const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      historyItem.innerHTML = `
        <div>
          <div class="formula">${item.formula}</div>
          <div class="timestamp">${timeString}</div>
        </div>
        <div class="result">${item.result}</div>
      `;

      historyList.appendChild(historyItem);
    });
  }

  function clearHistory() {
    if (confirm('Are you sure you want to clear all history?')) {
      localStorage.removeItem('pythagoreanHistory');
      loadHistory();
    }
  }

  // Draw triangle visualization
  function drawTriangle(a, b, c) {
    // Clear previous drawing
    triangleSvg.innerHTML = '';

    // Scale the triangle to fit the SVG viewBox (200x150)
    const scale = 30; // Scale factor
    const offsetX = 30;
    const offsetY = 120;

    // Calculate scaled coordinates
    const scaledA = a * scale;
    const scaledB = b * scale;
    const scaledC = c * scale;

    // Determine which is the longer leg for visualization
    let x1;
    let y1;
    let x2;
    let y2;
    let x3;
    let y3;

    if (a >= b) {
      // a is the horizontal leg, b is vertical
      x1 = offsetX;
      y1 = offsetY;
      x2 = offsetX + scaledA;
      y2 = offsetY;
      x3 = offsetX;
      y3 = offsetY = scaledB;
    }
  }
});
