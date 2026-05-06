document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const generateBtn = document.getElementById('generateBtn');
  const clearBtn = document.getElementById('clearBtn');
  const copyBtn = document.getElementById('copyBtn');
  const saveTextBtn = document.getElementById('saveTxtBtn');
  const toggleThemeBtn = document.getElementById('toggleThemeBtn');

  const sequenceLengthInput = document.getElementById('sequenceLength');
  const firstNumberInput = document.getElementById('firstNumber');
  const secondNumberInput = document.getElementById('secondNumber');

  const fibonacciSequenceElement = document.getElementById('fibonacciSequence');
  const sequenceLengthValueElement = document.getElementById('sequenceLengthValue');
  const sequenceSumElement = document.getElementById('sequenceSum');
  const generationTimeElement = document.getElementById('generationTime');

  let isDarkTheme = true;

  // Generate Fibonacci sequence
  function generateFibonacciSequence() {
    const startTime = performance.now();

    const length = parseInt(sequenceLengthInput.value);
    let first = parseInt(firstNumberInput.value);
    let second = parseInt(secondNumberInput.value);

    if (isNaN(length) || length < 1 || length > 100) {
      alert('Please enter a valid sequence length between 1 and 100');
      return;
    }

    if (isNaN(first)) first = 0;
    if (isNaN(second)) second = 0;

    let sequence = [first, second];
    let sum = first + second;

    for (let i = 2; i < length; i++) {
      const nextNumber = sequence[i - 1] + sequence[i - 2];
      sequence.push(nextNumber);
      sum += nextNumber;
    }

    // Display the sequence
    fibonacciSequenceElement.innerHTML = sequence
      .map((num, index) => `<span>F<sub>${index}</sub> = ${num}</span>`)
      .join('<br>');

    // Update stats
    sequenceLengthValueElement.textContent = length;
    sequenceSumElement.textContent = sum.toLocaleString();

    // Calculate generation time
    const endTime = performance.now();
    generationTimeElement.textContent = `Generated in ${(endTime - startTime).toFixed(2)} milliseconds`;
  }

  // Clear results
  function clearResults() {
    fibonacciSequenceElement.innerHTML = '';
    sequenceLengthValueElement.textContent = '0';
    sequenceSumElement.textContent = '0';
    generationTimeElement.textContent = '';
  }

  // Copy to clipboard
  function copyToClipboard() {
    if (!fibonacciSequenceElement.textContent) {
      alert('No sequence to copy!');
      return;
    }

    const sequenceText = Array.from(fibonacciSequenceElement.querySelectorAll('span'))
      .map((span) => span.textContent)
      .join('\n');

    navigator.clipboard
      .writeText(sequenceText)
      .then(() => {
        alert('Sequence copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  }

  // Save as text file
  function saveAsTextFile() {
    if (!fibonacciSequenceElement.textContent) {
      alert('No sequence to save!');
      return;
    }

    const sequenceText = Array.from(fibonacciSequenceElement.querySelectorAll('span'))
      .map((span) => span.textContent)
      .join('\n');

    const blob = new Blob([sequenceText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'fibonacci_sequence.txt';
    document.body.appendChild(a);
    a.click();

    // Clean up
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  }

  // Toggle theme
  function toggleTheme() {
    isDarkTheme = !isDarkTheme;

    if (isDarkTheme) {
      document.body.style.background = 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)';
      document.body.style.color = '#fff';
      toggleThemeBtn.innerHTML = '<i class="fas fa-moon"></i> Toggle Theme';
    } else {
      document.body.style.background = 'linear-gradient(135deg, #b21f1f, #fdbb2d, #1a2a6c)';
      document.body.style.color = '#333';
      toggleThemeBtn.innerHTML = '<i class="fas fa-sun"></i> Toggle Theme';
    }
  }

  // Event listeners
  generateBtn.addEventListener('click', generateFibonacciSequence);
  clearBtn.addEventListener('click', clearResults);
  copyBtn.addEventListener('click', copyToClipboard);
  saveTextBtn.addEventListener('click', saveAsTextFile);
  toggleThemeBtn.addEventListener('click', toggleTheme);

  // Generate sequence on load
  generateFibonacciSequence();
});

// Update year in footer
function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');

  if (!yearElement) {
    console.error('Year element not found');
    return;
  }

  yearElement.setAttribute('datetime', currentYear.toString());
  yearElement.textContent = currentYear.toString();
}
updateYear();
