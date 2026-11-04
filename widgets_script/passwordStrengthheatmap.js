document.addEventListener('DOMContentLoaded', function () {
  const passwordInput = document.getElementById('password');
  const toggleVisibility = document.getElementById('toggleVisibility');
  const strengthMeter = document.getElementById('strengthMeter');
  const heatmap = document.getElementById('heatmap');
  const lengthStat = document.getElementById('lengthStat');
  const strengthStat = document.getElementById('strengthStat');
  const typeStat = document.getElementById('typeStat');
  const crackTimeStat = document.getElementById('crackTimeStat');
  const suggestionsContainer = document.getElementById('suggestionsContainer');
  const suggestionsList = document.getElementById('suggestionsList');
  const generatePasswordBtn = document.getElementById('generatePassword');

  let isVisible = false;

  // Toggle password visibility
  toggleVisibility.addEventListener('click', function () {
    isVisible = !isVisible;
    if (isVisible) {
      passwordInput.type = 'text';
      this.innerHTML = `<svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round">
        <path
          d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
      </svg>`;
    } else {
      passwordInput.type = 'password';
      this.innerHTML = `<svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>`;
    }
  });

  // Analyze password on input
  passwordInput.addEventListener('input', function () {
    const password = this.value;
    analyzePassword(password);
  });

  // Generate strong password
  generatePasswordBtn.addEventListener('click', function () {
    const strongPassword = generateStrongPassword();
    passwordInput.value = strongPassword;
    passwordInput.type = 'text';
    isVisible = true;
    toggleVisibility.innerHTML = html`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round">
      <path
        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>`;
    analyzePassword(strongPassword);
  });

  function analyzePassword(password) {
    const length = password.length;
    lengthStat.textContent = length;

    // Calculate heatmap
    const heatmapData = calculateHeatmap(password);
    renderHeatmap(heatmapData, length);

    // Calculate overall strength
    const strength = calculateOverallStrength(password, heatmapData);
    updateStrengthMeter(strength.score, strength.label);

    // Update stats
    typeStat.textContent = countCharacterTypes(password);
    crackTimeStat.textContent = estimateCrackTime(strength.score, length);

    // Show / hide suggestions
    if (length > 0 && strength.score < 80) {
      showSuggestions(password, strength.score);
      suggestionsContainer.style.display = 'block';
    } else {
      suggestionsContainer.style.display = 'none';
    }
  }

  function calculateHeatmap(password) {
    const heatmapData = [];

    for (let i = 0; i < password.length; i++) {
      const char = password[i];
      let score = 0;

      // Score based on character type
      if (/[a-z]/.test(char)) score += 10; // lowercase
      if (/[A-Z]/.test(char)) score += 20; // uppercase
      if (/[0-9]/.test(char)) score += 15; // number
      if (/[^a-zA-Z0-9]/.test(char)) score += 25; // special char

      // Bonus for being not in common patterns
      if (!isInCommonPattern(char, i, password)) score += 10;

      // Bonus for being unique in the password
      if (password.indexOf(char) === i) score += 5;

      heatmapData.push(Math.min(100, score));
    }
  }

  function isInCommonPattern(char, position, password) {
    // Check for sequential characters (apc, 123, etc.)
    if (position > 0 && position < password.length - 1) {
      const prevCharCode = password.charCodeAt(position - 1);
      const nextCharCode = password.charCodeAt(position + 1);
      const currentCharCode = char.charCodeAt(0);

      if (
        (currentCharCode === prevCharCode + 1 && currentCharCode === nextCharCode - 1) ||
        (currentCharCode === prevCharCode - 1 && currentCharCode === nextCharCode + 1)
      ) {
        return true;
      }
    }

    // Check for repeated characters (aaa, 111, etc.)
    if (position > 0 && position < password.length - 1) {
      if (char === password[position - 1] && char === password[position + 1]) {
        return true;
      }
    }

    // Check for keyboard patterns (qwerty, asdf, etc)
    const keyboardPatterns = [
      'qwertyuiop',
      'asdfghjkl',
      'zxcvbnm',
      '1234567890',
      '!@#$%^&*()',
      'qazwsxedcrfvtgbyhnujmikolp',
    ];

    for (const pattern of keyboardPatterns) {
      if (pattern.includes(char.toLowerCase())) {
        const patternPos = pattern.indexOf(char.toLowerCase());
        if (position > 0 && position < password.length - 1) {
          const prevInPattern = pattern.indexOf(password[position - 1].toLowerCase());
          const nextInPattern = pattern.indexOf(password[position + 1].toLowerCase());

          if (
            prevInPattern !== -1 &&
            nextInPattern !== -1 &&
            Math.abs(prevInPattern - patternPos) <= 1 &&
            Math.abs(nextInPattern - patternPos) <= 1
          ) {
            return true;
          }
        }
      }
    }

    return false;
  }
});
