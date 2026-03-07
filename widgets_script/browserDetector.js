function detectBrowser() {
  const loader = document.getElementById('loader');
  const resultDiv = document.getElementById('result');

  // Result state
  loader.style.display = 'flex';
  resultDiv.style.display = 'none';
  resultDiv.innerHTML = '';

  setTimeout(() => {
          // Time zone and local time
          const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          const localTime = new Date().toLocaleString();
        // JavaScript enabled/disabled
        const jsEnabled = 'Yes'; // If this code runs, JS is enabled
      // Cookies enabled/disabled
      const cookiesEnabled = navigator.cookieEnabled ? 'Enabled' : 'Disabled';
    // Screen resolution and color depth
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const colorDepth = window.screen.colorDepth;
    // Detecting Browser info
    const userAgent = navigator.userAgent;
    const appVersion = navigator.appVersion;
    const platform = navigator.platform;
    const language = navigator.language;

    // Device type detection
    function getDeviceType() {
      const ua = userAgent.toLowerCase();
      if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/.test(ua)) {
        return 'Mobile';
      } else if (/tablet|ipad|playbook|silk/.test(ua)) {
        return 'Tablet';
      } else {
        return 'Desktop';
      }
    }
    const deviceType = getDeviceType();

    // Browser type/version detection
    function getBrowserInfo() {
      let name = 'Unknown',
        version = 'Unknown';
      if (/chrome|crios|crmo/i.test(userAgent)) {
        name = 'Chrome';
        version = userAgent.match(/Chrome\/([0-9.]+)/)?.[1] || 'Unknown';
      } else if (/firefox|fxios/i.test(userAgent)) {
        name = 'Firefox';
        version = userAgent.match(/Firefox\/([0-9.]+)/)?.[1] || 'Unknown';
      } else if (/safari/i.test(userAgent) && !/chrome|crios|crmo/i.test(userAgent)) {
        name = 'Safari';
        version = userAgent.match(/Version\/([0-9.]+)/)?.[1] || 'Unknown';
      } else if (/edg/i.test(userAgent)) {
        name = 'Edge';
        version = userAgent.match(/Edg\/([0-9.]+)/)?.[1] || 'Unknown';
      } else if (/opera|opr/i.test(userAgent)) {
        name = 'Opera';
        version = userAgent.match(/(Opera|OPR)\/([0-9.]+)/)?.[2] || 'Unknown';
      }
      return { name, version };
    }
    const browserInfo = getBrowserInfo();

    // Show result
    loader.style.display = 'none';
    resultDiv.style.display = 'block';
    const onlineStatus = navigator.onLine ? 'Online' : 'Offline';
    resultDiv.innerHTML = `
      <h3>Browser Details:</h3>
      <p class="details"><strong>Browser Type:</strong> ${browserInfo.name}</p>
      <p class="details"><strong>Browser Version:</strong> ${browserInfo.version}</p>
      <p class="details"><strong>User Agent:</strong> ${userAgent}</p>
      <p class="details"><strong>App Version:</strong> ${appVersion}</p>
      <p class="details"><strong>Platform:</strong> ${platform}</p>
      <p class="details"><strong>Language: </strong> ${language}</p>
      <p class="details"><strong>Status:</strong> ${onlineStatus}</p>
      <p class="details"><strong>Device Type:</strong> ${deviceType}</p>
      <p class="details"><strong>Screen Resolution:</strong> ${screenWidth} x ${screenHeight}</p>
      <p class="details"><strong>Color Depth:</strong> ${colorDepth} bit</p>
      <p class="details"><strong>Cookies:</strong> ${cookiesEnabled}</p>
      <p class="details"><strong>JavaScript Enabled:</strong> ${jsEnabled}</p>
      <p class="details"><strong>Time Zone:</strong> ${timeZone}</p>
      <p class="details"><strong>Local Time:</strong> ${localTime}</p>
      <button id="copyDetailsBtn" class="btn">Copy Details</button>
    `;

    // Copy details handler
    document.getElementById('copyDetailsBtn').onclick = function() {
      const detailsText = `
    Browser Type: ${browserInfo.name}
    Browser Version: ${browserInfo.version}
    User Agent: ${userAgent}
    App Version: ${appVersion}
    Platform: ${platform}
    Language: ${language}
    Status: ${onlineStatus}
    Device Type: ${deviceType}
    Screen Resolution: ${screenWidth} x ${screenHeight}
    Color Depth: ${colorDepth} bit
    Cookies: ${cookiesEnabled}
    JavaScript Enabled: ${jsEnabled}
    Time Zone: ${timeZone}
    Local Time: ${localTime}
    `;
      navigator.clipboard.writeText(detailsText)
        .then(() => {
          alert('Details copied to clipboard!');
        })
        .catch(() => {
          alert('Failed to copy details.');
        });
    };
  }, 2000);
}
