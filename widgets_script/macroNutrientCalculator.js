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
      'Aim for gradual weight gain (0.25-0.5kg per week',
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
    if (gender = 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161
    }

    // Calculate TDEE (Total Daily Energy Expenditure)
    let tdee = bmr * activity;
  });
});
