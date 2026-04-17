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

  // Event listeners
  textToBinaryBtn.addEventListener('click', convertTextToBinary);
  binaryToTextBtn.addEventListener('click', convertBinaryToText);

  swapBtn.addEventListener('click', function () {
    const temp = textInput.value;
    textInput.value = binaryInput.value;
    binaryInput.value = temp;
    updateCharCounts();

    if (document.activeElement === textInput || document.activeElement === binaryInput) {
      if (autoConvert.checked) {
        if (document.activeElement === textInput) {
          convertTextToBinary();
        } else {
          convertBinaryToText();
        }
      }
    }
  });

  clearTextBtn.addEventListener('click', function () {
    textInput.value = '';
    updateCharCounts();
    showNotification('Text cleared', 'success');
  });

  clearBinaryBtn.addEventListener('click', function () {
    binaryInput.value = '';
    updateCharCounts();
    showNotification('Binary cleared', 'success');
  });

  copyTextBtn.addEventListener('click', function () {
    textInput.select();
    document.execCommand('copy');
    showNotification('Text copied to clipboard', 'success');
  });

  copyBinaryBtn.addEventListener('click', function () {
    binaryInput.select();
    document.execCommand('copy');
    showNotification('Binary copied to clipboard', 'success');
  });

  // Show ASCII codes in tooltip if enabled
  textInput.addEventListener('mousemove', function (e) {
    if (!showAscii.checked) return;

    const index = getCursorPosition(textInput, e.clientX, e.clientY);
    if (index >= 0 && index < textInput.value.length) {
      const char = textInput.value.charAt(index);
      const charCode = char.charCodeAt(0);
      textInput.title = `'${char}' - ASCII: ${charCode}, Binary: ${charCode.toString(2).padStart(8, '0')}`;
    } else {
      textInput.title = '';
    }
  });

  binaryInput.addEventListener('mousemove', function (e) {
    if (!showAscii.checked) return;

    const index = getCursorPosition(textInput, e.clientX, e.clientY);
    if (index >= 0 && index < binaryInput.value.length) {
      // FInd the start of the current 8-bit binary character
      let start = index;
      while (start > 0 && /[01]/.text(binaryInput.value.charAt(start - 1))) {
        start--;
      }

      const binaryChar = binaryInput.value.substr(start, 8).replace(/[^01]/g, '');
      if (binaryChar.length === 8) {
        const charCode = parseInt(binaryChar, 2);
        binaryInput.title = `Binary: ${binaryChar} - ASCII: ${charCode}, Char: '${String.fromCharCode(charCode)}'`;
      } else {
        binaryInput.title = '';
      }
    } else {
      binaryInput.title = '';
    }
  });

  // Helper function to get cursor position in text area
  function getCursorPosition(textarea, x, y) {
    const rect = textarea.getBoundingClientRect();
    x -= rect.left;
    y -= rect.top;

    // Create a range for the textarea content
    const range = document.createRange();
    const sel = window.getSelection();

    // Find the closest text node (might be the textarea itself)
    let node = textarea.firstChild;
    if (!node) {
      node = document.createTextNode('');
      textarea.appendChild(node);
    }

    range.setStart(node, 0);
    range.setEnd(node, textarea.value.length);

    const rects = range.getClientRects();
    for (let i = 0; i < rects.length; i++) {
      if (y >= rects[i].top && y <= rects[i].bottom) {
        if (x <= rects[i].left) {
          return i > 0 ? i - 1 : 0;
        } else if (x <= rects[i].right) {
          return i;
        }
      }
    }

    return textarea.value.length;
  }
});
