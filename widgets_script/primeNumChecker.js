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
});
