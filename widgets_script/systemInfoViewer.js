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

  function updateSystemInfo() {
    // Platform and CPU info
    document.getElementById('platform').textContent = navigator.platform || 'Not Available';
    document.getElementById('userAgent').textContent = navigator.userAgent || 'Not Available';

    // Hardware concurrency (number of logical processors)
    const logicalCores = navigator.hardwareConcurrency || 'Not Available';
    document.getElementById('logicalCores').textContent = logicalCores;

    // Device memory (in GB)
    const deviceMemory = navigator.deviceMemory || 'Not Available';
    document.getElementById('deviceMemory').textContent =
      deviceMemory !== 'Not Available' ? `${deviceMemory} GB` : 'Not Available';

    // Max touch points
    document.getElementById('maxTouchPoints').textContent = navigator.maxTouchPoints || 'Not Available';
  }

  function updateBrowserInfo() {
    // Parse user agent for browser name and version
    const userAgent = navigator.userAgent;
    let browserName = 'Unknown';
    let browserVersion = 'Unknown';

    // Detect browser name and version using regex
    if (userAgent.indexOf('Firefox') > -1) {
      browserName = 'Mozilla Firefox';
      browserVersion = userAgent.match(/Firefox\/([0-9.]+)/)[1];
    } else if (userAgent.indexOf('SamsungBrowser') > -1) {
      browserName = 'Samsung Browser';
      browserVersion = userAgent.match(/SamsungBrowser\/([0-9.]+)/)[1];
    } else if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) {
      browserName = 'Opera';
      browserVersion = userAgent.match(/(?:Opera|OPR)\/([0-9.]+)/)[1];
    } else if (userAgent.indexOf('Trident') > -1) {
      browserName = 'Internet Explorer';
      browserVersion = userAgent.match(/rv:([0-9.]+)/)[1];
    } else if (userAgent.indexOf('Edge') > -1) {
      browserName = 'Microsoft Edge';
      browserVersion = userAgent.match(/Edge\/([0-9.]+)/)[1];
    } else if (userAgent.indexOf('Chrome') > -1) {
      browserName = 'Google Chrome';
      browserVersion = userAgent.match(/Chrome\/([0-9.]+)/)[1];
    } else if (userAgent.indexOf('Safari') > -1) {
      browserName = 'Apple Safari';
      browserVersion = userAgent.match(/Version\/([0-9.]+)/)[1];
    }

    document.getElementById('browserName').textContent = browserName;
    document.getElementById('browserVersion').textContent = browserVersion;

    // Cookies enabled
    document.getElementById('cookiesEnabled').textContent = navigator.cookieEnabled ? 'Yes' : 'No';

    // Online status
    updateNetworkStatus();
    // Language
    document.getElementById('language').textContent = navigator.language || 'Not Available';
  }

  function updatePerformanceInfo() {
    // CPU cores (same as logical cores)
    const logicalCores = navigator.hardwareConcurrency || 'Not Available';
    document.getElementById('cpuCores').textContent = logicalCores;

    // Memory info (not widely supported)
    simulateRamUsage();

    // Battery status
    if ('getBattery' in navigator) {
      navigator.getBattery().then((battery) => {
        document.getElementById('batteryLevel').textContent = `${Math.round(battery.level * 100)}%`;
        document.getElementById('batteryCharging').textContent = battery.charging ? 'Yes' : 'No';

        // Add event listeners for battery changes
        battery.addEventListener('chargingchange', () => updateBatteryInfo(battery));
        battery.addEventListener('levelchange', () => updateBatteryInfo(battery));
      });
    } else {
      document.getElementById('batteryStatus').textContent = 'API Not Available';
      document.getElementById('batteryPercent').textContent = 'N/A';
      document.getElementById('batteryContainer').style.display = 'none';
    }
  }

  function simulateRamUsage() {
    // Simulate RAM usage since navigator.deviceMemory is not widely supported
    const totalRAM = navigator.deviceMemory * 1024 || 8192; // Assume 8GB if not available
    const usedRAM = Math.floor(Math.random() * totalRAM * 0.7 + totalRAM * 0.3); // Random between 30%-100%
    const ramPercent = Math.round((usedRAM / totalRAM) * 100);

    document.getElementById('ramUsage').textContent = `${usedRAM} / ${totalRAM} MB`;
    document.getElementById('ramPercent').textContent = `${ramPercent}%`;

    const ramProgress = document.getElementById('ramProgress');
    ramProgress.style.width = `${ramPercent}%`;
    if (ramPercent > 80) {
      ramProgress.style.background = 'linear-gradient(90deg, var(--danger), #ff6b6b)';
    } else if (ramPercent > 60) {
      ramProgress.style.backgroundColor = 'linear-gradient(90deg, var(--warning), #ff922b)';
    } else {
      ramProgress.style.backgroundColor = 'linear-gradient(90deg, var(--primary), var(--accent))';
    }
  }

  function updateBatteryStatus(battery) {
    const batteryPercent = Math.round(battery.level * 100);
    let status = '';

    if (battery.charging) {
      status = `Charging (${batteryPercent}%)`;
      if (battery.level === 1) status = 'Fully Charged';
    } else {
      status = `${batteryPercent}% remaining`;
      // Estimate time remaining (not accurate, just for display)
      if (battery.dischargingTime !== Infinity) {
        const hours = Math.floor(battery.dischargingTime / 3600);
        const minutes = Math.floor((battery.dischargingTime % 3600) / 60);
        status += `, ≈ ${hours}h ${minutes}m remaining`;
      }
    }

    document.getElementById('batteryStatus').textContent = status;
    document.getElementById('batteryPercent').textContent = `${batteryPercent}%`;

    const batteryLevel = document.getElementById('batteryLevel');
    batteryLevel.style.width = `${batteryPercent}%`;

    // Change color based on battery level
    if (batteryPercent <= 20) {
      batteryLevel.style.background = 'var(--danger)';
    } else if (batteryPercent <= 50) {
      batteryLevel.style.background = 'var(--warning)';
    } else {
      batteryLevel.style.background = 'var(--success)';
    }
  }

  function updateNetworkInfo() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    if (connection) {
      document.getElementById('connectionType').textContent = connection.type || 'Unknown';
      document.getElementById('effectiveType').textContent = connection.effectiveType || 'Unknown';
      document.getElementById('downlink').textContent = connection.downlink
        ? `${connection.downlink} Mbps`
        : 'Unknown';
      document.getElementById('rtt').textContent = connection.rtt ? `${connection.rtt} ms` : 'Unknown';
      document.getElementById('saveData').textContent = connection.saveData ? 'Enabled' : 'Disabled';

      // Add event listener for changes in network information
      connection.addEventListener('change', updateNetworkInfo);
    } else {
      document.getElementById('connectionType').textContent = 'API not available';
      document.getElementById('effectiveType').textContent = 'N/A';
      document.getElementById('downlink').textContent = 'N/A';
      document.getElementById('rtt').textContent = 'N/A';
      document.getElementById('saveData').textContent = 'N/A';
    }

    updateNetworkStatus();
  }

  function updateNetworkStatus() {
    // Screen resolution
    const width = window.screen.width;
    const height = window.screen.height;
    document.getElementById('screenResolution').textContent = `${width} x ${height} pixels`;

    // Color depth
    document.getElementById('colorDepth').textContent = `${window.screen.colorDepth}-bit`;

    // Orientation
    let orientation = 'Portrait';
    if (window.screen.orientation) {
      orientation = window.screen.orientation.type.includes('landscape') ? 'Landscape' : 'Portrait';
    } else if (window.innerWidth > window.innerHeight) {
      orientation = 'Landscape';
    }
    document.getElementById('orientation').textContent = orientation;

    // Pixel ratio
    document.getElementById('pixelRatio').textContent = window.devicePixelRatio || '1';

    // Viewport size
    document.getElementById('viewportSize').textContent =
      `${window.innerWidth} x ${window.innerHeight} pixels`;

    // Add event listeners for changes in screen orientation and size
    window.addEventListener('resize', () => {
      document.getElementById('viewportSize').textContent =
        `${window.innerWidth} x ${window.innerHeight} pixels`;

      // Update orientation on resize
      let newOrientation = 'Portrait';
      if (window.screen.orientation) {
        newOrientation = window.screen.orientation.type.includes('landscape') ? 'Landscape' : 'Portrait';
      } else if (window.innerWidth > window.innerHeight) {
        newOrientation = 'Landscape';
      }

      if (newOrientation !== orientation) {
        orientation = newOrientation;
        document.getElementById('orientation').textContent = orientation;
      }
    });

    if (window.screen.orientation) {
      window.screen.orientation.addEventListener('change', () => {
        newOrientation = window.screen.orientation.type.includes('landscape') ? 'Landscape' : 'Portrait';
        document.getElementById('orientation').textContent = newOrientation;
      });
    }
  }

  function updateLocationInfo() {
    // Timezone
    document.getElementById('timezone').textContent = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Not Available';

    // Update clock continuosly
    startClock();

    // IP address (simulated as this requires external API)
    simulateIPAddress();
  }

  function startClock() {
    updateClock();
    setInterval(updateClock, 1000);
  }

  function simulateIPAddress() {
    // Simulate IP address since we can't fetch it without an external API
    const fakeIPs = [
      '192.168.1.1',
      '10.0.0.1',
      '172.16.0.1',
      '203.0.112.42',
      '192.51.100.1'
    ];

    const randomIP = fakeIPs[Math.floor(Math.random() * fakeIPs.length)];
    document.getElementById('ipAddress').textContent = randomIP;
  }
});
