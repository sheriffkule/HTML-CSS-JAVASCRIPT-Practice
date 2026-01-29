// Validate characters for a given base (supports bases 2..36)
function isValidForBase(str, base) {
  const s = String(str).trim().toUpperCase();
  if (!s) return false;
  const lastLetter = String.fromCharCode(54 + base); // base=11 -> 'A', base=16 -> 'F', base=36 -> 'Z'
  if (base <= 10) {
    return new RegExp(`^[+-]?[0-${base - 1}]+$`).test(s);
  }
  return new RegExp(`^[+-]?[0-9A-${lastLetter}]+$`).test(s);
}

// Convert input string (validated) to BigInt from given base
function parseToBigInt(numStr, base) {
  if (!Number.isInteger(base) || base < 2 || base > 36) {
    throw new Error('Base must be an integer between 2 and 36');
  }
  let s = String(numStr).trim().toUpperCase();
  if (!s) throw new Error('Empty number');

  let negative = false;
  if (s[0] === '+' || s[0] === '-') {
    negative = s[0] === '-';
    s = s.slice(1);
  }

  if (!isValidForBase(s, base)) {
    throw new Error('Invalid digits for base ' + base);
  }

  let result = 0n;
  const bigBase = BigInt(base);
  for (const ch of s) {
    const code = ch.charCodeAt(0);
    let val;
    if (code >= 48 && code <= 57) { // '0'-'9'
      val = BigInt(code - 48);
    } else { // 'A'-'Z'
      val = BigInt(code - 55); // 'A' -> 10
    }
    result = result * bigBase + val;
  }
  return negative ? -result : result;
}

// Convert BigInt to string in given base (2..36)
function bigIntToBaseStr(valueBigInt, base) {
  if (!Number.isInteger(base) || base < 2 || base > 36) {
    throw new Error('Base must be an integer between 2 and 36');
  }
  if (valueBigInt === 0n) return '0';
  const negative = valueBigInt < 0n;
  let v = negative ? -valueBigInt : valueBigInt;
  const bigBase = BigInt(base);
  const chars = [];
  while (v > 0n) {
    const rem = Number(v % bigBase);
    const ch = rem < 10 ? String.fromCharCode(48 + rem) : String.fromCharCode(55 + rem); // 10 -> 'A'
    chars.push(ch);
    v = v / bigBase;
  }
  if (negative) chars.push('-');
  return chars.reverse().join('');
}

// Called by button or Enter key
function convertNumber() {
  const resultDiv = document.getElementById('result');
  if (!resultDiv) return;

  const inputEl = document.getElementById('numberInput');
  const fromEl = document.getElementById('fromBase');
  const toEl = document.getElementById('toBase');

  if (!inputEl || !fromEl || !toEl) {
    resultDiv.innerText = 'Missing input or base selectors.';
    return;
  }

  const num = inputEl.value.trim();
  const fromBase = parseInt(fromEl.value, 10);
  const toBase = parseInt(toEl.value, 10);

  if (!num) {
    resultDiv.innerText = 'Please enter a number!';
    return;
  }
  if (!Number.isInteger(fromBase) || fromBase < 2 || fromBase > 36) {
    resultDiv.innerText = 'Invalid source base (2..36).';
    return;
  }
  if (!Number.isInteger(toBase) || toBase < 2 || toBase > 36) {
    resultDiv.innerText = 'Invalid target base (2..36).';
    return;
  }

  // Reject floats or numbers with decimal points
  if (num.includes('.') || num.includes(',')) {
    resultDiv.innerText = 'Only integer numbers are supported.';
    return;
  }

  try {
    const decimalBigInt = parseToBigInt(num, fromBase);
    const converted = bigIntToBaseStr(decimalBigInt, toBase).toUpperCase();
    resultDiv.innerText = `Result: ${converted}`;
  } catch (err) {
    resultDiv.innerText = 'Invalid number for selected base!';
  }
}

// Apply theme and persist to localStorage
function changeTheme(passedTheme) {
  const themeSelect = document.getElementById('themeSelect');
  const theme = passedTheme || (themeSelect ? themeSelect.value : 'light');

  // Light
  if (theme === 'light') {
    document.documentElement.style.setProperty('--bg-color', '#f0f4f7');
    document.documentElement.style.setProperty('--card-bg', '#fff');
    document.documentElement.style.setProperty('--text-color', '#333');
    document.documentElement.style.setProperty('--input-bg', '#fff');
    document.documentElement.style.setProperty('--input-border', '#ccc');
    document.documentElement.style.setProperty('--button-bg', '#007bff');
    document.documentElement.style.setProperty('--button-hover', '#0056b3');
  }
  // Dark
  else if (theme === 'dark') {
    document.documentElement.style.setProperty('--bg-color', '#121212');
    document.documentElement.style.setProperty('--card-bg', '#1e1e1e');
    document.documentElement.style.setProperty('--text-color', '#f0f0f0');
    document.documentElement.style.setProperty('--input-bg', '#2c2c2c');
    document.documentElement.style.setProperty('--input-border', '#444');
    document.documentElement.style.setProperty('--button-bg', '#bb86fc');
    document.documentElement.style.setProperty('--button-hover', '#9b59b6');
  }
  // Ocean
  else if (theme === 'ocean') {
    document.documentElement.style.setProperty('--bg-color', '#e0f7fa');
    document.documentElement.style.setProperty('--card-bg', '#ffffff');
    document.documentElement.style.setProperty('--text-color', '#006064');
    document.documentElement.style.setProperty('--input-bg', '#e0f2f1');
    document.documentElement.style.setProperty('--input-border', '#4dd0e1');
    document.documentElement.style.setProperty('--button-bg', '#00acc1');
    document.documentElement.style.setProperty('--button-hover', '#00838f');
  }

  try {
    localStorage.setItem('nsc_theme', theme);
  } catch (e) {
    // ignore localStorage errors (e.g., privacy modes)
  }

  if (themeSelect) themeSelect.value = theme;
}

// Set copyright year
function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');
  if (!yearElement) return;
  yearElement.setAttribute('datetime', currentYear.toString());
  yearElement.textContent = currentYear.toString();
}

// Initialize: restore theme and attach nice UX hooks
function initNumberSystemWidget() {
  const themeSelect = document.getElementById('themeSelect');
  const saved = (() => {
    try { return localStorage.getItem('nsc_theme'); } catch (e) { return null; }
  })();

  if (saved && themeSelect) themeSelect.value = saved;
  changeTheme(saved || (themeSelect ? themeSelect.value : 'light'));

  if (themeSelect) {
    themeSelect.addEventListener('change', function (e) {
      changeTheme(e.target.value);
    });
  }

  // Support pressing Enter in the input to run conversion
  const inputEl = document.getElementById('numberInput');
  if (inputEl) {
    inputEl.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') convertNumber();
    });
  }

  // initial year
  updateYear();
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', initNumberSystemWidget);