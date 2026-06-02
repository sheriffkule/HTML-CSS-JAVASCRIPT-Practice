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
  const frequencyChart = document.getElementById('frequency-chart').getContext('2d');
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
});
