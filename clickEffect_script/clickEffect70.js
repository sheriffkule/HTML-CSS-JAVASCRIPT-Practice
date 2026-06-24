function detectBrowser() {
  const loader = document.getElementById('loader');
  const result = document.getElementById('result');

  // Reset state
  loader.style.display = 'block';
  result.style.display = 'none';
  result.innerHTML = '';

  setTimeout(() => {
    // Detecting Browser Info
    const userAgent = navigator.userAgent;
    const browserName = navigator.appName;
    const appVersion = navigator.appVersion;
    const platform = navigator.platform;
    const language = navigator.language;

    // Show result
    loader.style.display = 'none';
    result.style.display = 'block';
    result.innerHTML = `
        <h3>Browser Details:</h3>
        <p><strong>Browser Name:</strong> ${browserName}</p>
        <p><strong>User Agent:</strong> ${userAgent}</p>
        <p><strong>Version:</strong> ${appVersion}</p>
        <p><strong>Platform:</strong> ${platform}</p>
        <p><strong>Language:</strong> ${language}</p>
        `;
  }, 2000);
}
