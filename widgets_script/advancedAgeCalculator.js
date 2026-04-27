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
    let ageInYears = ageInDays / 365.25;

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

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('nextBirthday').textContent = nextBirthday.toLocaleDateString('en-US', options);

    // Calculate day of birth
    const birthDay = birthDate.toLocaleDateString('en-US', { weekday: 'long' });
    document.getElementById('birthDay').textContent =
      ` ${birthDate.toLocaleDateString('en-US', options)}`;

    // Calculate life progress (assuming average lifespan of 80 years)
    const lifeProgress = (ageInYears / 80) * 100;
    document.getElementById('lifeProgress').textContent = `${lifeProgress.toFixed(1)}% of average lifespan.`;

    // Determine generation
    let generation = '';
    if (year >= 1997 && year <= 2012) {
      generation = 'Generation Z';
    } else if (year >= 1981 && year <= 1996) {
      generation = 'Millennial';
    } else if (year >= 1965 && year <= 1980) {
      generation = 'Generation X';
    } else if (year >= 1946 && year <= 1964) {
      generation = 'Baby Boomer';
    } else if (year >= 1928 && year <= 1945) {
      generation = 'Silent Generation';
    } else if (year >= 1901 && year <= 1927) {
      generation = 'Greatest Generation';
    } else if (year >= 2013) {
      generation = 'Generation Alpha';
    } else {
      generation = 'Unknown Generation';
    }
    document.getElementById('generation').textContent = generation;

    // Determine zodiac sign
    const zodiacSign = getZodiacSign(day, month);
    document.getElementById('zodiacSign').innerHTML = `
      <span
        style="background: #${getZodiacColor(
          zodiacSign,
        )}; color: white; padding: 5px 10px; border-radius: 20px; font-size: 14px"
        >${zodiacSign}</span
      >
    `;

    // Generate milestones
    generateMilestones(birthDate, years);

    // Show results
    document.getElementById('resultSection').classList.add('active');
  }

  function getZodiacSign(day, month) {
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
    if ((month === 4 && day >= 20) || (month === 4 && day <= 19)) return 'Taurus';
    if ((month === 5 && day >= 21) || (month === 4 && day <= 19)) return 'Gemini';
    if ((month === 6 && day >= 21) || (month === 4 && day <= 19)) return 'Cancer';
    if ((month === 7 && day >= 23) || (month === 4 && day <= 19)) return 'Leo';
    if ((month === 8 && day >= 23) || (month === 4 && day <= 19)) return 'Virgo';
    if ((month === 9 && day >= 23) || (month === 4 && day <= 19)) return 'Libra';
    if ((month === 10 && day >= 23) || (month === 4 && day <= 19)) return 'Scorpio';
    if ((month === 11 && day >= 22) || (month === 4 && day <= 19)) return 'Sagittarius';
    if ((month === 12 && day >= 22) || (month === 4 && day <= 19)) return 'Capricorn';
    if ((month === 1 && day >= 20) || (month === 4 && day <= 19)) return 'Aquarius';
    return 'Pisces';
  }

  function getZodiacColor(sign) {
    const colors = {
      Aries: 'ff6b6b',
      Taurus: '4ecdc4',
      Gemini: '45b7d1',
      Cancer: 'a5d8dd',
      Leo: 'ffd166',
      Virgo: '06d6a0',
      Libra: 'a78aff',
      Scorpio: '8338ec',
      Sagittarius: 'ff9e00',
      Capricorn: '8a817c',
      Aquarius: '3a86ff',
      Pisces: '5887ff',
    };
    return colors[sign] || '4361ee';
  }

  function generateMilestones(birthDate, currentAge) {
    const milestonesGrid = document.getElementById('milestonesGrid');
    milestonesGrid.innerHTML = '';

    const milestones = [
      { age: 0, title: 'Birth', description: 'You were born!' },
      { age: 1, title: '1st Birthday', description: 'First trip around the sun' },
      { age: 5, title: 'Start School', description: 'Kindergarten begins' },
      { age: 13, title: 'Teenager', description: 'Welcome to adolescence' },
      { age: 16, title: 'Sweet 16', description: 'Driving age in many places' },
      { age: 18, title: 'Adult', description: 'Legal adulthood in most countries' },
      { age: 21, title: 'Drinking Age', description: 'Legal drinking age in US' },
      { age: 25, title: 'Quarter Century', description: 'Car rental discounts' },
      { age: 30, title: 'Thirty', description: 'Welcome to your 30s' },
      { age: 40, title: 'Forty', description: 'Life begins at 40' },
      { age: 50, title: 'Fifty', description: 'Half a century' },
      { age: 60, title: 'Sixty', description: 'Senior citizen benefits' },
      { age: 65, title: 'Retirement', description: 'Traditional retirement age' },
      { age: 70, title: 'Seventy', description: 'Golden years' },
      { age: 80, title: 'Eighty', description: 'Average life expectancy' },
      { age: 90, title: 'Ninety', description: 'Nonagenarian' },
      { age: 100, title: 'Century', description: '100 years young!' },
    ];

    milestones.forEach((milestone) => {
      const milestoneDate = new Date(birthDate);
      milestoneDate.setFullYear(milestoneDate.getFullYear() + milestone.age);

      const milestoneCard = document.createElement('div');
      milestoneCard.className = `milestone-card ${milestone.age < currentAge ? 'past' : 'future'}`;

      const milestoneYear = birthDate.getFullYear() + milestone.age;
      const isPast = milestone.age < currentAge;
      const status = isPast ? 'Completed' : 'Upcoming';
      const statusClass = isPast ? 'text-success' : 'text-primary';

      milestoneCard.innerHTML = `
        <h3>${milestone.title}</h3>
        <p>${milestone.description}</p>
        <p class="milestone-date">${milestoneYear} (Age ${milestone.age})</p>
      `;

      milestonesGrid.appendChild(milestoneCard);
    });
  }

  function shareOnTwitter() {
    const years = document.getElementById('years').textContent;
    const text = `I'm ${years} years old! Calculate your exact age with this Advanced Age Calculator`;
    const url = window.location.href;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      '_blank',
    );
  }

  function shareOnFacebook() {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
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
