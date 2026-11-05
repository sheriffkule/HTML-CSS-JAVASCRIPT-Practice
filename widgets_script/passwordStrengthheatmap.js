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

  function setToggleVisibilityIcon(visible) {
    const eyeIcon = visible
      ? `<svg
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
      </svg>`
      : `<svg
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

    toggleVisibility.innerHTML = eyeIcon;
  }

  // Toggle password visibility
  toggleVisibility.addEventListener('click', function () {
    isVisible = !isVisible;
    passwordInput.type = isVisible ? 'text' : 'password';
    setToggleVisibilityIcon(isVisible);
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
    setToggleVisibilityIcon(true);
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

    return heatmapData;
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

  function renderHeatmap(heatmapData, length) {
    heatmap.innerHTML = '';

    for (let i = 0; i < length; i++) {
      const score = heatmapData[i];
      let color;
      let strengthText;

      if (score < 30) {
        color = '#ef4444';
        strengthText = 'Weak';
      } else if (score < 60) {
        color = '#f59e0b';
        strengthText = 'Medium';
      } else {
        color = '#10b981';
        strengthText = 'Strong';
      }

      const item = document.createElement('div');
      item.className = 'heatmap-item';
      item.style.backgroundColor = color;
      item.textContent = strengthText.charAt(0);
      item.setAttribute('data-pos', i + 1);
      item.setAttribute('title', `Position ${i + 1}: ${strengthText} (${score}%)`);

      heatmap.appendChild(item);
    }
  }

  function calculateOverallStrength(password, heatmapData) {
    if (password.length === 0) return { score: 0, label: 'Empty' };

    const length = password.length;
    const heatmapAvg = heatmapData.reduce((sum, val) => sum + val, 0) / length;
    const uniqueChars = new Set(password).size;
    const lengthScore = Math.min(length / 20, 1) * 40;
    const varietyScore = (countCharacterTypes(password) / 4) * 25;
    const uniquenessScore = (uniqueChars / length) * 20;
    const patternScore = (heatmapAvg / 55) * 15;
    const commonPasswordPenalty = isCommonPassword(password) ? 40 : 0;
    const score = Math.max(
      0,
      Math.min(
        100,
        Math.round(lengthScore + varietyScore + uniquenessScore + patternScore - commonPasswordPenalty),
      ),
    );

    // Determine label
    let label;
    if (score < 30) label = 'Very Weak';
    else if (score < 50) label = 'Weak';
    else if (score < 70) label = 'Moderate';
    else if (score < 85) label = 'Strong';
    else label = 'Very Strong';

    return { score, label };
  }

  function updateStrengthMeter(score, label) {
    strengthMeter.style.width = `${score}%`;

    if (score < 30) {
      strengthMeter.style.backgroundColor = '#ef4444';
    } else if (score < 60) {
      strengthMeter.style.backgroundColor = '#f59e0b';
    } else {
      strengthMeter.style.backgroundColor = '#10b981';
    }

    strengthStat.textContent = label;
  }

  function countCharacterTypes(password) {
    let types = 0;
    if (/[a-z]/.test(password)) types++;
    if (/[A-Z]/.test(password)) types++;
    if (/[0-9]/.test(password)) types++;
    if (/[^a-zA-Z0-9]/.test(password)) types++;
    return types;
  }

  function estimateCrackTime(score, length) {
    // Very rough estimation based on password strength and length
    const baseTime = Math.pow(10, score / 20) * length;

    if (baseTime < 1000) return 'Instant';
    if (baseTime < 60000) return 'Seconds';
    if (baseTime < 3600000) return 'Minutes';
    if (baseTime < 86400000) return 'Hours';
    if (baseTime < 2592000000) return 'Days';
    if (baseTime < 31536000000) return 'Months';
    return 'Years';
  }

  function showSuggestions(password, score) {
    suggestionsList.innerHTML = '';
    const suggestions = [];

    if (password.length < 12) {
      suggestions.push('Make your password at least 12 characters long.');
    }

    if (!/[A-Z]/.test(password)) {
      suggestions.push('Add uppercase letters to your password.');
    }

    if (!/[0-9]/.test(password)) {
      suggestions.push('Add numbers to your password.');
    }

    if (!/[^a-zA-Z0-9]/.test(password)) {
      suggestions.push('Add special characters to your password.');
    }

    if (isCommonPassword(password)) {
      suggestions.push('Avoid common passwords. Try a random combination instead.');
    }

    if (score < 50 && password.length >= 8) {
      suggestions.push('Try mixing character types more (e.g., S7r0ngP@ss).');
    }

    if (suggestions.length === 0) {
      suggestions.push('Your password is strong! Keep up the good work.');
    }

    suggestions.forEach((suggestion) => {
      const li = document.createElement('li');
      li.textContent = suggestion;
      suggestionsList.appendChild(li);
    });
  }

  function isCommonPassword(password) {
    const commonPasswords = [
      'password',
      '123456',
      '123456789',
      '12345678',
      '12345',
      '1234567',
      '1234567890',
      'qwerty',
      'admin',
      'welcome',
      'letmein',
      'abc123',
      'password123',
      'sunshine',
    ];
    return commonPasswords.includes(password.toLowerCase());
  }

  function generateStrongPassword(length = 16) {
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let password = '';

    // Ensure at least one character from each category
    password += getRandomChar('abcdefghijklmnopqrstuvwxyz');
    password += getRandomChar('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    password += getRandomChar('0123456789');
    password += getRandomChar('!@#$%^&*()_+-=[]{}|;:,.<>?');

    // Fill the rest
    for (let i = 4; i < length; i++) {
      password += getRandomChar(charset);
    }

    // Shuffle the password
    return shuffleString(password);
  }

  function getRandomChar(charset) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    return charset[randomIndex];
  }

  function shuffleString(str) {
    const array = str.split('');
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
  }

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
