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
});
