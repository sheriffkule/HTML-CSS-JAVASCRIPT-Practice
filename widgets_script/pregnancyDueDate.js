document.addEventListener('DOMContentLoaded', function () {
  // Method toggle functionality
  const lmpMethodBtn = document.getElementById('lmpMethodBtn');
  const conceptionMethodBtn = document.getElementById('conceptionMethodBtn');
  const ultrasoundMethodBtn = document.getElementById('ultrasoundMethodBtn');
  const lmpMethod = document.getElementById('lmpMethod');
  const conceptionMethod = document.getElementById('conceptionMethod');
  const ultrasoundMethod = document.getElementById('ultrasoundMethod');

  if (lmpMethodBtn)
    lmpMethodBtn.addEventListener('click', () => {
      lmpMethodBtn.classList.add('active');
      conceptionMethodBtn.classList.remove('active');
      ultrasoundMethodBtn.classList.remove('active');
      lmpMethod.classList.remove('hidden');
      conceptionMethod.classList.add('hidden');
      ultrasoundMethod.classList.add('hidden');
    });

  if (conceptionMethodBtn)
    conceptionMethodBtn.addEventListener('click', () => {
      lmpMethodBtn.classList.remove('active');
      conceptionMethodBtn.classList.add('active');
      ultrasoundMethodBtn.classList.remove('active');
      lmpMethod.classList.add('hidden');
      conceptionMethod.classList.remove('hidden');
      ultrasoundMethod.classList.add('hidden');
    });

  if (ultrasoundMethodBtn)
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

  if (calculateBtn) calculateBtn.addEventListener('click', calculateDueDate);
  if (resetBtn) resetBtn.addEventListener('click', resetCalculator);

  // Set default date to today
  document.getElementById('lmp-date').valueAsDate = new Date();
  document.getElementById('conception-date').valueAsDate = new Date();
  document.getElementById('ultrasound-date').valueAsDate = new Date();

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

      let cycleLength = parseInt(document.getElementById('cycle-length').value, 10);
      if (isNaN(cycleLength) || cycleLength < 20 || cycleLength > 45) {
        cycleLength = 28; // sane default
      }
      const ovulationDay = cycleLength - 14; // Typically ovulation occurs 14 days before next period

      // Due date is 280 days (40 weeks) from LMP (Naegele's rule)
      dueDate = new Date(lmpDate);
      dueDate.setDate(dueDate.getDate() + 280);

      // Conception date is approximately ovulation day after LMP
      conceptionDate = new Date(lmpDate);
      conceptionDate.setDate(conceptionDate.getDate() + ovulationDay + 1);
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
    const msPerDay = 1000 * 60 * 60 * 24;
    let daysPassed = Math.floor((today - conceptionDate) / msPerDay) + 14;
    if (isNaN(daysPassed) || daysPassed < 0) daysPassed = 0;
    const daysRemaining = Math.max(0, totalDays - daysPassed);
    const progressPercent = Math.min(100, Math.max(0, Math.round((daysPassed / totalDays) * 100)));

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
    const progressBarEl = document.getElementById('progress-bar');
    if (progressBarEl) {
      progressBarEl.textContent = `${progressPercent}%`;
      progressBarEl.style.width = `${progressPercent}%`;
    }
    document.getElementById('trimester').textContent = trimester;
    document.getElementById('days-remaining').textContent = daysRemaining > 0 ? daysRemaining : 0;
    document.getElementById('fetal-age').textContent = `${currentWeek} weeks`;

    // Generate milestones
    generateMilestones(dueDate, conceptionDate, today);

    // Generate Tips
    generateTips(currentWeek, trimester);

    // Show results
    resultContainer.style.display = 'block';
  }

  function formatDate(date) {
    if (!date || isNaN(date.getTime())) return '—';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  function generateMilestones(dueDate, conceptionDate, today) {
    const milestonesList = document.getElementById('milestones-list');
    if (!milestonesList) return;
    milestonesList.innerHTML = '';

    const milestones = [
      { days: 0, title: 'First day of last menstrual period', icon: 'fas fa-calendar' },
      { days: 14, title: 'Ovulation likely occurred', icon: 'fas fa-egg' },
      { days: 21, title: 'Possible implantation', icon: 'fas fa-heart' },
      { days: 28, title: 'Missed period = pregnancy test possible', icon: 'fas fa-vial' },
      { days: 42, title: 'First prenatal visit (6 weeks)', icon: 'fas fa-stethoscope' },
      { days: 84, title: 'End of first trimester (12 weeks)', icon: 'fas fa-flag' },
      { days: 98, title: 'Second trimester begins (14 weeks)', icon: 'fas fa-baby' },
      { days: 140, title: 'Anatomy scan (20 weeks)', icon: 'fas fa-person-rays' },
      { days: 168, title: 'Third trimester begins (24 weeks)', icon: 'fas fa-ear-listen' },
      { days: 252, title: 'Full-term (36 weeks)', icon: 'fas fa-check-circle' },
      { days: 280, title: 'Estimated due date (40 weeks)', icon: 'fas fa-birthday-cake' },
    ];

    const todayDays = Math.floor((today - conceptionDate) / (1000 * 60 * 60 * 24)) + 14;

    milestones.forEach((milestone) => {
      const milestoneDate = new Date(conceptionDate);
      milestoneDate.setDate(milestoneDate.getDate() + milestone.days);

      let status;
      if (milestone.days < todayDays - 7) status = 'completed';
      else if (milestone.days <= todayDays + 7) status = 'current';
      else status = 'upcoming';

      const milestoneEl = document.createElement('div');
      milestoneEl.className = `milestone ${status}`;
      milestoneEl.innerHTML = `
        <div class="milestone-icon"><i class="${milestone.icon}"></i></div>
        <div class="milestone-content">
          <div class="milestone-date">${formatDate(milestoneDate)}</div>
          <div class="milestone-title">${milestone.title}</div>
        </div>
      `;

      milestonesList.appendChild(milestoneEl);
    });
  }

  function generateTips(currentWeek, trimester) {
    const tipsContainer = document.getElementById('pregnancy-tips');
    if (!tipsContainer) return;
    tipsContainer.innerHTML = '';

    const tips = {
      first: [
        'Take prenatal vitamins with folic acid daily.',
        'Avoid alcohol, tobacco, and limit caffeine.',
        'Schedule your first prenatal appointment.',
        'Be aware of early pregnancy symptoms like fatigue and nausea.',
        'Start researching childbirth classes and healthcare providers.',
      ],
      second: [
        'You may start feeling baby movements (quickening).',
        'Consider prenatal genetic testing if recommended.',
        'Stay active with pregnancy-safe exercises',
        'Begin planning for maternity leave',
        'Start sleeping on your side to improve circulation',
      ],
      third: [
        'Prepare your hospital bag and birth plan.',
        'Install car seat at least 4 weeks before due date',
        'Watch for signs of preterm labor',
        'Practice relaxation and breathing techniques',
        'Finalize childcare arrangements for older siblings.',
      ],
    };

    let currentTips = [];
    if (trimester === '1st') currentTips = tips.first;
    else if (trimester === '2nd') currentTips = tips.second;
    else currentTips = tips.third;

    currentTips.forEach((tip) => {
      const tipEl = document.createElement('div');
      tipEl.className = 'tip-card';
      tipEl.innerHTML = `
        <div class="tip-title">
          <i class="fas fa-check-circle" style="color: var(--success); margin-right: 0.5rem;"></i> ${tip}
        </div>
      `;
      tipsContainer.append(tipEl);
    });

    // Add general tips
    const generalTipEl = document.createElement('div');
    generalTipEl.className = 'tip-card';
    generalTipEl.innerHTML = `
      <div class="tips-title">
        <i
          class="fas fa-info-circle"
          style="color: var(--info); margin-right: 0.5rem; margin-top: 1.5rem;"></i>
        General Pregnancy Advice
      </div>
      <ul class="tip-content">
        <li>Stay hydrated and eat a balanced diet with plenty of fruits, vegetables, and protein.</li>
        <li>Get regular moderate exercise as approved by your doctor.</li>
        <li>Attend all scheduled prenatal appointments.</li>
        <li>Don't hesitate to call your healthcare provider with any concerns.</li>
      </ul>
    `;
    tipsContainer.appendChild(generalTipEl);
  }

  function resetCalculator() {
    document.getElementById('lmp-date').valueAsDate = new Date();
    document.getElementById('conception-date').valueAsDate = new Date();
    document.getElementById('ultrasound-date').valueAsDate = new Date();
    document.getElementById('ultrasound-weeks').value = '';
    document.getElementById('ultrasound-days').value = '';
    document.getElementById('cycle-length').value = '28';
    if (resultContainer) resultContainer.style.display = 'none';
    if (lmpMethodBtn) lmpMethodBtn.click();
  }

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
