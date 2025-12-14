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

  let screenshotHistory = JSON.parse(localStorage.getItem('screenshotHistory')) || [];

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

  generateBtn.addEventListener('click', generateScreenshot);
  randomBtn.addEventListener('click', () => {
    urlInput.value = popularWebsites[Math.floor(Math.random() * popularWebsites.length)];
    generateScreenshot();
  });
  downloadBtn.addEventListener('click', downloadScreenshot);
  newBtn.addEventListener('click', resetForm);
  shareBtn.addEventListener('click', shareScreenshot);

  function generateScreenshot() {
    const url = urlInput.value.trim();

    if (!isValidUrl(url)) {
      showError('Please enter a valid URL starting with http:// or https://');
      return;
    }

    const resolution = resolutionSelect.value;
    const format = formatSelect.value;
    const device = deviceSelect.value;

    loading.style.display = 'block';
    error.style.display = 'none';
    result.style.display = 'none';

    const deviceWidth = {
      desktop: 1920,
      tablet: 800,
      mobile: 390,
    }[device];

    const deviceHeight = {
      desktop: 1080,
      tablet: 1200,
      mobile: 844,
    }[device];

    const apiKey = 'H62CE8T-Q48MZN0-KFSSEK4-N2SFMQW';

    const apiUrl =
      `https://shot.screenshotapi.net/screenshot?` +
      `token=${apiKey}` +
      `&url=${deviceWidth}` +
      `&height=${deviceHeight}` +
      `&output=${format}` +
      `&full_page=true`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        if (!data.screenshot) {
          showError('Failed to capture screenshot.');
          return;
        }

        const finalImage = data.screenshot;

        screenshotImg.src = finalImage;
        result.style.display = 'block'

        addToHistory(url, finalImage)

        result.scrollIntoView({behavior: 'smooth'})
      })
      .catch(() => {
        showError("Unable to connect to screenshot service.")
      })
      .finally(() => {
        loading.style.display = 'none'
      })
  }

  
});
