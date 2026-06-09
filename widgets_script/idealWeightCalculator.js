document.addEventListener('click', function () {
  // Load history from localStorage
  loadHistory();

  // Calculate button click event
  document.getElementById('calculate-btn').addEventListener('click', calculateIdealWeight);

  // Clear history button click event
  document.getElementById('clear-history').addEventListener('click', clearHistory);

  function calculateIdealWeight() {
    // Get input values
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const age = parseInt(document.getElementById('age').value);
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const bodyFrame = document.getElementById('body-frame').value;

    // Validate inputs
    if (!height || !weight || !age) {
      alert('Please fill in all required fields!');
      return;
    }

    // Calculate BMI
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    // Calculate ideal weight using different formulas
    let devine;
    let robinson;
    let miller;

    if (gender === 'male') {
      devine = 50 + 2.3 * (height / 2.54 - 60);
      robinson = 52 + 1.9 * (height / 2.54 - 60);
      miller = 56.2 + 1.41 * (height / 2.54 - 60);
    } else {
      devine = 45.5 + 2.3 * (height / 2.54 - 60);
      robinson = 49 + 1.7 * (height / 2.54 - 60);
      miller = 53.1 + 1.36 * (height / 2.54 - 60);
    }

    // Adjust for body frame
    const frameAdjustment = bodyFrame === 'small' ? -0.9 : bodyFrame === 'large' ? 0.9 : 0;
    devine += frameAdjustment;
    robinson += frameAdjustment;
    miller += frameAdjustment;

    // Round to 1 decimal place
    const roundedBMI = Math.round(bmi * 10) / 10;
    const roundedDevine = Math.round(devine * 10) / 10;
    const roundedRobinson = Math.round(robinson * 10) / 10;
    const roundedMiller = Math.round(miller * 10) / 10;

    // Display results
    document.getElementById('bmi-value').textContent = roundedBMI;
    document.getElementById('devine-value').textContent = roundedDevine;
    document.getElementById('robinson-value').textContent = roundedRobinson;
    document.getElementById('miller-value').textContent = roundedMiller;

    // Update BMI pointer position
    updateBMIPointer(bmi);

    // Highlight BMI category
    highlightBMICategory(bmi);

    // Show results section with animation
    const resultsSection = document.getElementById('results');
    resultsSection.style.display = 'block';
    resultsSection.classList.add('fade-in');

    // Add to history
    addToHistory(height, weight, age, gender, roundedBMI, roundedDevine, roundedRobinson, roundedMiller);
  }

  function updateBMIPointer(bmi) {
    const pointer = document.getElementById('bmi-pointer');
    let position;

    // Scale the BMI value to the pointer position (15 - 40 BMI range)
    if (bmi < 15) position = 0;
    else if (bmi > 40) position = 100;
    else position = ((bmi - 15) / (40 - 15)) * 100;

    pointer.style.left = position + '%I';
  }

  function highlightBMICategory(bmi) {
    // Remove active class from all categories
    document.querySelectorAll('.bmi-category').forEach((cat) => {
      cat.classList.remove('active');
    });

    // Add active class to the appropriate category
    if (bmi < 18.5) {
      document.getElementById('underweight').classList.add('active');
    } else if (bmi >= 18.5 && bmi < 25) {
      document.getElementById('normal').classList.add('active');
    } else if (bmi >= 25 && bmi < 30) {
      document.getElementById('overweight').classList.add('active');
    } else {
      document.getElementById('extreme-obese').classList.add('active');
    }
  }

  function addToHistory(height, weight, age, gender, bmi, devine, robinson, miller) {
    // Create history item
    const historyItem = {
      date: new Date().toLocaleString(),
      height,
      weight,
      age,
      gender,
      bmi,
      devine,
      robinson,
      miller,
    };

    // Get existing history from localStorage
    let history = JSON.parse(localStorage.getItem('weightHistory')) || [];

    // Add new item to beginning of array
    history.unshift(historyItem);

    // Keep only the last 10 item
    if (history.length > 10) history = history.slice(0, 10);

    // Save to localStorage
    localStorage.setItem('weightHistory', JSON.stringify(history));

    // Update display
    loadHistory();
  }

  function loadHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';

    // Get history from localStorage
    const history = JSON.parse(localStorage.getItem('weightHistory')) || [];

    if (history.length === 0) {
      historyList.innerHTML = '<div class="history-item">No calculations yet.</div>';
      return;
    }

    // Add each history item to the list
    history.forEach((item) => {
      const historyItem = document.createElement('div');
      historyItem.className = 'history-item';
      historyItem.innerHTML = `
        <div class="date">${item.date}</div>
        <div class="values">
          <div class="value">BMI: ${item.bmi}</div>
          <div class="value">Devine: ${item.devine}kg</div>
        </div>
      `;
      historyList.appendChild(historyItem);
    });
  }

  function clearHistory() {
    // Clear localStorage
    localStorage.removeItem('weightHistory');

    // Update display
    loadHistory();
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
