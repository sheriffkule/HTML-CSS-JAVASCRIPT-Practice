document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const themeToggle = document.getElementById('themeToggle');
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  // Converter elements
  const dateInput = document.getElementById('dateInput');
  const timeInput = document.getElementById('timeInput');
  const fromTimezone = document.getElementById('fromTimezone');
  const toTimezone = document.getElementById('toTImezone');
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
  const basTimezone = document.getElementById('basTimezone');
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

  // Load favorites from localStorage
  loadFavorites();

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
      [(fromTimezone, toTimezone, basTimezone, compareTimezone1, compareTimezone2, compareTimezone3)].forEach(
        (select) => {
          const clone = option.cloneNode(true);
          select.appendChild(clone);
        },
      );
    });
  }

  // Function to set default timezone
  function setDefaultTimezone() {
    [fromTimezone, basTimezone].forEach((select) => {
      const options = Array.from(select.options);
      const index = options.findIndex((opt) => opt.value === timezone);
      if (index !== -1) select.selectedIndex = index;
    });

    // Set common timezones for comparison
    const commonZones = ['America/Los_Angeles', 'Europe/London', 'Asia/Tokyo'][
      (compareTimezone1, compareTimezone2, compareTimezone3)
    ].forEach((select, i) => {
      const options = Array.from(select.options);
      const index = options.findIndex((opt) => opt.value === commonZones[i]);
      if (index !== -1) select.selectedIndex = index;
    });
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

    const datetimeString = `${date}T${time}`;
    const fromDate = new Date(datetimeString);

    if (isNaN(fromDate.getTime())) {
      alert('Invalid date or time!');
      return;
    }

    // Format the date in the "from" timezone
    const fromOptions = {
      timeZone: fromTz,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digits',
      minute: '2-digits',
      second: '2-digits',
      timeZoneName: 'long',
    };

    const fromFormatted = new Intl.DateTimeFormat('en-US', fromOptions).format(fromDate);

    // Convert to the "to" timezone
    const toOptions = {
      timeZone: toTz,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digits',
      minute: '2-digits',
      second: '2-digits',
      timeZoneName: 'long',
    };

    const toFormatted = new Intl.DateTimeFormat('en-US', toOptions).format(fromDate);

    // Calculate time difference
    const fromOffset = fromDate
      .toLocaleDateString('en-US', { timeZone: fromTz, timeZoneName: 'longOffset' })
      .split(' ')[2];
    const toOffset = fromDate
      .toLocaleDateString('en-US', { timeZone: toTz, timeZoneName: 'longOffset' })
      .split(' ')[2];

    // Display results
    convertedTime.textContent = toFormatted.split(', ')[1];
    convertedTimezone.textContent = `${toTz.replace(/_/g, ' ')} (${toOffset})`;

    timeDifference.textContent = `Time difference: ${fromOffset} (${fromTz.replace(/_/g, ' ')}) → ${toOffset} (${toTz.replace(/_/g, ' ')})`;

    // Highlight if the date changes
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
});
