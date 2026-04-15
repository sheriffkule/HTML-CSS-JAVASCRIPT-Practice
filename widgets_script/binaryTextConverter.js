document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const textInput = document.getElementById('text-input');
  const binaryInput = document.getElementById('binary-input');
  const textToBinaryBtn = document.getElementById('text-to-binary');
  const binaryToTextBtn = document.getElementById('binary-to-text');
  const swapBtn = document.getElementById('swap-btn');
  const clearTextBtn = document.getElementById('clear-text');
  const clearBinaryBtn = document.getElementById('clear-binary');
  const copyTextBtn = document.getElementById('copy-text');
  const copyBinaryBtn = document.getElementById('copy-binary');
  const textCharCount = document.getElementById('text-char-count');
  const binaryCharCount = document.getElementById('binary-char-count');
  const notification = document.getElementById('notification');
  const settingsToggle = document.getElementById('settings-toggle');
  const settingsPanel = document.getElementById('settings-panel');
  const spaceSeparator = document.getElementById('space-separator');
  const autoConvert = document.getElementById('auto-convert');
  const showAscii = document.getElementById('show-ascii');
  const darkTheme = document.getElementById('dark-theme');

  // Settings toggle
  settingsToggle.addEventListener('click', function () {
    settingsPanel.classList.toggle('open');
    settingsToggle.classList.toggle('open');
  });

  // Character counters
  textInput.addEventListener('input', updateCharCounts);
  binaryInput.addEventListener('input', updateCharCounts);

  function updateCharCounts() {
    textCharCount.textContent = `${textInput.value.length} characters`;
    binaryCharCount.textContent = `${binaryInput.value.length} characters`;

    if (autoConvert.checked) {
      if (document.activeElement === textInput) convertTextToBinary();
    } else if ((document.activeElement = binaryInput)) convertBinaryToText();
  }

  // Conversion function
  function convertTextToBinary() {
    const text = textInput.value;
    let binary = '';

    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);
      let binaryChar = charCode.toString(2);

      // Pad with leading zeros to make it 8 bits
      while (binaryChar.length < 8) {
        binaryChar = '0' + binaryChar;
      }

      binary += binaryChar;
      if (spaceSeparator.checked && i < text.length - 1) binary += ' ';
    }

    binaryInput.value = binary;
    updateCharCounts();
  }

  function convertBinaryToText() {
    let binary = binaryInput.value;
    // Remove any spaces or non-binary characters
    binary = binary.replace(/[^01]/g, '');

    let text = '';

    // Split into 8-bit chunk
    for (let i = 0; i < binary.length; i++) {
      const binaryChar = binary.substr(i, 8);
      if (binaryChar.length === 8) {
        const charCode = parseInt(binaryChar, 2);
        text += String.fromCharCode(charCode);
      }
    }

    textInput.value = text;
    updateCharCounts();
  }
});
