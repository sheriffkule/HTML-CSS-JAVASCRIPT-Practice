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
});
