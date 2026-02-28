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
  const totalUnitSelect = document.getElementById('water-unit');
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
});
