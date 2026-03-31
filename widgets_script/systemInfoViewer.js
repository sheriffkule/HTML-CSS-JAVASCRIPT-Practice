document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const startBtn = document.getElementById('startBtn');
  const loadingScreen = document.getElementById('loadingScreen');
  const appContainer = document.getElementById('appContainer');
  const progressBar = document.getElementById('progressBar');
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;

  // Check for saved preference
  if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  // Start Button Click Event
  startBtn.addEventListener('click', function () {
    // Show loading screen
    loadingScreen.classList.add('active');

    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress > 100) progress = 100;
      progressBar.style.width = '${progress}%';

      if (progress === 100) {
        clearInterval(interval);

        // Hide loading screen and show app container
        setTimeout(() => {
          loadingScreen.classList.remove('active');

          // Show app container
          appContainer.style.display = 'block';

          // Initialize the app
          initializeApp();
        }, 500);
      }
    }, 200);
  });

  // Dark mode toggle
  darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');

    if (isDarkMode) {
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem('darkMode', 'enabled');
    } else {
      darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem('darkMode', 'disabled');
    }
  });

  function initializeApp() {
    // Refresh button
    const refreshBtn = document.getElementById('refreshBtn');
    refreshBtn.addEventListener('click', updateAllInfo);

    // Get location button
    const getLocationBtn = document.getElementById('getLocationBtn');
    getLocationBtn.addEventListener('click', getGeolocation);

    // Initial update
    updateAllInfo();
    startClock();

    // Update network status in real-time
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
  }

  function updateAllInfo() {
    updateSystemInfo();
    updateBrowserInfo();
    updatePerformanceInfo();
    updateNetworkStatus();
    updateScreenInfo();
    updateLocationInfo();
  }
});
