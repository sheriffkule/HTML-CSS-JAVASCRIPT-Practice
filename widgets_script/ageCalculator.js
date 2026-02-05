let stars = [];

function createStars() {
  const starsContainer = document.getElementById('stars');

  for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.className = 'star';

    const size = Math.random() * 2 + 2;
    const duration = Math.random() * 30 + 2;
    const opacity = Math.random() * 0.7 + 0.3;

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.setProperty('--duration', `${duration}s`);
    star.style.setProperty('--opacity', `${opacity}`);

    starsContainer.appendChild(star);
    stars.push(star);
  }
}

window.onload = function () {
  const calculateButton = document.getElementById('calculate');
  const copyBtn = document.getElementById('copy-btn');

  calculateButton.addEventListener('click', calculateAge);

  function calculateAge() {
    const today = new Date();
    const birthdateInput = document.getElementById('birthdate');
    const resultElement = document.getElementById('result');
    const totalMonthsElement = document.getElementById('total-months');
    const totalWeeksElement = document.getElementById('total-weeks');
    const totalDaysElement = document.getElementById('total-days');
    const totalHoursElement = document.getElementById('total-hours');
    const noveltyUnitsList = document.getElementById('novelty-units');

    if (!birthdateInput.value) {
      resultElement.innerText = 'Please enter a birthdate.';
      return;
    }

    const birthDate = new Date(birthdateInput.value);
    if (isNaN(birthDate.getTime())) {
      resultElement.innerText = 'Invalid birthdate format. Please use YYYY-MM-DD.';
      return;
    }
    if (today < birthDate) {
      alert('You are not even born yet!');
    }

    const ageInYears = today.getFullYear() - birthDate.getFullYear();
    const ageInMonths = today.getMonth() - birthDate.getMonth();
    const ageInDays = today.getDate() - birthDate.getDate();

    let adjustedAgeInYears = ageInYears;
    let adjustedAgeInMonths = ageInMonths;

    if (ageInMonths < 0) {
      adjustedAgeInYears -= 1;
      adjustedAgeInMonths += 12;
    } else if (ageInMonths === 0 && today.getDate() < birthDate.getDate()) {
      adjustedAgeInYears -= 1;
      adjustedAgeInMonths = 11;
    }

    if (ageInDays < 0) {
      adjustedAgeInMonths -= 1;
      const daysInPreviousMonth = getDaysInPreviousMonth(today);
      ageInDays = Math.max(ageInDays + daysInPreviousMonth, 0);
    }

    function getDaysInPreviousMonth(date) {
      const previousMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
      return new Date(previousMonth.getFullYear(), previousMonth.getMonth() + 1, 0).getDate();
    }

    const totalAgeInMonths = adjustedAgeInYears * 12 + adjustedAgeInMonths;
    const totalAgeInWeeks = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24 * 7));
    const totalAgeInDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
    const totalAgeInHours = Math.floor((today - birthDate) / (1000 * 60 * 60));

    const resultsContainer = document.getElementById('results-container');
    resultsContainer.classList.add('shown');

    resultElement.innerText = `You are ${adjustedAgeInYears} years, ${adjustedAgeInMonths} months, and ${ageInDays} days old.`;
    totalMonthsElement.innerText = `Total months: ${totalAgeInMonths} months.`;
    totalWeeksElement.innerText = `Total weeks: ${totalAgeInWeeks} weeks.`;
    totalDaysElement.innerText = `Total days: ${totalAgeInDays} days.`;
    totalHoursElement.innerText = `Total hours: ${totalAgeInHours} hours.`;

    function handleCopyAgeInfo() {
      const elements = [
        resultElement,
        totalMonthsElement,
        totalWeeksElement,
        totalDaysElement,
        totalHoursElement,
      ];

      const ageInfo = elements.map((element) => element.innerText).join('\n');

      navigator.clipboard
        .writeText(ageInfo)
        .then(() => {
          copyBtn.textContent = 'Copied';
          copyBtn.style.background = 'black';
          copyBtn.style.color = '#44bd32';
          copyBtn.style.fontWeight = 600;

          setTimeout(() => {
            copyBtn.textContent = 'Copy';
            copyBtn.style.background = '';
            copyBtn.style.color = '';
            copyBtn.style.fontWeight = 'normal';
          }, 2000);
        })
        .catch((error) => {
          console.error('Error copying age information:', error);
        });
    }

    copyBtn.addEventListener('click', handleCopyAgeInfo);

    const planetaryYears = {
      Mercury: ageInYears / 0.2408467,
      Venus: ageInYears / 0.61519726,
      Mars: ageInYears / 1.8808158,
      Jupiter: ageInYears / 11.862615,
      Saturn: ageInYears / 29.447498,
      Uranus: ageInYears / 84.016846,
      Neptune: ageInYears / 164.79132,
    };

    const fruitYears = {
      Apple: ageInYears / 80,
      Banana: ageInYears / 25,
      Carrot: ageInYears / 2,
      Grape: ageInYears / 60,
      Watermelon: ageInYears / 90,
    };

    noveltyUnitsList.innerHTML = '';

    for (const planet in planetaryYears) {
      const listItem = document.createElement('li');
      listItem.textContent = `${planet}: ${planetaryYears[planet].toFixed(2)} years`;
      noveltyUnitsList.appendChild(listItem);
    }

    for (const fruit in fruitYears) {
      const listItem = document.createElement('li');
      listItem.textContent = `${fruit}: ${fruitYears[fruit].toFixed(2)} years`;
      noveltyUnitsList.appendChild(listItem);
    }
  }
};

const buttons = document.querySelectorAll('button');

buttons.forEach((btn) => {
  btn.addEventListener('mousemove', function (e) {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const numParticles = 10;

    for (let i = 0; i < numParticles; i++) {
      createParticle(btn, x, y);
    }
  });
});

function calculateCountdown(birthdate) {
  const today = new Date();
  const nextBirthday = new Date(today.getFullYear(), birthdate.getMonth(), birthdate.getDate());

  if (today > nextBirthday) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }

  const timeDiff = nextBirthday.getTime() - today.getTime();
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

function updateCountdown(birthdate) {
  const countdown = calculateCountdown(birthdate);
  document.getElementById('days').innerText = countdown.days;
  document.getElementById('hours').innerText = countdown.hours;
  document.getElementById('minutes').innerText = countdown.minutes;
  document.getElementById('seconds').innerText = countdown.seconds;
}

setInterval(() => {
  const birthdateInput = document.getElementById('birthdate');
  const birthdate = new Date(birthdateInput.value);
  updateCountdown(birthdate);
}, 1000);

function createParticle(button, x, y) {
  const particle = document.createElement('div');
  particle.classList.add('particle');

  particle.style.left = x + 'px';
  particle.style.top = y + 'px';

  const angle = Math.random() * Math.PI * 2;
  const distance = Math.random() * 80 + 20;
  const tx = Math.cos(angle) * distance;
  const ty = Math.sin(angle) * distance;

  particle.style.setProperty('--tx', tx + 'px');
  particle.style.setProperty('--ty', ty + 'px');

  button.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 500);
}

const zodiacTitle = document.querySelector('.zodiac-title');
const zodiacContainer = document.querySelector('.zodiac-container');

zodiacTitle.addEventListener('click', () => {
  zodiacTitle.classList.toggle('active');
  zodiacContainer.classList.toggle('shown');
});

const noveltyTitle = document.querySelector('.novelty-title');
const noveltyContainer = document.querySelector('.novelty-units');

noveltyTitle.addEventListener('click', () => {
  noveltyTitle.classList.toggle('active');
  noveltyContainer.classList.toggle('shown');
});

function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');
  yearElement.dateTime = currentYear;
  yearElement.textContent = currentYear;
}

updateYear();
createStars();
