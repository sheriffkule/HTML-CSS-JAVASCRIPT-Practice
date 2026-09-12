document.addEventListener('DOMContentLoaded', function () {
  // Morse code dictionary
  const morseCode = {
    A: '.-',
    B: '-...',
    C: '-.-.',
    D: '-..',
    E: '.',
    F: '..-.',
    G: '--.',
    H: '....',
    I: '..',
    J: '.---',
    K: '-.-',
    L: '.-..',
    M: '--',
    N: '-.',
    O: '---',
    P: '.--.',
    Q: '--.-',
    R: '.-.',
    S: '...',
    T: '-',
    U: '..-',
    V: '...-',
    W: '.--',
    X: '-..-',
    Y: '-.--',
    Z: '--..',
    0: '-----',
    1: '.----',
    2: '..---',
    3: '...--',
    4: '....-',
    5: '.....',
    6: '-....',
    7: '--...',
    8: '---..',
    9: '----.',
    '.': '.-.-.-',
    ',': '--..--',
    '?': '..--..',
    "'": '.----.',
    '!': '-.-.--',
    '/': '-..-.',
    '(': '-.--.',
    ')': '-.--.-',
    '&': '.-...',
    ':': '---...',
    ';': '-.-.-.',
    '=': '-...-',
    '+': '.-.-.',
    '-': '-....-',
    _: '..--.-',
    '"': '.-..-.',
    $: '...-..-',
    '@': '.--.-.',
    ' ': '/',
  };

  // Reverse dictionary for Morse to text
  const textCode = {};
  for (const [key, value] of Object.entries(morseCode)) {
    textCode[value] = key;
  }

  // DOM Elements
  const inputText = document.getElementById('inputText');
  const morseOutput = document.getElementById('morseOutput');
  const toMorseBtn = document.getElementById('toMorseBtn');
  const toTextBtn = document.getElementById('toTextBtn');
  const clearBtn = document.getElementById('clearBtn');
  const playBtn = document.getElementById('playBtn');
  const flashBtn = document.getElementById('flashBtn');
  const copyBtn = document.getElementById('copyBtn');
  const flashElement = document.getElementById('flash');
  const speedSlider = document.getElementById('speed');
  const speedValue = document.getElementById('speedValue');
  const morseTable = document.getElementById('morseTable');
  const historyList = document.getElementById('historyList');
  const HISTORY_STORAGE_KEY = 'morseTranslatorHistory';
  let flashTimers = [];

  function clearFlashTimers() {
    flashTimers.forEach((timer) => clearTimeout(timer));
    flashTimers = [];
  }

  // Generate Morse code table
  for (const [char, code] of Object.entries(morseCode)) {
    const div = document.createElement('div');
    div.className = 'morse-item';
    div.innerHTML = `<div class="char">${char}</div><div class="code">${code}</div>`;
    morseTable.appendChild(div);
  }

  // Update speed value display
  speedSlider.addEventListener('input', () => {
    speedValue.textContent = speedSlider.value;
  });

  // Convert text to Morse code
  toMorseBtn.addEventListener('click', () => {
    const text = inputText.value.toUpperCase();
    let morse = '';

    for (const char of text) {
      if (char === ' ') {
        morse += '/ ';
      } else if (morseCode[char]) {
        morse += morseCode[char] + ' ';
      } else {
        morse += '? ';
      }
    }

    const translatedMorse = morse.trim();
    morseOutput.textContent = translatedMorse;
    addToHistory(`Text to Morse: ${text} → ${translatedMorse}`);
  });

  // Convert Morse code to text
  toTextBtn.addEventListener('click', () => {
    const morse = inputText.value.trim();
    const morseChars = morse.split(/\s+/).filter(Boolean);
    let text = '';

    for (const morseChar of morseChars) {
      if (morseChar === '/') {
        text += ' ';
      } else if (textCode[morseChar]) {
        text += textCode[morseChar];
      } else {
        text += '?';
      }
    }

    morseOutput.textContent = text;
    addToHistory(`Morse to Text: ${morse} → ${text}`);
  });

  // Clear input and output
  clearBtn.addEventListener('click', () => {
    inputText.value = '';
    morseOutput.textContent = 'Your Morse code will appear here...';
  });

  // Copy Morse code to clipboard
  copyBtn.addEventListener('click', () => {
    const textToCopy = morseOutput.textContent.trim();
    if (!textToCopy || textToCopy === 'Your Morse code will appear here...') {
      return;
    }

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
          copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
        }, 2000);
      })
      .catch(() => {
        copyBtn.innerHTML = '<i class="fas fa-times"></i> Copy Failed';
        setTimeout(() => {
          copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
        }, 2000);
      });
  });

  // Play Morse code as sound
  playBtn.addEventListener('click', () => {
    const morse = morseOutput.textContent;
    if (morse === 'Your Morse code will appear here...') return;

    playMorseSound(morse);
  });

  // Flash Morse code visually
  flashBtn.addEventListener('click', () => {
    const morse = morseOutput.textContent;
    if (morse === 'Your Morse code will appear here...') return;

    flashMorseCode(morse);
  });

  // Play Morse code as sound
  function playMorseSound(morse) {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = context.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.value = 600;

    const gainNode = context.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    const time = context.currentTime;
    const speed = parseInt(speedSlider.value);
    const dotLength = 0.12 - speed * 0.01;

    oscillator.start(time);

    let timeOffset = 0;
    for (const char of morse) {
      if (char === '.') {
        gainNode.gain.setValueAtTime(1, time + timeOffset);
        timeOffset += dotLength;
        gainNode.gain.setValueAtTime(0, time + timeOffset);
      } else if (char === '-') {
        gainNode.gain.setValueAtTime(1, time + timeOffset);
        timeOffset += dotLength * 3;
        gainNode.gain.setValueAtTime(0, time + timeOffset);
      } else if (char === ' ') {
        timeOffset += dotLength * 2;
      }

      // Add gap between symbols
      timeOffset += dotLength;
    }

    oscillator.stop(time + timeOffset);
  }

  // Flash Morse code visually
  function flashMorseCode(morse) {
    clearFlashTimers();
    flashElement.style.opacity = 0;

    const speed = parseInt(speedSlider.value, 10) || 5;
    const dotLength = Math.max(80, 1200 / speed);
    let delay = 0;

    flashBtn.innerHTML = '<i class="fas fa-lightbulb"></i> Flashing...';

    for (const char of morse) {
      if (char === '.') {
        flashTimers.push(
          setTimeout(() => {
            flashElement.style.opacity = 1;
          }, delay),
        );
        flashTimers.push(
          setTimeout(() => {
            flashElement.style.opacity = 0;
          }, delay + dotLength),
        );
        delay += dotLength + dotLength / 2;
      } else if (char === '-') {
        flashTimers.push(
          setTimeout(() => {
            flashElement.style.opacity = 1;
          }, delay),
        );
        flashTimers.push(
          setTimeout(
            () => {
              flashElement.style.opacity = 0;
            },
            delay + dotLength * 3,
          ),
        );
        delay += dotLength * 3 + dotLength / 2;
      } else if (char === ' ' || char === '/') {
        flashTimers.push(
          setTimeout(() => {
            flashElement.style.opacity = 0;
          }, delay),
        );
        delay += dotLength * 2;
      }
    }

    flashTimers.push(
      setTimeout(() => {
        flashBtn.innerHTML = '<i class="fas fa-lightbulb"></i> Start Flashing';
        flashElement.style.opacity = 0;
      }, delay + 200),
    );
  }

  // History persistence
  function loadHistory() {
    try {
      const savedHistory = JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY) || '[]');
      return Array.isArray(savedHistory) ? savedHistory.slice(0, 10) : [];
    } catch (error) {
      console.error('Failed to load history:', error);
      return [];
    }
  }

  function saveHistory(entries) {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(entries.slice(0, 10)));
    } catch (error) {
      console.error('Failed to save history:', error);
    }
  }

  function renderHistory(entries) {
    historyList.innerHTML = '';

    entries.forEach((entry) => {
      const historyItem = document.createElement('div');
      historyItem.className = 'history-item';

      const text = document.createElement('span');
      text.className = 'history-text';
      text.textContent = entry;

      const actions = document.createElement('div');
      actions.className = 'history-actions';

      const copyHistoryBtn = document.createElement('button');
      copyHistoryBtn.type = 'button';
      copyHistoryBtn.className = 'history-copy-btn';
      copyHistoryBtn.textContent = 'Copy';
      copyHistoryBtn.addEventListener('click', () => {
        navigator.clipboard
          .writeText(entry)
          .then(() => {
            const originalText = copyHistoryBtn.textContent;
            copyHistoryBtn.textContent = 'Copied!';
            setTimeout(() => {
              copyHistoryBtn.textContent = originalText;
            }, 1200);
          })
          .catch(() => {
            copyHistoryBtn.textContent = 'Failed';
            setTimeout(() => {
              copyHistoryBtn.textContent = 'Copy';
            }, 1200);
          });
      });

      const deleteHistoryBtn = document.createElement('button');
      deleteHistoryBtn.type = 'button';
      deleteHistoryBtn.className = 'history-delete-btn';
      deleteHistoryBtn.textContent = 'Delete';
      deleteHistoryBtn.addEventListener('click', () => {
        const currentHistory = loadHistory();
        const updatedHistory = currentHistory.filter((item) => item !== entry);
        saveHistory(updatedHistory);
        renderHistory(updatedHistory);
      });

      actions.appendChild(copyHistoryBtn);
      actions.appendChild(deleteHistoryBtn);
      historyItem.appendChild(text);
      historyItem.appendChild(actions);
      historyList.appendChild(historyItem);
    });
  }

  function addToHistory(entry) {
    const currentHistory = loadHistory();
    const updatedHistory = [entry, ...currentHistory.filter((item) => item !== entry)].slice(0, 10);
    saveHistory(updatedHistory);
    renderHistory(updatedHistory);
  }

  renderHistory(loadHistory());
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Changing colors on input type range track
  document.querySelectorAll('input[type="range"]').forEach((input) => {
    const updateTrack = () => {
      const min = parseFloat(input.min) || 0;
      const max = parseFloat(input.max) || 100;
      const value = parseFloat(input.value);
      const ratio = Math.min(Math.max((value - min) / (max - min), 0), 1);
      const val = ratio * 100;

      input.style.backgroundImage = `linear-gradient(to right, var(--success) 0%, var(--primary) ${val}%, #a0a0c0 ${val}%, #a0a0c0 100%)`;
    };
    input.addEventListener('input', updateTrack);
    updateTrack();
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
