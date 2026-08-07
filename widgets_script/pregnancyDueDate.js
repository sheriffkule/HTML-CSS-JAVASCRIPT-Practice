document.addEventListener('DOMContentLoaded', function () {
  // Method toggle functionality
  const lmpMethodBtn = document.getElementById('lmpMethodBtn');
  const conceptionMethodBtn = document.getElementById('conceptionMethodBtn');
  const ultrasoundMethodBtn = document.getElementById('ultrasoundMethodBtn');
  const lmpMethod = document.getElementById('lmpMethod');
  const conceptionMethod = document.getElementById('conceptionMethod');
  const ultrasoundMethod = document.getElementById('ultrasoundMethod');

  lmpMethodBtn.addEventListener('click', () => {
    lmpMethodBtn.classList.add('active');
    conceptionMethodBtn.classList.remove('active');
    ultrasoundMethodBtn.classList.remove('active');
    lmpMethod.classList.remove('hidden');
    conceptionMethod.classList.add('hidden');
    ultrasoundMethod.classList.add('hidden');
  });

  conceptionMethodBtn.addEventListener('click', () => {
    lmpMethodBtn.classList.remove('active');
    conceptionMethodBtn.classList.add('active');
    ultrasoundMethodBtn.classList.remove('active');
    lmpMethod.classList.add('hidden');
    conceptionMethod.classList.remove('hidden');
    ultrasoundMethod.classList.add('hidden');
  });

  ultrasoundMethodBtn.addEventListener('click', () => {
    lmpMethodBtn.classList.remove('active');
    conceptionMethodBtn.classList.remove('active');
    ultrasoundMethodBtn.classList.add('active');
    lmpMethod.classList.add('hidden');
    conceptionMethod.classList.add('hidden');
    ultrasoundMethod.classList.remove('hidden');
  });

  // Calculate button functionality
  const calculateBtn = document.getElementById('calculate-btn');
  const resetBtn = document.getElementById('reset-btn');
  const resultContainer = document.getElementById('result-container');

  calculateBtn.addEventListener('click', calculateDueDate);
  resetBtn.addEventListener('click', resetCalculator);

  // Set default date to today
  document.getElementById('lmp-date').valueAdDate = new Date()
  document.getElementById('conception-date').valueAdDate = new Date()
  document.getElementById('ultrasound-date').valueAdDate = new Date()

  function calculateDueDate() {}
  function resetCalculator() {}
});
