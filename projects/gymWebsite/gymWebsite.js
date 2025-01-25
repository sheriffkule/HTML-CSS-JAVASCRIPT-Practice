const calculateForm = document.getElementById('calculate-form');
const calculateCm = document.getElementById('calculate-cm');
const calculateKg = document.getElementById('calculate-kg');
const calculateMessage = document.getElementById('calculate-message');

const calculateBmi = (e) => {
  e.preventDefault();

  if (calculateCm.value === '' || calculateKg.value === '') {
    calculateMessage.classList.remove('color-first');
    calculateMessage.classList.add('color-red');

    calculateMessage.textContent = 'Please enter both height and weight.';

    setTimeout(() => {
      calculateMessage.textContent = '';
    }, 3000);
  } else {
    const cm = calculateCm.value / 100;
    const kg = calculateKg.value;
    const bmi = Math.round(kg / (cm * cm));

    if (bmi < 18.5) {
        calculateMessage.classList.add('color-first');
        calculateMessage.textContent = `Your BMI is ${bmi}. You are underweight.`;
    } else if (bmi < 25) {
        calculateMessage.classList.add('color-first');
        calculateMessage.textContent = `Your BMI is ${bmi}. You are normal weight.`;
    } else {
        calculateMessage.classList.add('color-first');
        calculateMessage.textContent = `Your BMI is ${bmi}. You are overweight.`;
    }

    calculateCm.value = '';
    calculateKg.value = '';

    setTimeout(() => {
        calculateMessage.textContent = '';
    }, 4000);
  }
};

calculateForm.addEventListener('submit', calculateBmi);