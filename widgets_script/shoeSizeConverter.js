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
    kids: generateSizeChart('kids'),
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
      let rect = button.getBoundingClientRect();
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;
      let numParticles = 20;

      for (let i = 0; i < numParticles; i++) {
        createParticle(x, y, button);
      }
    });
  });

  function createParticle(x, y, button) {
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

    button.appendChild(particle);

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

    // Convert baseUS to all other systems
    systems.forEach((sys) => {
      if (sys === fromSystem) {
        results[sys] = size;
        return;
      }

      switch (sys) {
        case 'us':
          results[sys] = baseUS;
          break;
        case 'uk':
          results[sys] = gender === 'women' ? baseUS - 2 : baseUS - 1;
          break;
        case 'eu':
          if (gender === 'women' || gender === 'men') {
            results[sys] = 30.5 + 0.85 * baseUS;
          } else {
            results[sys] = 16 + 0.67 * baseUS;
          }
          break;
        case 'cm':
          results[sys] = (baseUS + 22) / 3 / 0.3937;
          break;
        case 'jp':
          results[sys] = 18.5 + 0.85 * baseUS;
          break;
        case 'au':
          results[sys] = gender === 'women' ? baseUS - 2 : baseUS - 1;
          break;
      }

      // Round to nearest 0.5 for most systems, whole number for EU and CM
      if (sys === 'eu' || sys === 'cm' || sys === 'jp') {
        results[sys] = Math.round(results[sys]);
      } else {
        results[sys] = Math.round(results[sys] * 2) / 2;
      }
    });

    return results;
  }

  function displayResults(results) {
    resultGrid.innerHTML = '';

    for (const [system, size] of Object.entries(results)) {
      const systemName = {
        us: 'US',
        uk: 'UK',
        eu: 'EU',
        cm: 'CM',
        jp: 'JP',
        au: 'AU',
      }[system];

      const item = document.createElement('div');
      item.className = 'result-item';
      item.innerHTML = `
        <div class="result-system">${systemName}</div>
        <div class="result-size">${size}</div>
      `;
      resultGrid.appendChild(item);
    }

    resultSection.classList.add('active');
  }

  function toggleSizeChart() {
    sizeChartSection.classList.toggle('active');
    sizeChartBtn.innerHTML = sizeChartSection.classList.contains('active')
      ? '<i class ="fas fa-times"></i> Hide Size Chart'
      : '<i class ="fas fa-table"></i> Show Size Chart';
  }

  function updateSizeChartDisplay() {
    sizeChartContent.innerHTML = sizeCharts[currentGender];
  }

  function generateSizeChart(gender) {
    const sizes = [];
    const startSize = gender === 'kids' ? 0.5 : 5;
    const endSize = gender === 'kids' ? 13.5 : 15;
    const step = 0.5;

    // Generate sizes array
    for (let i = startSize; i <= endSize; i += step) {
      sizes.push(i);
    }

    // Create table HTML
    let html = '<table><thead><tr>';
    const systems = ['US', 'UK', 'EU', 'CM', 'JP'];
    if (gender !== 'kids') systems.push('AU');

    systems.forEach((sys) => {
      html += `<th>${sys}</th>`;
    });
    html += '</tr></thead><tbody>';

    sizes.forEach((size) => {
      const results = calculateConversions(gender, 'us', size);
      html += '<tr>';

      html += `<td>${size}</td>`;
      html += `<td>${gender === 'women' ? results.uk - 1 : results.uk}</td>`;
      html += `<td>${results.eu}</td>`;
      html += `<td>${results.cm}</td>`;
      html += `<td>${results.jp}</td>`;
      if (gender !== 'kids') {
        html += `<td>${gender === 'women' ? results.au - 1 : results.au}</td>`;
      }

      html += '</tr>';
    });

    html += '</tbody></table>';
    return html;
  }

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
