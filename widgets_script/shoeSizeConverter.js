document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const genderBtns = document.querySelectorAll('.gender-btn');
  const fromSystem = document.getElementById('from-system');
  const sizeInput = document.getElementById('size-input');
  const convertBtn = document.getElementById('convert-btn');
  const resultSection = document.getElementById('result-section');
  const resultGrid = document.getElementById('result-grid');
  const sizeChartBtn = document.getElementById('size-chart-btn');
  const sizeChartSection = document.getElementById('size-chart-section');
  const sizeChartContent = document.getElementById('size-chart-content');

  // Current state
  let currentGender = 'men';
  let sizeCharts = {
    men: generateSizeChart('men'),
    women: generateSizeChart('women'),
    kid: generateSizeChart('kids'),
  };

  // Initialize
  updateSizeChartDisplay();

  // Event listeners
  genderBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      genderBtns.forEach((b) => b.classList.remove('active'));
      this.classList.add('active');
      currentGender = this.dataset.gender;
      updateSizeChartDisplay();
    });
  });

  convertBtn.addEventListener('click', convertSize);
  sizeChartBtn.addEventListener('click', toggleSizeChart);

  sizeInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      convertSize();
    }
  });

  // Functions
  function convertSize() {
    const from = fromSystem.value;
    const size = parseFloat(sizeInput.value);

    if (isNaN(size)) {
      alert('Please enter a valid shoe size!');
      return;
    }

    const results = calculateConversions(currentGender, from, size);
    displayResults(results);
  }
});
