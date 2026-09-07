// DOM Elements
const crystalBall = document.getElementById('crystalBall');
const crystalBallText = document.getElementById('crystalBallText');
const crystalFortune = document.getElementById('crystalFortune');
const crystalFortuneText = document.getElementById('crystalFortuneText');
const crystalCategory = document.getElementById('crystalCategory');
const askCrystalBtn = document.getElementById('askCrystalBtn');
const clearCrystalBtn = document.getElementById('clearCrystalBtn');
const crystalLoading = document.getElementById('crystalLoading');
const userQuestion = document.getElementById('userQuestion');
const userMood = document.getElementById('userMood');

const tarotCards = document.querySelectorAll('.tarot-card');
const tarotFortune = document.getElementById('tarotFortune');
const tarotFortuneText = document.getElementById('tarotFortuneText');
const tarotCategory = document.getElementById('tarotCategory');
const drawTarotBtn = document.getElementById('drawTarotBtn');
const clearTarotBtn = document.getElementById('clearTarotBtn');
const tarotLoading = document.getElementById('tarotLoading');
const tarotHint = document.getElementById('tarotHint');

const fortuneHistory = document.getElementById('fortuneHistory');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const themeToggle = document.getElementById('themeToggle');

// Fortune Data
const fortuneData = {
  categories: [
    'Love',
    'Career',
    'Health',
    'Wealth',
    'Personal Growth',
    'Relationships',
    'Travel',
    'Education',
  ],

  loveFortunes: [
    'A new romantic opportunity is approaching. Keep your heart open to unexpected connections.',
    'Your current relationship will deepen through shared experiences and honest communication.',
    'Self-love is the foundation for all other love. Take time to appreciate yourself fully.',
    'An old flame may reappear, offering closure or a chance to rekindle what was lost.',
    'Your compassionate nature will attract someone who values your kindness and empathy.',
  ],

  careerFortunes: [
    'A professional opportunity will present itself when you least expect it. Stay prepared.',
    "Your creative ideas will be recognized by those in authority. Don't hesitate to share them.",
    'A career change may be in your future, leading to greater fulfillment and balance.',
    'Networking will play a key role in your professional advancement this season.',
    'Your dedication to your craft will soon yield tangible rewards and recognition.',
  ],

  healthFortunes: [
    'Focus on balancing your physical and mental well-being. Small daily habits create lasting health.',
    "Listen to your body's signals. It's guiding you toward better self-care and nourishment.",
    'A new fitness journey will bring not only physical benefits but mental clarity as well.',
    'Stress management is crucial now. Find healthy outlets for release and relaxation.',
    'Your energy levels will improve as you align your activities with your natural rhythms.',
  ],

  wealthFortunes: [
    'Financial stability is within reach through careful planning and mindful spending.',
    'An unexpected financial opportunity will arise. Evaluate it carefully before committing.',
    'Your investments in personal development will yield greater returns than monetary ones.',
    'Sharing your resources with others will create abundance in unexpected ways.',
    'Financial wisdom gained from past experiences will guide you to smarter decisions.',
  ],

  personalGrowthFortunes: [
    "You are on the verge of a personal breakthrough. Trust the journey, even when it's challenging.",
    'Your self-awareness is expanding, allowing you to break free from limiting patterns.',
    'A mentor or guide will appear to help you navigate your next phase of development.',
    'Embrace vulnerability as a strength. It will lead to deeper connections and self-understanding.',
    'Your unique perspective is your greatest asset. Share it confidently with the world.',
  ],

  tarotMeanings: {
    past: [
      'The Moon card suggests your past was influenced by intuition and subconscious influences.',
      'The Hermit indicates a period of introspection and soul-searching in your past.',
      'The Tower reveals sudden changes that reshaped your path fundamentally.',
      'The Wheel of Fortune shows how cycles of fate have brought you to this moment.',
    ],
    present: [
      'The Sun card illuminates your current path with clarity and optimism.',
      "The Chariot indicates you're currently harnessing opposing forces to move forward.",
      'Justice represents balance and fair decisions influencing your present situation.',
      "Temperance suggests you're finding harmony by blending different aspects of your life.",
    ],
    future: [
      'The Star promises hope, inspiration, and serenity in your future path.',
      'The World indicates completion of a major cycle and the beginning of a new one.',
      'The Lovers foreshadows an important relationship decision that will shape your destiny.',
      'Strength reveals that courage and inner fortitude will guide you through future challenges.',
    ],
  },
};

// History array to store past readings
let history = loadHistory();

function loadHistory() {
  try {
    const storedHistory = JSON.parse(localStorage.getItem('fortuneHistory'));
    return Array.isArray(storedHistory) ? storedHistory : [];
  } catch {
    return [];
  }
}

// Initialize the app
function initApp() {
  // Load history from localStorage
  renderHistory();

  applyTheme(localStorage.getItem('fortuneTheme') || 'dark');

  document.getElementById('year').textContent = new Date().getFullYear();

  // Set up event listeners
  setupEventListeners();

  // Set initial crystal ball text
  updateCrystalBallText('Concentrate on your question and touch the crystal ball...');
}

// Set up all event listeners
function setupEventListeners() {
  // Crystal Ball interactions
  crystalBall.addEventListener('click', generateCrystalFortune);
  askCrystalBtn.addEventListener('click', generateCrystalFortune);
  clearCrystalBtn.addEventListener('click', clearCrystalFortune);

  // Tarot interactions
  tarotCards.forEach((card) => {
    card.addEventListener('click', function () {
      this.classList.toggle('selected');
      updateTarotHint();
    });
  });

  drawTarotBtn.addEventListener('click', generateTarotReading);
  clearTarotBtn.addEventListener('click', clearTarotReading);

  // History interaction
  clearHistoryBtn.addEventListener('click', clearHistory);

  // Theme toggle
  themeToggle.addEventListener('click', toggleTheme);

  // Crystal ball hover effect
  crystalBall.addEventListener('mouseenter', function () {
    updateCrystalBallText('The mist are clearing... I see something...');
  });

  crystalBall.addEventListener('mouseleave', function () {
    if (!crystalFortune.classList.contains('active')) {
      updateCrystalBallText('Touch the crystal ball to see your future...');
    }
  });
}

// Updata crystal ball text with animation
function updateCrystalBallText(text) {
  crystalBallText.style.opacity = '0';
  setTimeout(() => {
    crystalBallText.textContent = text;
    crystalBallText.style.opacity = '1';
  }, 300);
}

// Generate crystal ball fortune
function generateCrystalFortune() {
  const question = userQuestion.value.trim();
  const mood = userMood.value;

  if (!question) {
    alert('Please ask a question to get a fortune reading.');
    userQuestion.focus();
    return;
  }

  // Show loading animation
  crystalLoading.classList.add('active');

  // Simulate AI processing time
  setTimeout(
    () => {
      // Hide loading
      crystalLoading.classList.remove('active');

      // Get random category
      const category = fortuneData.categories[Math.floor(Math.random() * fortuneData.categories.length)];

      // Get random fortune based on category
      let fortune;
      switch (category) {
        case 'Love':
          fortune = fortuneData.loveFortunes[Math.floor(Math.random() * fortuneData.loveFortunes.length)];
          break;
        case 'Career':
          fortune = fortuneData.careerFortunes[Math.floor(Math.random() * fortuneData.careerFortunes.length)];
          break;
        case 'Health':
          fortune = fortuneData.healthFortunes[Math.floor(Math.random() * fortuneData.healthFortunes.length)];
          break;
        case 'Wealth':
          fortune = fortuneData.wealthFortunes[Math.floor(Math.random() * fortuneData.wealthFortunes.length)];
          break;
        case 'Personal Growth':
          fortune =
            fortuneData.personalGrowthFortunes[
              Math.floor(Math.random() * fortuneData.personalGrowthFortunes.length)
            ];
          break;
        default:
          // For other categories, pick from any fortune type
          const allFortunes = [
            ...fortuneData.loveFortunes,
            ...fortuneData.careerFortunes,
            ...fortuneData.healthFortunes,
            ...fortuneData.wealthFortunes,
            ...fortuneData.personalGrowthFortunes,
          ];
          fortune = allFortunes[Math.floor(Math.random() * allFortunes.length)];
          break;
      }

      // Add mood-specific phrasing
      const moodPhrases = {
        happy: 'Your positive energy amplifies this fortunate prediction.',
        curious: 'Your inquisitive nature will help you uncover deeper meanings.',
        anxious: 'Take comfort in knowing that challenges often lead to growth.',
        excited: 'Your enthusiasm is a powerful magnet for positive outcomes.',
        neutral: 'Your balanced perspective will serve you well in this situation.',
      };

      fortune = `${moodPhrases[mood]} ${fortune}`;

      // Display the fortune
      crystalFortuneText.textContent = fortune;
      crystalCategory.textContent = category;
      crystalFortune.classList.add('active');

      // Update crystal ball text
      updateCrystalBallText('The vision is clear...');

      // Add to history
      addToHistory({
        type: 'Crystal Ball',
        question: question,
        fortune: fortune,
        category: category,
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      });
    },
    1500 + Math.random() * 1000,
  );
}

// Clear crystal fortune
function clearCrystalFortune() {
  crystalFortune.classList.remove('active');
  userQuestion.value = '';
  updateCrystalBallText('Touch the crystal ball to see your fortune...');
}

// Update tarot hing based on selected cards
function updateTarotHint() {
  const selectedCards = document.querySelectorAll('.tarot-card.selected').length;

  if (selectedCards === 0) {
    tarotHint.textContent = 'Click each card to reveal its meaning.';
  } else if (selectedCards < 3) {
    tarotHint.textContent = `${selectedCards} of 3 cards selected`;
  } else {
    tarotHint.textContent = 'All cards selected! Click "Draw Tarot Cards" for your reading';
  }
}

// Generate tarot reading
function generateTarotReading() {
  // Reset all cards
  tarotCards.forEach((card) => card.classList.remove('active'));

  // Show loading
  tarotLoading.classList.add('active');
  tarotFortune.classList.remove('active');

  // Animate card selection
  let delay = 0;
  tarotCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('selected');

      // Add visual effect
      card.style.transform = `translateY(-15px) rotate(${index % 2 === 0 ? '5deg' : '-5deg'})`;

      // Update hint
      updateTarotHint();
    }, 500 + delay);
    delay += 400;
  });

  // Generate reading after animation
  setTimeout(() => {
    // Hide loading
    tarotLoading.classList.remove('active');

    // Get random meanings for each position
    const pastReading =
      fortuneData.tarotMeanings.past[Math.floor(Math.random() * fortuneData.tarotMeanings.past.length)];
    const presentReading =
      fortuneData.tarotMeanings.present[Math.floor(Math.random() * fortuneData.tarotMeanings.present.length)];
    const futureReading =
      fortuneData.tarotMeanings.future[Math.floor(Math.random() * fortuneData.tarotMeanings.future.length)];

    // Construct the full reading
    const reading = `
      <p><strong>Past:</strong> ${pastReading}</p>
      <p><strong>Present:</strong> ${presentReading}</p>
      <p><strong>Future:</strong> ${futureReading}</p>
      <p style="margin-top: 15px;">
        <em>The cards reveal a journey from reflection to action, leading toward fulfillment.</em>
      </p>
    `;

    // Display the reading
    tarotFortuneText.innerHTML = reading;
    tarotCategory.textContent = 'Tarot Reading';
    tarotFortune.classList.add('active');

    // Update hint
    tarotHint.textContent = 'Your three-card spread is complete.';

    // Add to history
    addToHistory({
      type: 'Tarot Reading',
      question: 'Three-card past, present, future reading',
      fortune: `${pastReading}, ${presentReading}, ${futureReading}`,
      category: 'Tarot',
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    });
  }, 2000);
}

// Clear tarot reading
function clearTarotReading() {
  tarotCards.forEach((card) => {
    card.classList.remove('selected');
    card.style.transform = '';
  });

  tarotFortune.classList.remove('active');
  tarotHint.textContent = 'Click each card to reveal its meaning.';
}

// Add fortune to history
function addToHistory(fortuneItem) {
  history.unshift(fortuneItem);

  // Keep only last 10 items
  if (history.length > 10) history = history.slice(0, 10);

  // Save to localStorage
  localStorage.setItem('fortuneHistory', JSON.stringify(history));

  // Update UI
  renderHistory();
}

// Render history to UI
function renderHistory() {
  if (history.length === 0) {
    fortuneHistory.innerHTML =
      '<p style="text-align: center; padding: 30px;">No Fortunes yet. Get your first reading!</p>';
    return;
  }

  fortuneHistory.innerHTML = history
    .map(
      (item) => `
      <div class="history-item">
        <div class="history-date">${escapeHtml(item.date)} • ${escapeHtml(item.type)}</div>
        <p><strong>Q:</strong> ${escapeHtml(item.question)}</p>
        <p><strong>A:</strong> ${escapeHtml(item.fortune.substring(0, 120))}${item.fortune.length > 120 ? '...' : ''}</p>
        <span class="fortune-category">${escapeHtml(item.category)}</span>
      </div>
    `,
    )
    .join('');
}

function escapeHtml(value) {
  const element = document.createElement('div');
  element.textContent = value;
  return element.innerHTML;
}

function clearHistory() {
  if (history.length === 0) return;

  if (confirm('Are you sure you want to clear your fortune history?')) {
    history = [];
    localStorage.removeItem('fortuneHistory');
    renderHistory();
  }
}

// Apply and persist the selected theme
function applyTheme(theme) {
  document.body.classList.toggle('light-theme', theme === 'light');

  if (theme === 'light') {
    // Light theme colors
    document.documentElement.style.setProperty('--dark', '#f8f4ff');
    document.documentElement.style.setProperty('--light', '#1a0933');
    document.documentElement.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.9)');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    // Dark theme colors (default)
    document.documentElement.style.setProperty('--dark', '#1a0933');
    document.documentElement.style.setProperty('--light', '#f8f4ff');
    document.documentElement.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.1)');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }

  themeToggle.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`);
  themeToggle.setAttribute('title', `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`);
}

// Toggle between light and dark theme
function toggleTheme() {
  const nextTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
  applyTheme(nextTheme);
  localStorage.setItem('fortuneTheme', nextTheme);
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
