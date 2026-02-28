document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const ratioToggle = document.getElementById('ratio-toggle');
  const amountToggle = document.getElementById('amount-toggle');
  const ratioInputSection = document.getElementById('ratio-input-section');
  const amountInputSection = document.getElementById('amount-input-section');
  const calculateBtn = document.getElementById('calculate-btn');
  const calculateAmountBtn = document.getElementById('calculate-amount-btn');
  const coffeeAmountInput = document.getElementById('coffee-amount');
  const coffeeUnitSelect = document.getElementById('coffee-unit');
  const ratioSlider = document.getElementById('ratio-slider');
  const ratioInput = document.getElementById('ratio-input');
  const ratioSliderAmount = document.getElementById('ratio-slider-amount');
  const ratioInputAmount = document.getElementById('ratio-input-amount');
  const totalWaterInput = document.getElementById('total-water');
  const waterUnitSelect = document.getElementById('water-unit');
  const waterResult = document.getElementById('water-result');
  const coffeeResult = document.getElementById('coffee-result');
  const methodBtns = document.querySelectorAll('.method-btn');
  const methodBtnsAmount = document.querySelectorAll('#amount-input-section .method-btn');

  // Toggle between ratio and amount calculation
  ratioToggle.addEventListener('click', function () {
    ratioToggle.classList.add('active');
    amountToggle.classList.remove('active');
    ratioInputSection.style.display = 'block';
    amountInputSection.style.display = 'none';
  });

  amountToggle.addEventListener('click', function () {
    ratioToggle.classList.remove('active');
    amountToggle.classList.add('active');
    ratioInputSection.style.display = 'none';
    amountInputSection.style.display = 'block';
  });

  // Sync ratio slider and input
  ratioSlider.addEventListener('input', function () {
    ratioInput.value = this.value;
  });

  ratioInput.addEventListener('input', function () {
    ratioSlider.value = this.value;
  });

  ratioSliderAmount.addEventListener('input', function () {
    ratioInputAmount.value = this.value;
  });

  ratioInputAmount.addEventListener('input', function () {
    ratioSliderAmount.value = this.value;
  });

  // Predefined ratio buttons
  methodBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      methodBtns.forEach((b) => b.classList.remove('active'));
      this.classList.add('active');
      const ratio = parseFloat(this.dataset.ratio);
      ratioSlider.value = ratio;
      ratioInput.value = ratio;
    });
  });

  methodBtnsAmount.forEach((btn) => {
    btn.addEventListener('click', function () {
      methodBtnsAmount.forEach((b) => b.classList.remove('active'));
      this.classList.add('active');
      const ratio = parseFloat(this.dataset.ratio);
      ratioSliderAmount.value = ratio;
      ratioInputAmount.value = ratio;
    });
  });

  // Calculate water needed based on coffee amount
  calculateBtn.addEventListener('click', function () {
    const coffeeAmount = parseFloat(coffeeAmountInput.value);
    const coffeeUnit = coffeeUnitSelect.value;
    const ratio = parseFloat(ratioInput.value);

    if (isNaN(coffeeAmount)) {
      alert('Please enter a valid coffee amount!');
      return;
    }

    // Convert coffee amount to grams for calculation
    let coffeeGrams;
    switch (coffeeUnit) {
      case 'g':
        coffeeGrams = coffeeAmount;
        break;
      case 'oz':
        coffeeGrams = coffeeAmount * 28.35;
        break;
      case 'tbsp':
        coffeeGrams = coffeeAmount * 5;
        break;
    }

    const waterMl = coffeeGrams * ratio;

    // Display results
    waterResult.innerHTML = `${waterMl.toFixed(1)}<span class="result-unit">ml</span>`;
    coffeeResult.innerHTML = `${coffeeGrams.toFixed(1)}<span class="result-unit">g</span>`;
  });

  // Calculate coffee needed based on water amount
  calculateAmountBtn.addEventListener('click', function () {
    const waterAmount = parseFloat(totalWaterInput.value);
    const waterUnit = waterUnitSelect.value;
    const ratio = parseFloat(ratioInputAmount.value);

    if (isNaN(waterAmount)) {
      alert('Please enter a valid water amount!');
      return;
    }

    // Convert water amount to ml for calculation
    let waterMl;
    switch (waterUnit) {
      case 'ml':
        waterMl = waterAmount;
        break;
      case 'oz':
        waterMl = waterAmount * 29.574;
        break;
      case 'cup':
        waterMl = waterAmount * 236.588;
        break;
    }

    const coffeeGrams = waterMl / ratio;

    // Display results
    waterResult.innerHTML = `${waterMl.toFixed(1)}<span class="result-unit">ml</span>`;
    coffeeResult.innerHTML = `${coffeeGrams.toFixed(1)}<span class="result-unit">g</span>`;
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
});
