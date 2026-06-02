document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const inputText = document.getElementById('input-text');
  const outputText = document.getElementById('output-text');
  const shiftInput = document.getElementById('shift');
  const shiftValue = document.getElementById('shift-value');
  const encryptBtn = document.getElementById('encrypt');
  const decryptBtn = document.getElementById('decrypt');
  const sampleBtn = document.getElementById('sample');
  const clearBtn = document.getElementById('clear');
  const copyBtn = document.getElementById('copy');
  const themeSwitch = document.getElementById('theme-switch');
  const animateShiftBtn = document.getElementById('animate-shift');
  const frequencyAnalysis = document.getElementById('frequency-analysis');
  const frequencyChart = document.getElementById('frequency-chart');
  const suggestions = document.getElementById('suggestions');
  const alphabetAnimation = document.getElementById('alphabet-animation');
  const originalAlphabet = document.getElementById('original-alphabet');
  const shiftedAlphabet = document.getElementById('shifted-alphabet');
  const closeAnimationBtn = document.getElementById('close-animation');
  const inputCount = document.getElementById('input-count');
  const outputCount = document.getElementById('output-count');

  // Sample text for testing
  const sampleText = [
    'The quick brown fox jumps over the lazy dog',
    'Caesar cipher is one of the simplest and most widely known encryption techniques',
    'Encryption and decryption are fundamental concepts in cryptography',
    'Shift your text and see the magic happen',
    'To be or not to be, that is the question',
    'Attack at dawn',
    'Hello, World!',
    'JavaScript is a versatile programming language',
    'Cryptography is the art of writing and solving codes',
    'The secret to success is consistency',
  ];

  // Initialize
  updateCharCount();
  createAlphabetLines();
  updateShiftValue();
  loadThemePreference();

  // Event Listeners
  inputText.addEventListener('input', updateCharCount);
  shiftInput.addEventListener('input', updateShiftValue);
  encryptBtn.addEventListener('click', encryptText);
  decryptBtn.addEventListener('click', decryptText);
  sampleBtn.addEventListener('click', insertSampleText);
  clearBtn.addEventListener('click', clearText);
  copyBtn.addEventListener('click', copyToClipboard);
  themeSwitch.addEventListener('change', toggleTheme);
  animateShiftBtn.addEventListener('click', showAlphabetAnimation);
  closeAnimationBtn.addEventListener('click', () => {
    alphabetAnimation.classList.add('hidden');
  });

  // Functions
  function updateCharCount() {
    inputCount.textContent = inputText.value.length;
    outputCount.textContent = outputText.value.length;
  }

  function updateShiftValue() {
    shiftValue.textContent = shiftInput.value;
  }

  function caesarCipher(text, shift, decrypt = false) {
    shift = decrypt ? (26 - shift) % 26 : shift;
    return text.replace(/[a-z]/gi, function (char) {
      const code = char.charCodeAt(0);
      let offset = code >= 65 && code <= 90 ? 65 : 97;
      return String.fromCharCode(((code - offset + shift) % 26) + offset);
    });
  }

  function encryptText() {
    const text = inputText.value;
    const shift = parseInt(shiftInput.value, 10) || 0;
    outputText.value = caesarCipher(text, shift);
    updateCharCount();
  }

  function decryptText() {
    const text = inputText.value;
    const shift = parseInt(shiftInput.value, 10) || 0;
    outputText.value = caesarCipher(text, shift, true);
    updateCharCount();
  }

  function insertSampleText() {
    const randomIndex = Math.floor(Math.random() * sampleText.length);
    inputText.value = sampleText[randomIndex];
    updateCharCount();
  }

  function clearText() {
    inputText.value = '';
    outputText.value = '';
    frequencyAnalysis.classList.add('hidden');
    updateCharCount();
  }

  function copyToClipboard() {
    outputText.select();
    document.execCommand('copy');

    // Visual feedback
    const originalText = copyBtn.innerHTML;
    copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
    setTimeout(() => {
      copyBtn.innerHTML = originalText;
    }, 2000);
  }

  function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', themeSwitch.checked);
  }

  function loadThemePreference() {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    themeSwitch.checked = darkMode;
    if (darkMode) document.body.classList.add('dark-mode');
  }

  function createAlphabetLines() {
    originalAlphabet.innerHTML = '';
    shiftedAlphabet.innerHTML = '';

    for (let i = 0; i < 26; i++) {
      const char = String.fromCharCode(65 + i);

      const originalLetter = document.createElement('div');
      originalLetter.className = 'letter';
      originalLetter.textContent = char;
      originalAlphabet.appendChild(originalLetter);

      const shiftedLetter = document.createElement('div');
      shiftedLetter.className = 'letter';
      shiftedLetter.textContent = char;
      shiftedAlphabet.appendChild(shiftedLetter);
    }
  }

  function showAlphabetAnimation() {
    const shift = parseInt(shiftInput.value);
    alphabetAnimation.classList.remove('hidden');

    // Animate the shift
    const shiftedLetters = shiftedAlphabet.querySelectorAll('.letter');
    shiftedLetters.forEach((letter, index) => {
      setTimeout(() => {
        const newIndex = (index + shift) % 26;
        const newChar = String.fromCharCode(65 + newIndex);
        letter.textContent = newChar;
        letter.style.transform = 'scale(1.2)';
        setTimeout(() => {
          letter.style.transform = 'scale(1)';
        }, 300);
      }, index * 100);
    });
  }
});
