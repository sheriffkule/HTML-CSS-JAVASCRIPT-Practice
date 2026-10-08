document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const themeToggle = document.getElementById('themeToggle');
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  // Converter elements
  const dateInput = document.getElementById('dateInput');
  const timeInput = document.getElementById('timeInput');
  const fromTimezone = document.getElementById('fromTimezone');
  const toTimezone = document.getElementById('toTimezone');
  const convertBtn = document.getElementById('convertBtn');
  const resultCard = document.getElementById('resultCard');
  const convertedTime = document.getElementById('convertedTime');
  const convertedTimezone = document.getElementById('convertedTimezone');
  const timeDifference = document.getElementById('timeDifference');
  const copyResultBtn = document.getElementById('copyResultBtn');
  const addFavoriteBtn = document.getElementById('addFavoriteBtn');
  const favoritesList = document.getElementById('favoritesList');

  // Comparison elements
  const baseDate = document.getElementById('baseDate');
  const baseTime = document.getElementById('baseTime');
  const baseTimezone = document.getElementById('baseTimezone');
  const compareTimezone1 = document.getElementById('compareTimezone1');
  const compareTimezone2 = document.getElementById('compareTimezone2');
  const compareTimezone3 = document.getElementById('compareTimezone3');
  const compareBtn = document.getElementById('compareBtn');
  const comparisonResults = document.getElementById('comparisonResults');
  const comparisonResultsContainer = document.getElementById('comparisonResultsContainer');

  // World Clock elements
  const searchCity = document.getElementById('searchCity');
  const worldClockContainer = document.getElementById('worldClockContainer');
  const worldClockSpinner = document.getElementById('worldClockSpinner');

  // Initialize with current date and time
  const now = new Date();
  dateInput.valueAsDate = now;
  baseDate.valueAsDate = now;

  const currentTime = now.toTimeString().substring(0, 5);
  timeInput.value = currentTime;
  baseTime.value = currentTime;

  // Populate timezone dropdowns
  populateTimezones();

  // Load favorites from localStorage
  loadFavorites();

  // Set default timezones
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  setDefaultTimezone(userTimezone);

  // Tab switching
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tabContents.forEach((c) => c.classList.remove('active'));

      tab.classList.add('active');
      document.getElementById(tab.dataset.tab).classList.add('active');

      // Load world clock when tab is activated
      if (tab.dataset.tab === 'world-clock') {
        loadWorldClock();
      }
    });
  });

  // Theme toggle
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem('theme', 'dark');
    } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem('theme', 'light');
    }
  });

  // Check for saved theme preferences
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  // Convert time
  convertBtn.addEventListener('click', convertTime);

  // Add to my favorites
  addFavoriteBtn.addEventListener('click', addToFavorites);

  // Copy result to clipboard
  copyResultBtn.addEventListener('click', copyResultToClipboard);

  // Compare timezones
  compareBtn.addEventListener('click', compareTimezones);

  // Search city in world clock
  searchCity.addEventListener('input', debounce(searchCityHandler, 300));

  // Functions to populate timezone dropdown
  function populateTimezones() {
    const timezones = Intl.supportedValuesOf('timeZone');

    timezones.sort((a, b) => {
      // Move common timezones to the top
      const commonZones = [
        'UTC',
        'GMT',
        'America/New_York',
        'America/Chicago',
        'America/Denver',
        'America/Los_Angeles',
        'Europe/London',
        'Europe/Paris',
        'Asia/Tokyo',
        'Asia/Shanghai',
      ];

      const aIndex = commonZones.indexOf(a);
      const bIndex = commonZones.indexOf(b);

      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;

      return a.localeCompare(b);
    });

    timezones.forEach((tz) => {
      const option = document.createElement('option');
      option.value = tz;
      option.textContent = tz.replace(/_/g, ' ');
      [fromTimezone, toTimezone, baseTimezone, compareTimezone1, compareTimezone2, compareTimezone3].forEach(
        (select) => {
          const clone = option.cloneNode(true);
          select.appendChild(clone);
        },
      );
    });
  }

  // Function to set default timezone
  function setDefaultTimezone(timezone) {
    [fromTimezone, baseTimezone].forEach((select) => {
      const options = Array.from(select.options);
      const index = options.findIndex((opt) => opt.value === timezone);
      if (index !== -1) select.selectedIndex = index;
    });

    // Set common timezones for comparison
    const commonZones = ['America/Los_Angeles', 'Europe/London', 'Asia/Tokyo'];
    [compareTimezone1, compareTimezone2, compareTimezone3].forEach((select, i) => {
      const options = Array.from(select.options);
      const index = options.findIndex((opt) => opt.value === commonZones[i]);
      if (index !== -1) select.selectedIndex = index;
    });
  }

  function getTimeZoneOffsetMinutes(date, timeZone) {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      timeZoneName: 'shortOffset',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    const tzName = formatter.formatToParts(date).find((part) => part.type === 'timeZoneName')?.value || 'GMT';
    if (tzName === 'GMT' || tzName === 'UTC') return 0;

    const match = tzName.match(/GMT([+-])(\d{1,2})(?::?(\d{2}))?/);
    if (!match) return 0;

    const sign = match[1] === '-' ? -1 : 1;
    const hours = Number(match[2]);
    const minutes = Number(match[3] || 0);

    return sign * (hours * 60 + minutes);
  }

  function formatOffsetMinutes(totalMinutes) {
    const sign = totalMinutes >= 0 ? '+' : '-';
    const absoluteMinutes = Math.abs(totalMinutes);
    const hours = String(Math.floor(absoluteMinutes / 60)).padStart(2, '0');
    const minutes = String(absoluteMinutes % 60).padStart(2, '0');
    return `GMT${sign}${hours}:${minutes}`;
  }

  function formatTimeInZone(date, timeZone) {
    return new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(date);
  }

  function formatDateInZone(date, timeZone) {
    return new Intl.DateTimeFormat('en-US', {
      timeZone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  }

  function getUtcInstantForTimeInZone(dateString, timeString, timeZone) {
    const [year, month, day] = dateString.split('-').map(Number);
    const [hour, minute] = timeString.split(':').map(Number);
    const utcMilliseconds = Date.UTC(year, month - 1, day, hour, minute, 0, 0);
    const timezoneOffsetMinutes = getTimeZoneOffsetMinutes(new Date(utcMilliseconds), timeZone);

    return utcMilliseconds - timezoneOffsetMinutes * 60 * 1000;
  }

  // Function to convert time between timezones
  function convertTime() {
    const date = dateInput.value;
    const time = timeInput.value;

    if (!date || !time) {
      alert('Please select both date and time!');
      return;
    }

    const fromTz = fromTimezone.value;
    const toTz = toTimezone.value;

    if (fromTz === toTz) {
      alert('Please select different time zones');
      return;
    }

    const utcInstant = getUtcInstantForTimeInZone(date, time, fromTz);
    const fromDate = new Date(utcInstant);

    if (Number.isNaN(fromDate.getTime())) {
      alert('Invalid date or time!');
      return;
    }

    const fromFormatted = formatDateInZone(fromDate, fromTz);
    const toFormatted = formatDateInZone(fromDate, toTz);
    const fromOffset = getTimeZoneOffsetMinutes(fromDate, fromTz);
    const toOffset = getTimeZoneOffsetMinutes(fromDate, toTz);

    convertedTime.textContent = formatTimeInZone(fromDate, toTz);
    convertedTimezone.textContent = `${toTz.replace(/_/g, ' ')} (${formatOffsetMinutes(toOffset)})`;
    timeDifference.textContent = `Time difference: ${formatOffsetMinutes(fromOffset)} (${fromTz.replace(/_/g, ' ')}) → ${formatOffsetMinutes(toOffset)} (${toTz.replace(/_/g, ' ')})`;

    const fromDatePart = fromFormatted.split(', ')[0];
    const toDatePart = toFormatted.split(', ')[0];

    if (fromDatePart !== toDatePart) {
      timeDifference.textContent += ` | Date changes from ${fromDatePart} to ${toDatePart}`;
      timeDifference.classList.add('highlight');
    } else {
      timeDifference.classList.remove('highlight');
    }

    resultCard.style.display = 'block';
  }

  // Function to add current conversion to favorites
  function addToFavorites() {
    if (!resultCard.style.display || resultCard.style.display === 'none') {
      alert('Please convert a time first!');
      return;
    }

    const fromTz = fromTimezone.value;
    const toTz = toTimezone.value;

    const favorites = JSON.parse(localStorage.getItem('timezoneFavorites')) || [];

    // Check if this pair already exist
    const exists = favorites.some(
      (fav) => (fav.fromTz === fromTz && fav.toTz === toTz) || (fav.fromTz === toTz && fav.toTz === fromTz),
    );

    if (exists) {
      alert('This timezone pair is already in your favorites!');
      return;
    }

    favorites.push({
      fromTz,
      toTz,
      fromTzDisplay: fromTimezone.options[fromTimezone.selectedIndex].text,
      toTzDisplay: toTimezone.options[toTimezone.selectedIndex].text,
    });

    localStorage.setItem('timezoneFavorites', JSON.stringify(favorites));
    loadFavorites();

    alert('Added to favorites!');
  }

  // Function to load favorites from localStorage
  function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('timezoneFavorites')) || [];
    favoritesList.innerHTML = '';

    if (favorites.length === 0) {
      favoritesList.innerHTML = '<p> No favorites yet. convert a time and click "Add to Favorites".</p>';
      return;
    }

    favorites.forEach((fav, index) => {
      const favoriteItem = document.createElement('div');
      favoriteItem.className = 'favorite-item';
      favoriteItem.innerHTML = `
        <span>${fav.fromTzDisplay} → ${fav.toTzDisplay}</span>
        <button class="remove-btn" data-index="${index}" title="Remove Item">
          <i class="fas fa-times"></i>
        </button>
      `;

      favoriteItem.addEventListener('click', (e) => {
        if (!e.target.closest('.remove-btn')) {
          // Set the from and to timezone
          fromTimezone.value = fav.fromTz;
          toTimezone.value = fav.toTz;

          // Trigger conversion
          convertBtn.click();

          // Switch to converter tab if not already there
          document.querySelector('.tab[data-tab="converter"]').click();
        }
      });

      const removeBtn = favoriteItem.querySelector('.remove-btn');
      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        removeFavorite(index);
      });

      favoritesList.appendChild(favoriteItem);
    });
  }

  // Function to remove favorite
  function removeFavorite(index) {
    const favorites = JSON.parse(localStorage.getItem('timezoneFavorites')) || [];
    favorites.splice(index, 1);
    localStorage.setItem('timezoneFavorites', JSON.stringify(favorites));
    loadFavorites();
  }

  // function to copy result to clipboard
  function copyResultToClipboard() {
    const textToCopy = `${convertedTime.textContent}\n${convertedTimezone.textContent}\n${timeDifference.textContent}`;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        const originalText = copyResultBtn.innerHTML;
        copyResultBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';

        setTimeout(() => {
          copyResultBtn.innerHTML = originalText;
        }, 2000);
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
        alert('Failed to copy to clipboard!');
      });
  }

  // Function to compare multiple timezones
  function compareTimezones() {
    const date = baseDate.value;
    const time = baseTime.value;

    if (!date || !time) {
      alert('Please select both date and time!');
      return;
    }

    const baseTz = baseTimezone.value;
    const tz1 = compareTimezone1.value;
    const tz2 = compareTimezone2.value;
    const tz3 = compareTimezone3.value;

    const timezones = [baseTz, tz1, tz2, tz3].filter((tz, i, arr) => tz && arr.indexOf(tz) === i);

    if (timezones.length < 2) {
      alert('Please select at least two different timezones!');
      return;
    }

    const baseDateObj = new Date(getUtcInstantForTimeInZone(date, time, baseTz));

    if (Number.isNaN(baseDateObj.getTime())) {
      alert('Invalid date of time!');
      return;
    }

    comparisonResultsContainer.innerHTML = '';

    timezones.forEach((tz) => {
      const formattedTime = formatTimeInZone(baseDateObj, tz);
      const formattedDate = formatDateInZone(baseDateObj, tz);
      const offset = formatOffsetMinutes(getTimeZoneOffsetMinutes(baseDateObj, tz));

      const timezoneCard = document.createElement('div');
      timezoneCard.className = 'timezone-card';
      timezoneCard.innerHTML = `
          <h3><i class="fas fa-clock"></i> ${tz.replace(/_/g, ' ')}</h3>
          <p class="time">${formattedTime}</p>
          <p class="date">${formattedDate}</p>
          <p class="offset">${offset}</p>
        `;

      comparisonResultsContainer.appendChild(timezoneCard);
    });

    comparisonResults.style.display = 'block';
  }

  // Function to load world clock
  function loadWorldClock() {
    worldClockContainer.innerHTML = '';
    worldClockSpinner.style.display = 'block';

    // Major cities around the world
    const majorCities = [
      'America/New_York',
      'America/Chicago',
      'America/Denver',
      'America/Los_Angeles',
      'Europe/London',
      'Europe/Paris',
      'Europe/Berlin',
      'Europe/Moscow',
      'Asia/Tokyo',
      'Asia/Shanghai',
      'Asia/Hong_Kong',
      'Asia/Singapore',
      'Australia/Sydney',
      'Australia/Melbourne',
      'Pacific/Auckland',
      'Africa/Cairo',
      'Africa/Johannesburg',
      'America/Sao_Paulo',
      'America/Mexico_City',
      'Asia/Dubai',
      'Asia/Kolkata',
    ];

    setTimeout(() => {
      worldClockSpinner.style.display = 'none';

      majorCities.forEach((tz) => {
        const now = new Date();
        const options = {
          timeZone: tz,
          weekday: 'short',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short',
        };

        const formatted = new Intl.DateTimeFormat('en-US', options).format(now);
        const dateOptions = {
          timeZone: tz,
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        };

        const dateFormatted = new Intl.DateTimeFormat('en-US', dateOptions).format(now);
        const offset = now
          .toLocaleDateString('en-US', { timeZone: tz, timeZoneName: 'longOffset' })
          .split(', ')[1];

        const timezoneCard = document.createElement('div');
        timezoneCard.className = 'timezone-card';
        timezoneCard.innerHTML = `
            <h3><i class="fas fa-city"></i> ${tz.split('/')[1].replace(/_/g, ' ')}</h3>
            <p class="time">${formatted}</p>
            <p class="date">${dateFormatted}</p>
            <p class="offset">${offset}</p>
          `;

        worldClockContainer.appendChild(timezoneCard);
      });
    }, 500);
  }

  // Function to search cities in world clock
  function searchCityHandler() {
    const searchTerm = searchCity.value.toLowerCase();

    if (!searchTerm) {
      loadWorldClock();
      return;
    }

    const timezones = Intl.supportedValuesOf('timeZone');
    const filtered = timezones.filter((tz) => tz.toLowerCase().includes(searchTerm));

    worldClockContainer.innerHTML = '';

    if (filtered.length === 0) {
      worldClockContainer.innerHTML = '<p>No matching cities found.</p>';
      return;
    }

    // Limit to first 20 results
    filtered.slice(0, 20).forEach((tz) => {
      const now = new Date();
      const options = {
        timeZone: tz,
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
      };

      const formatted = new Intl.DateTimeFormat('en-US', options).format(now);
      const dateOptions = {
        timeZone: tz,
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      };

      const dateFormatted = new Intl.DateTimeFormat('en-US', dateOptions).format(now);
      const offset = now
        .toLocaleTimeString('en-US', {
          timeZone: tz,
          timeZoneName: 'longOffset',
        })
        .split(' ')[1];

      const timezoneCard = document.createElement('div');
      timezoneCard.className = 'timezone-card';
      timezoneCard.innerHTML = `
            <h3><i class="fas fa-city"></i> ${tz.replace(/_/g, ' ')}</h3>
            <p class="time">${formatted}</p>
            <p class="date">${dateFormatted}</p>
            <p class="offset">${offset}</p>
          `;

      worldClockContainer.appendChild(timezoneCard);
    });
  }

  // Debounce function for search input
  function debounce(func, wait) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    };
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
