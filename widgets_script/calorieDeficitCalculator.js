document.addEventListener('DOMContentLoaded', function () {
  // Unit toggle functionality
  const unitToggle = document.getElementById('unit-toggle');
  const metricLabel = document.getElementById('metric-label');
  const imperialLabel = document.getElementById('imperial-label');
  const heightCmGroup = document.getElementById('height-cm-group');
  const heightFtGroup = document.getElementById('height-ft-group');
  const heightInGroup = document.getElementById('height-in-group');
  const weightKgGroup = document.getElementById('weight-kg-group');
  const weightLbsGroup = document.getElementById('weight-lbs-group');
  const goalSelect = document.getElementById('goal');

  unitToggle.addEventListener('change', function () {
    if (this.checked) {
      // Switch to imperial
      metricLabel.classList.remove('active-unit');
      imperialLabel.classList.add('active-unit');
      heightCmGroup.classList.add('hidden');
      heightFtGroup.classList.remove('hidden');
      heightInGroup.classList.remove('hidden');
      weightKgGroup.classList.add('hidden');
      weightLbsGroup.classList.remove('hidden');

      // Update goal options
      goalSelect.innerHTML = `
        <option value="0.25">Lose 0.25 lbs/week</option>
        <option value="0.5">Lose 0.5 lbs/week</option>
        <option value="0.75">Lose 0.75 lbs/week</option>
        <option value="1">Lose 1 lbs/week</option>
        <option value="1.25">Lose 1.25 lbs/week</option>
        <option value="1.5">Lose 1.5 lbs/week</option>
      `;
    } else {
      // Switch to metric
      metricLabel.classList.add('active-unit');
      imperialLabel.classList.remove('active-unit');
      heightCmGroup.classList.remove('hidden');
      heightFtGroup.classList.add('hidden');
      heightInGroup.classList.add('hidden');
      weightKgGroup.classList.remove('hidden');
      weightLbsGroup.classList.add('hidden');

      // Update goal options
      goalSelect.innerHTML = `
        <option value="0.25">Lose 0.25 kg/week</option>
        <option value="0.5">Lose 0.5 kg/week</option>
        <option value="0.75">Lose 0.75 kg/week</option>
        <option value="1">Lose 1 kg/week</option>
        <option value="1.25">Lose 1.25 kg/week</option>
        <option value="1.5">Lose 1.5 kg/week</option>
      `;
    }
  });

  // Calculate button functionality
  const calculateBtn = document.getElementById('calculate-btn');
  const resultSection = document.getElementById('results');

  calculateBtn.addEventListener('click', function () {
    // Get all input values
    const age = parseInt(document.getElementById('age').value);
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const activityLevel = parseFloat(document.getElementById('activity').value);
    const goal = parseFloat(document.getElementById('goal').value);
    const isImperial = unitToggle.checked;

    let height, weight;

    if (isImperial) {
      const feet = parseFloat(document.getElementById('height-ft').value);
      const inches = parseFloat(document.getElementById('height-in').value);
      heigh = feet * 30.48 + inches * 2.54; // Convert to cm

      const pounds = parseFloat(document.getElementById('weight-lbs').value);
      weight = pounds * 0.453592; // Convert to kg
    } else {
      height = parseFloat(document.getElementById('height-cm').value);
      weight = parseFloat(document.getElementById('weight-kg').value);
    }

    // Validate inputs
    if (!age || !height || !weight) {
      alert('Please fill in all required fields.');
      return;
    }

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Calculate TDEE (Total Daily Energy Expenditure)
    const tdee = bmr * activityLevel;

    // Calculate deficit (1kg = 7700 calories, 1lb = 3500 calories)
    const deficitCalories = (goal * 7700) / 7; // Daily deficit
    const targetCalories = tdee;

    // DIsplay results
    document.getElementById('bmr-result').textContent = Math.round(bmr);
    document.getElementById('tdee-result').textContent = Math.round(tdee);
    document.getElementById('deficit-result').textContent = Math.round(deficitCalories);
    document.getElementById('target-result').textContent = Math.round(targetCalories);

    // Display weight loss projections
    if (isImperial) {
      document.getElementById('weekly-loss').textContent = (goal * 2.20462).toFixed(1);
      document.getElementById('monthly-loss').textContent = (goal * 4.34524 * 2.20462).toFixed(1);
      document.getElementById('weekly-unit').textContent = 'lbs/week';
      document.getElementById('monthly-unit').textContent = 'lbs/month';
    } else {
      document.getElementById('weekly-loss').textContent = goal.toFixed(2);
      document.getElementById('monthly-loss').textContent = (goal * 4.34524).toFixed(2);
      document.getElementById('weekly-unit').textContent = 'kg/week';
      document.getElementById('monthly-unit').textContent = 'kg/month';
    }

    document.getElementById('time-5kg').textContent = Math.ceil(5 / goal);
    document.getElementById('time-10kg').textContent = Math.ceil(10 / goal);

    // Show deficit progress (500 cal/day = -0.5kg/week)
    const deficitPercentage = Math.min(100, (deficitCalories / 500) * 100);
    document.getElementById('deficit-percentage').textContent = Math.round(deficitPercentage) + '%';
    document.getElementById('deficit-progress').style.width = deficitPercentage + '%';

    // Show results
    resultSection.style.display = 'block';

    // Scroll to results
    resultSection.scrollIntoView({ behavior: 'smooth' });
  });
});
