document.addEventListener('DOMContentLoaded', function () {
  const calculateBtn = document.getElementById('calculate-btn');
  const resultsCard = document.getElementById('results-card');
  const tipsSection = document.getElementById('tips-section');
  const initialState = document.getElementById('initial-state');
  const tipsList = document.getElementById('tips-list');

  // Nutrition tips based on goals
  const tips = {
    maintain: [
      'Eat a balanced diet with variety to ensure you get all necessary nutrients',
      'Monitor your weight weekly and adjust portions if you see significant changes',
      'Include strength training to maintain muscle mass',
      'Stay hydrated - aim for at least 2 liters of water daily',
    ],
    lose: [
      'Prioritize protein to maintain muscle while losing fat',
      'Include plenty of fiber-rich foods to stay full longer',
      'Reduce added sugars and processed foods',
      'Combine diet with regular exercise for best results',
      'Aim for gradual weight loss (0.5-1kg per week)',
    ],
    gain: [
      'Eat calorie-dense foods like nuts, nut butters, and avocados',
      'Spread meals throughout the day (5-6 smaller meals)',
      'Focus on progressive overload in your workouts',
      'Aim for gradual weight gain (0.25-0.5kg per week)',
    ],
  };

  calculateBtn.addEventListener('click', function () {
    // Get input values
    const age = parseInt(document.getElementById('age').value);
    const gender = document.querySelector('input[name="gender"]:checked');
    const height = parseInt(document.getElementById('height').value);
    const weight = parseInt(document.getElementById('weight').value);
    const activity = parseInt(document.getElementById('activity').value);
    const goal = document.getElementById('goal').value;

    // Validate inputs
    if (!age || !height || !weight) {
      alert('Please fill in all fields');
      return;
    }

    // Calculate BMR (basal Metabolic Rate)
    let bmr;
    if (gender.value === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Calculate TDEE (Total Daily Energy Expenditure)
    let tdee = bmr * activity;

    // Adjust calories based on goal
    let calories;
    switch (goal) {
      case 'lose':
        calories = tdee * 0.85;
        break;
      case 'gain':
        calories = tdee * 1.15;
        break;
      default:
        calories = tdee;
    }

    // Calculate macros (40% carbs, 30% protein, 30% fat split)
    const proteinGrams = Math.round((calories * 0.3) / 4);
    const carbsGrams = Math.round((calories * 0.4) / 4);
    const fatsGrams = Math.round((calories * 0.3) / 9);

    // Update UI
    document.getElementById('total-calories').textContent = Math.round(calories);
    document.getElementById('protein-value').textContent = proteinGrams + 'g';
    document.getElementById('carbs-value').textContent = carbsGrams + 'g';
    document.getElementById('fats-value').textContent = fatsGrams + 'g';

    // Update macro bars
    const totalMacros = proteinGrams + carbsGrams + fatsGrams;
    document.getElementById('protein-bar').style.width = (proteinGrams / totalMacros) * 100 + '%';
    document.getElementById('carbs-bar').style.width = (carbsGrams / totalMacros) * 100 + '%';
    document.getElementById('fat-bar').style.width = (fatsGrams / totalMacros) * 100 + '%';

    // Update tips
    tipsList.innerHTML = '';
    tips[goal].forEach((tip) => {
      const li = document.createElement('li');
      li.textContent = tip;
      tipsList.appendChild(li);
    });

    // Show results
    initialState.classList.add('hidden');
    resultsCard.classList.remove('hidden');
    resultsCard.classList.add('fade-in');
    tipsSection.classList.remove('hidden');
    tipsSection.classList.add('fade-in');

    // Scroll to results (for mobile)
    resultsCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  // Add animation to form elements on focus
  const inputs = document.querySelectorAll('input, select');
  inputs.forEach((input) => {
    input.addEventListener('focus', function () {
      this.parentElement.style.transform = 'scale(1.02)';
    });

    input.addEventListener('blur', function () {
      this.parentElement.style.transform = 'scale(1)';
    });
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
    yearElement.dateTime = currentYear.toString();
    yearElement.textContent = currentYear.toString();
  }
  updateYear();
});
