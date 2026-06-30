document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const wordInput = document.getElementById('word-input');
  const searchBtn = document.getElementById('search-btn');
  const resultsContainer = document.getElementById('results-container');
  const searchedWord = document.getElementById('searched-word');
  const wordType = document.getElementById('word-type');
  const antonymsList = document.getElementById('antonyms-list');
  const loading = document.getElementById('loading');
  const errorMessage = document.getElementById('error-message');
  const historyList = document.getElementById('history-list');
  const copyBtn = document.getElementById('copy-btn');

  // API configuration
  const apiUrl = 'https://api.datamuse.com/words?rel_ant=';

  // Search history array
  let searchHistory = JSON.parse(localStorage.getItem('antonymSearchHistory')) || [];

  // Display search history
  function displayHistory() {
    historyList.innerHTML = '';
    // Display only unique items and limit to 10
    const uniqueHistory = [...new Set(searchHistory)].slice(0, 10);

    uniqueHistory.forEach((word) => {
      const historyItem = document.createElement('div');
      historyItem.className = 'history-item';
      historyItem.textContent = word;
      historyItem.addEventListener('click', () => {
        wordInput.value = word;
        searchBtn.click();
      });
      historyList.appendChild(historyItem);
    });
  }

  // Initialize history display
  displayHistory();

  // Fetch antonyms from API
  async function fetchAntonyms(word) {
    try {
      loading.style.display = 'block';
      resultsContainer.style.display = 'none';
      errorMessage.style.display = 'none';

      const response = await fetch(`${apiUrl}${word}&max=20`);
      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      loading.style.display = 'none';

      if (data.length === 0) {
        throw new Error('No antonyms found for this word.');
      }

      return data;
    } catch (error) {
      loading.style.display = 'none';
      errorMessage.textContent = error.message;
      errorMessage.style.display = 'block';
      return [];
    }
  }

  // Display antonyms
  function displayAntonyms(word, antonymsData) {
    searchedWord.textContent = word;

    // Try to get word type (part of speech) if available
    const firstAntonym = antonymsData[0];
    if (firstAntonym.tags && firstAntonym.tags.includes('adj')) {
      wordType.textContent = ' (adjective)';
    } else if (firstAntonym.tags && firstAntonym.tags.includes('n')) {
      wordType.textContent = ' (noun)';
    } else if (firstAntonym.tags && firstAntonym.tags.includes('v')) {
      wordType.textContent = ' (verb)';
    } else {
      wordType.textContent = '';
    }

    antonymsList.innerHTML = '';
    antonymsData.forEach((item) => {
      const antonymCard = document.createElement('div');
      antonymCard.className = 'antonym-card';
      antonymCard.textContent = item.word;
      antonymCard.addEventListener('click', function () {
        // Toggle selection
        document.querySelectorAll('.antonym-card').forEach((card) => {
          card.classList.remove('selected');
        });
        this.classList.add('selected');
        wordInput.value = this.textContent;
      });
      antonymsList.appendChild(antonymCard);
    });

    resultsContainer.style.display = 'block';
  }

  // Handle search
  searchBtn.addEventListener('click', async function () {
    const word = wordInput.value.trim();
    if (!word) {
      errorMessage.textContent = 'Please enter a word to search';
      errorMessage.style.display = 'block';
      return;
    }

    // Add to search history
    if (!searchHistory.includes(word.toLowerCase())) {
      searchHistory.unshift(word.toLowerCase());
      localStorage.setItem('antonymSearchHistory', JSON.stringify(searchHistory));
      displayHistory();
    }

    const antonymsData = await fetchAntonyms(word);
    if (antonymsData.length > 0) {
      displayAntonyms(word, antonymsData);
    }
  });

  // Allow search on Enter key
  wordInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      searchBtn.click();
    }
  });

  // Copy antonyms to clipboard
  copyBtn.addEventListener('click', function () {
    const antonyms = Array.from(document.querySelectorAll('.antonym-card'))
      .map((card) => card.textContent)
      .join(', ');

    if (!antonyms) return;

    navigator.clipboard.writeText(`Antonyms for ${searchedWord.textContent}: ${antonyms}`).then(() => {
      const originalText = copyBtn.innerHTML;
      copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
      setTimeout(() => {
        copyBtn.innerHTML = originalText;
      }, 2000);
    });
  });

  // Sample words suggestion on focus
  wordInput.addEventListener('focus', function () {
    if (!this.value) {
      this.placeholder = 'e.g., happy, light, up, love, fast...';
    }
  });

  wordInput.addEventListener('blur', function () {
    this.placeholder = 'Enter a word (e.g., happy, light, up)...';
  });

  // Update year in footer
  function updateYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('year');

    if (!yearElement) {
      console.error('Year element not found');
      return;
    }
    yearElement.setAttribute('datetime', currentYear.toString());
    yearElement.textContent = currentYear.toString();
  }
  updateYear();
});
