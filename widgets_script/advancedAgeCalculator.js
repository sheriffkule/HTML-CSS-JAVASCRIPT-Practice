document.addEventListener('DOMContentLoaded', function () {
  // Populate days dropdown
  const daySelect = document.getElementById('day');
  for (let i = 1; i <= 31; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    daySelect.appendChild(option);
  }

  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    themeToggle.textContent = isDarkMode ? '☀' : '🌓';
    localStorage.setItem('darkMode', isDarkMode);
  });

  // Check for saved theme preference
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '☀';
  }

  // Calculate age
  const calculateBtn = document.getElementById('calculateBtn');
  calculateBtn.addEventListener('click', calculateAge);

  // Reset form
  const resetBtn = document.getElementById('resetBtn');
  resetBtn.addEventListener('click', function () {
    document.getElementById('day').value = '';
    document.getElementById('month').value = '';
    document.getElementById('year').value = '';
    document.getElementById('resultSection').classList.remove('active');
  });

  // Share buttons
  document.getElementById('shareTwitter').addEventListener('click', shareOnTwitter);
  document.getElementById('shareFacebook').addEventListener('click', shareOnFacebook);

  function calculateAge() {
    const day = parseInt(document.getElementById('day').value);
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);

    if (!day || !month || !year) {
      alert('Please fill in all fields!');
      return;
    }

    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    if (birthDate > today) {
      alert('Birth date can not be in the future!');
      return;
    }

    // Calculate age
    let ageInMilliseconds = today - birthDate;
    let ageInSeconds = ageInMilliseconds / 1000;
    let ageInMinutes = ageInSeconds / 60;
    let ageInHours = ageInMinutes / 60;
    let ageInDays = ageInHours / 24;
    let ageInYears = ageInDays * 365.25;

    const years = Math.floor(ageInYears);
    const months = Math.floor((ageInYears - years) * 12);
    const days = Math.floor(ageInDays % 30.44);
    const hours = Math.floor(ageInHours % 24);

    // Display results
    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;

    // Calculate next birthday
    const nextBirthday = new Date(today.getFullYear(), month - 1, day);
    if (nextBirthday < today) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }
  }
});
