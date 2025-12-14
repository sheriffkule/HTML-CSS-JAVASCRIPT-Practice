document.addEventListener('DOMContentLoaded', () => {
  const urlInput = document.querySelector('.url-input');
  const generateBtn = document.getElementById('generate-btn');
  const randomBtn = document.getElementById('random-btn');
  const deviceSelect = document.getElementById('device');
  const resolutionSelect = document.getElementById('resolution');
  const formatSelect = document.getElementById('format');
  const loading = document.getElementById('loading');
  const error = document.getElementById('error');
  const result = document.getElementById('result');
  const screenshotImg = document.getElementById('screenshot-img');
  const downloadBtn = document.getElementById('download-btn');
  const newBtn = document.getElementById('new-btn');
  const shareBtn = document.getElementById('share-btn');
  const errorMessage = document.getElementById('error-message');
  const historyItems = document.getElementById('history-items');

  // Load and sanitize history
  let screenshotHistory = JSON.parse(localStorage.getItem('screenshotHistory')) || [];
  if (!Array.isArray(screenshotHistory)) screenshotHistory = [];
  screenshotHistory = screenshotHistory
    .map((h) => ({
      url: h && h.url ? String(h.url) : null,
      imageUrl: h && h.imageUrl ? String(h.imageUrl) : null,
    }))
    .filter((h) => h.url && h.imageUrl);

  const popularWebsites = [
    'https://google.com',
    'https://github.com',
    'https://stackoverflow.com',
    'https://wikipedia.org',
    'https://nytimes.com',
    'https://bbc.com',
    'https://apple.com',
    'https://microsoft.com',
    'https://amazon.com',
    'https://youtube.com',
  ];

  if (generateBtn) generateBtn.addEventListener('click', generateScreenshot);
  if (randomBtn)
    randomBtn.addEventListener('click', () => {
      if (urlInput) urlInput.value = popularWebsites[Math.floor(Math.random() * popularWebsites.length)];
      generateScreenshot();
    });
  if (downloadBtn) downloadBtn.addEventListener('click', downloadScreenshot);
  if (newBtn) newBtn.addEventListener('click', resetForm);
  if (shareBtn) shareBtn.addEventListener('click', shareScreenshot);

  function generateScreenshot() {
    const url = urlInput ? urlInput.value.trim() : '';

    if (!isValidUrl(url)) {
      showError('Please enter a valid URL starting with http:// or https://');
      return;
    }

    const resolution = resolutionSelect ? resolutionSelect.value : '';
    const format = formatSelect ? formatSelect.value : 'png';
    const device = deviceSelect ? deviceSelect.value : 'desktop';

    if (loading) loading.style.display = 'block';
    if (error) error.style.display = 'none';
    if (result) result.style.display = 'none';

    const widths = { desktop: 1920, tablet: 800, mobile: 390 };
    const heights = { desktop: 1080, tablet: 1200, mobile: 844 };

    const deviceWidth = widths[device] || 1280;
    const deviceHeight = heights[device] || 800;

    const apiKey = 'H62CE8T-Q48MZN0-KFSSEK4-N2SFMQW';

    // Build API URL properly
    const params = new URLSearchParams({
      token: apiKey,
      url: url,
      width: deviceWidth,
      height: deviceHeight,
      output: format,
      full_page: 'true',
    });

    const apiUrl = `https://shot.screenshotapi.net/screenshot?${params.toString()}`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        if (!data || !data.screenshot) {
          showError('Failed to capture screenshot.');
          return;
        }

        const finalImage = data.screenshot;

        if (screenshotImg) screenshotImg.src = finalImage;
        if (result) result.style.display = 'block';

        addToHistory(url, finalImage);

        if (result) result.scrollIntoView({ behavior: 'smooth' });
      })
      .catch(() => {
        showError('Unable to connect to screenshot service.');
      })
      .finally(() => {
        if (loading) loading.style.display = 'none';
      });
  }

  function downloadScreenshot() {
    if (!screenshotImg || !screenshotImg.src) {
      showError('No screenshot available to download.');
      return;
    }

    const link = document.createElement('a');
    link.href = screenshotImg.src;
    link.download = `screenshot-${Date.now()}.${formatSelect ? formatSelect.value : 'png'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function shareScreenshot() {
    const shareUrl = screenshotImg && screenshotImg.src ? screenshotImg.src : null;
    if (!shareUrl) {
      showError('Nothing to share yet.');
      return;
    }

    if (navigator.share) {
      navigator
        .share({
          title: 'Website Screenshot',
          text: urlInput ? urlInput.value : '',
          url: shareUrl,
        })
        .catch((err) => console.error('Share failed:', err));
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(shareUrl)
        .then(() => {
          // Use showError as a simple message display here for consistency
          showError('Screenshot link copied to clipboard!');
          setTimeout(() => {
            if (error) error.style.display = 'none';
          }, 1500);
        })
        .catch((err) => console.error('Clipboard write failed:', err));
    } else {
      // Fallback: create a temporary textarea
      const ta = document.createElement('textarea');
      ta.value = shareUrl;
      ta.setAttribute('readonly', '');
      ta.style.position = 'absolute';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        showError('Screenshot link copied to clipboard!');
        setTimeout(() => {
          if (error) error.style.display = 'none';
        }, 1500);
      } catch (err) {
        console.error('Fallback clipboard failed:', err);
      }
      document.body.removeChild(ta);
    }
  }

  function resetForm() {
    if (result) result.style.display = 'none';
    if (urlInput) urlInput.value = 'https://';
    if (error) error.style.display = 'none';
    if (urlInput) urlInput.focus();
  }

  function showError(msg) {
    if (errorMessage) errorMessage.textContent = msg;
    if (error) error.style.display = 'block';
    if (result) result.style.display = 'none';
    if (loading) loading.style.display = 'none';
  }

  function isValidUrl(u) {
    try {
      new URL(u);
      return true;
    } catch {
      return false;
    }
  }

  function addToHistory(url, img) {
    if (!url || !img) return;

    screenshotHistory.unshift({ url: String(url), imageUrl: String(img) });
    if (screenshotHistory.length > 6) screenshotHistory.pop();
    localStorage.setItem('screenshotHistory', JSON.stringify(screenshotHistory));
    renderHistory();
  }

  function renderHistory() {
    if (!historyItems) return;
    historyItems.innerHTML = '';

    if (screenshotHistory.length === 0) {
      historyItems.innerHTML = '<p>No screenshots yet.</p>';
      return;
    }

    screenshotHistory.forEach((item) => {
      if (!item || !item.imageUrl || !item.url) return;

      const div = document.createElement('div');
      div.className = 'history-item';

      div.innerHTML = `
          <img src="${item.imageUrl}" class="history-thumbnail" />
          <div class="history-url">${item.url}</div>
        `;

      div.onclick = () => {
        if (urlInput) urlInput.value = item.url;
        generateScreenshot();
      };

      historyItems.appendChild(div);
    });
  }
});
function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');

  if (!yearElement) {
    console.error('Year element not found');
    return;
  }

  if (yearElement) {
    yearElement.setAttribute('datetime', currentYear.toString());
    yearElement.dateTime = currentYear.toString();
    yearElement.textContent = currentYear.toString();
  }
}

updateYear();