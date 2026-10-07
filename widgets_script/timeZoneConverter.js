document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const themeToggle = document.getElementById('themeToggle');
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  // Converter elements
  const dateInput = document.getElementById('dateInput');
  const timeInput = document.getElementById('timeInput');
  const fromTimezone = document.getElementById('fromTimezone');
  const toTImezone = document.getElementById('toTImezone');
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
  loadFavorites()

  function populateTimezones() {}

  function setDefaultTimezone() {}
});
