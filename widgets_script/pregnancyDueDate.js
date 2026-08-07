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
  document.getElementById('lmp-date').valueAdDate = new Date();
  document.getElementById('conception-date').valueAdDate = new Date();
  document.getElementById('ultrasound-date').valueAdDate = new Date();

  function calculateDueDate() {
    let dueDate;
    let conceptionDate;

    if (lmpMethodBtn.classList.contains('active')) {
      // LMP method
      const lmpDate = new Date(document.getElementById('lmp-date').value);
      if (isNaN(lmpDate.getTime())) {
        alert('Please enter a valid date for your last menstrual period.');
        return;
      }

      const cycleLength = parseInt(document.getElementById('cycle-length').value);
      const ovulationDay = cycleLength - 14; // Typically ovulation occurs 14 days before next period

      // Due date is 280days (40 weeks) from LMP (Naegele's rule)
      dueDate = new Date(lmpDate);
      dueDate.setDate(dueDate.getDate() + 280);

      // Conception date is approximately ovulation day + 1 day (sperm can live 3-5 days)
      conceptionDate = new Date(lmpDate);
      conceptionDate.setDate(dueDate.getDate() + ovulationDay + 1);
    } else if (conceptionMethodBtn.classList.contains('active')) {
      // Conception date method
      conceptionDate = new Date(document.getElementById('conception-date').value);
      if (isNaN(conceptionDate.getTime())) {
        alert('Please enter a valid conception date.');
        return;
      }

      // Due date is 266 days (38 weeks) from conception
      dueDate = new Date(conceptionDate);
      dueDate.setDate(dueDate.getDate() + 266);
    } else {
      // Ultrasound method
      const ultrasoundDate = new Date(document.getElementById('ultrasound-date').value);
      const weeks = parseInt(document.getElementById('ultrasound-weeks').value) || 0;
      const days = parseInt(document.getElementById('ultrasound-days').value) || 0;

      if (isNaN(ultrasoundDate.getTime()) || weeks < 6 || weeks > 40) {
        alert('Please enter a valid ultrasound details.');
        return;
      }

      // Calculate conception date (ultrasound date minus gestational age)
      conceptionDate = new Date(ultrasoundDate);
      conceptionDate.setDate(conceptionDate.getDate() - (weeks * 7 + days) + 14);

      // Due date is 266 days from conception
      dueDate = new Date(conceptionDate);
      dueDate.setDate(dueDate.getDate() + 266);
    }

    // Display results
    displayResults(dueDate, conceptionDate);
  }

  function displayResults(dueDate, conceptionDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Format dates
    const dueDateStr = formatDate(dueDate);
    const conceptionDateStr = formatDate(conceptionDate);

    // Calculate pregnancy progress
    const totalDays = 280;
    const daysPassed = Math.floor((today - conceptionDate) / (1000 * 60 * 60 * 24)) + 14;
    const daysRemaining = totalDays - daysPassed;
    const progressPercent = Math.min(100, Math.max(0, Math.round(daysPassed / totalDays)));

    // Calculate weeks and days
    const currentWeek = Math.floor(daysPassed / 7);
    const currentDay = daysPassed % 7;

    // Determine trimester
    let trimester;
    if (daysPassed < 84) trimester = '1st';
    else if (daysPassed < 168) trimester = '2nd';
    else trimester = '3rd';

    // Update DOM
    document.getElementById('due-date').textContent = dueDateStr;
    document.getElementById('conception-date-result').textContent = conceptionDateStr;
    document.getElementById('current-week').textContent = `Week ${currentWeek} (Day ${currentDay})`;
    document.getElementById('progress-percent').textContent = `${progressPercent}% complete`;
    document.getElementById('progress-bar').textContent = `${progressPercent}%`;
    document.getElementById('trimester').textContent = trimester;
    document.getElementById('days-remaining').textContent = daysRemaining > 0 ? daysRemaining : 0;
    document.getElementById('fetal-age').textContent = `${currentWeek} weeks`;

    // Generate milestones
    generateMilestones(dueDate, conceptionDate, today);

    // Generate Tips
    generateTips(currentWeek, trimester);

    // Show results
    resultContainer.style.display = block;
  }

  function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  function resetCalculator() {}
});
