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
  const btns = document.querySelectorAll('.btn');

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

  btns.forEach((button) => {
    button.addEventListener('mousemove', function (e) {
      let rect = btn.getBoundingClientRect();
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;
      let numParticles = 20;

      for (let i = 0; i < numParticles; i++) {
        createParticle(x, y);
      }
    });
  });

  function createParticle(x, y) {
    let particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    let angle = Math.random() * 2 * Math.PI;
    let distance = Math.random() * 80 + 20;
    let tx = Math.cos(angle) * distance;
    let ty = Math.sin(angle) * distance;

    particle.style.setProperty('--tx', tx + 'px');
    particle.style.setProperty('--ty', ty + 'px');

    btns.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 1000);
  }

  function calculateConversions(gender, fromSystem, size) {
    const systems = ['us', 'uk', 'eu', 'cm', 'jp', 'au'];
    const results = {};

    // Get the base size in US for conversion
    let baseUS;
    switch (fromSystem) {
      case 'us':
        baseUS = size;
        break;
      case 'uk':
        baseUS = gender === 'women' ? size + 2 : size + 1;
        break;
      case 'eu':
        if (gender === 'women') {
          baseUS = (size - 30.5) / 0.85;
        } else if (gender === 'men') {
          baseUS = (size - 30.5) / 0.85;
        } else {
          baseUS = (size - 16) / 0.67;
        }
        break;
      case 'cm':
        baseUS = size * 0.3937 * 3 - 22;
        break;
      case 'jp':
        baseUS = (size - 18.5) / 0.85;
        break;
      case 'au':
        baseUS = gender === 'women' ? size + 2 : size + 1;
        break;
    }
  }
});
