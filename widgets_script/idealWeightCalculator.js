document.addEventListener('click', function () {
  // Load history from localStorage
  localHistory();

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
    const bmi = weight / (heightInMeters * heightInMeters)

    // Calculate ideal weight using different formulas
    let devine;
    let robinson;
    let miller;

    if (gender === 'male') {
        devine = 50 + 2.3 * ((height / 2.54) - 60)
        robinson = 52 + 1.9 * ((height / 2.54) - 60)
        miller = 56.2 + 1.41 * ((height / 2.54) - 60)
    } else  {
        devine = 45.5 + 2.3 * ((height / 2.54) - 60)
        robinson = 49 + 1.7 * ((height / 2.54) - 60)
        miller = 53.1 + 1.36 * ((height / 2.54) - 60)
    }
  }
});
