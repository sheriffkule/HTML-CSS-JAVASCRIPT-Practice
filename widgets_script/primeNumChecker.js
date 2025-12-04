document.addEventListener('DOMContentLoaded', function () {
  const numberInput = document.getElementById('numberInput');
  const checkBtn = document.getElementById('checkBtn');
  const clearBtn = document.getElementById('clearBtn');
  const exampleBtn = document.getElementById('exampleBtn');
  const historyBtn = document.getElementById('historyBtn');
  const resultDiv = document.getElementById('result');
  const factorsDiv = document.getElementById('factors');
  const historyList = document.getElementById('historyList');

  let checkHistory = [];
  let historyVisible = true;

    numberInput.focus();

  function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;

    if (num % 2 === 0 || num % 3 === 0) return false;

    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }

    return true;
  }

  function getFactors(num) {
    const factors = [];
    for (let i = 1; i < Math.sqrt(num); i++) {
      if (num % i === 0) {
        factors.push(i);
        if (i !== num / i) {
          factors.push(num / i);
        }
      }
    }
    return factors.sort((a, b) => a - b);
  }

  function displayResult(num, prime) {
    resultDiv.textContent = `${num} is ${prime ? '' : 'not '} a prime number!`;
    resultDiv.className = prime ? 'result prime' : 'result not-prime';

    const factors = getFactors(num);
    factorsDiv.innerHTML = `<strong>Factors of ${num}:</strong> ${factors.join(', ')}`;

    addToHistory(num, prime, factors);

    resultDiv.classList.add('pulse');
    setTimeout(() => {
      resultDiv.classList.remove('pulse');
    }, 500);
  }

  function addToHistory(num, prime, factors) {
    checkHistory.unshift({ num, prime, factors });

    if (checkHistory.length > 10) {
      checkHistory.pop();
    }

    updateHistoryDisplay();
  }

  function updateHistoryDisplay() {
    if (checkHistory.length === 0) {
      historyList.innerHTML = '<p>Your checked numbers will appear here.</p>';
      return;
    }

    historyList.innerHTML = '';
    checkHistory.forEach((item) => {
      const historyItem = document.createElement('div');
      historyItem.className = 'history-item fade-in';
      historyItem.innerHTML = `
      <span>${item.num}</span>
      <span class="${item.prime ? 'prime-history' : ''}">${item.prime ? 'Prime' : 'Not Prime'}</span>
    `;
      historyList.appendChild(historyItem);
    });
  }

  checkBtn.addEventListener('click', function () {
    const num = parseInt(numberInput.value);

    if (isNaN(num) || num < 1) {
      alert('please enter a valid positive integer.');
        numberInput.focus();
      return;
    }

    const prime = isPrime(num);
    displayResult(num, prime);
  });

  clearBtn.addEventListener('click', function () {
    resultDiv.textContent = '';
    factorsDiv.textContent = '';
    checkHistory = [];
    updateHistoryDisplay();
    numberInput.value = '';
    numberInput.focus();
  });

  exampleBtn.addEventListener('click', function () {
    const examples = [2, 9, 17, 27, 7919, 2147483647];
    const randomExample = examples[Math.floor(Math.random() * examples.length)];
    numberInput.value = randomExample;

    const prime = isPrime(randomExample);
    displayResult(randomExample, prime);
  });

  historyBtn.addEventListener('click', function () {
    historyVisible = !historyVisible;
    const historySection = document.querySelector('.history-section');
    historySection.style.display = historyVisible ? 'block' : 'none';
  });

  numberInput.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
      checkBtn.click();
    }
  });

  document.getElementById('year').textContent = new Date().getFullYear();
});
