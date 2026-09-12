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
      morse = morseCode[char] ? morseCode[char] + ' ' : '# ';
    }

    morseOutput.textContent = morse.trim();
    addToHistory(`Text to Morse: ${text} → ${morse.trim()}`);
  });

  // Convert Morse code to text
  toTextBtn.addEventListener('click', () => {
    const morse = inputText.value.trim();
    const morseChars = morse.split(' ');
    let text = '';

    for (const morseChar of morseChars) {
      if (textCode[morseChar]) {
        text += textCode[morseChar];
      } else if (morseChar === '') {
        continue;
      } else {
        text += '?'; // Use ? for unsupported Morse code
      }
    }

    morseOutput.text = text;
    addToHistory(`Morse to Text: ${morse} → ${text}`);
  });

  // Clear input and output
  clearBtn.addEventListener('click', () => {
    inputText.value = '';
    morseOutput.textContent = 'Your Morse code will appear here...';
  });

  // Copy Morse code to clipboard
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(morseOutput.textContent).then(() => {
      copyBtn.innerHTML = '<i class="fas fa-check></i> Copied!';
      setTimeout(() => {
        copyBtn.innerHTML = '<i class="fas fa-copy></i> Copy';
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
    // Reset flash element
    flashElement.style.opacity = 0;

    const speed = parseInt(speedSlider.value);
    const dotLength = 1200 / speed;
    let delay = 0;

    for (const char of morse) {
      if (char === '.') {
        setInterval(() => {
          flashElement.style.opacity = 1;
        }, delay);

        setTimeout(
          () => {
            flashElement.style.opacity = 0;
          },
          delay + dotLength / 2,
        );

        delay += dotLength;
      } else if (char === '-') {
        setTimeout(() => {
          flashElement.style.opacity = 0;
        }, delay);

        setTimeout(
          () => {
            flashElement.style.opacity = 1;
          },
          delay + dotLength * 1.5,
        );

        delay += dotLength * 1.5;
      } else if (char === ' ') {
        delay += dotLength * 2;
      }

      // Add gap between symbols
      delay += dotLength / 2;
    }

    // Reset button text after completion
    setTimeout(() => {
      flashBtn.innerHTML = '<i class="fas fa-lightbulb></i> Start Flashing';
    }, delay);
  }

  // Add to translation history
  function addToHistory(entry) {
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    historyItem.textContent = entry;
    historyList.appendChild(historyItem);

    // Keep only last 10 history items
    if (historyList.children.length > 10) {
      historyList.removeChild(historyList.lastChild);
    }
  }

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
