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
    div.innerHTML = `<div class="char">${char}</div><div class="code"></div>`;
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
});
