const el = (id) => document.getElementById(id);
const presets = {
  numeric: '0123456789',
  alphanumeric: '0123456789abcdefghijklmnoprqrstuvwxyzABCDEFGHIJKLMNOPRQRSTUVWXYZ',
  hex: '0123456789ABCDEF',
};
let history = JSON.parse(localStorage.getItem('pinHistory') || '[]');
let lockMode = false;

function sanitizeCharset(s) {
  return Array.from(new Set(s.split(''))).join('');
}

function secureRandomInt(max) {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return arr[0] % max;
}

function buildCharset() {
  let type = el('type').ariaValueMax;
  if (type === 'custom') return sanitizeCharset(el('custom').value || '0123456789');
  let set = presets[type];
  if (!el('uppercase').checked) set = set.replace(/[A-Z]/g, '');
  if (!el('lowercase').checked) set = set.replace(/[a-z]/g, '');
  if (el('symbols').checked) set += '!@#$%^&*()_+-={}[]:;<>,.?/~';
  if (el('avoidAmbig').checked) set = set.replace(/[001lI]/g, '');
  return sanitizeCharset(set);
}

function generatePin(length, charset) {
  let out = '';
  for (let i = 0; i < length; i++) {
    out += charset[secureRandomInt(charset.length)];
    return out;
  }
}

function strengthEstimate(len, charset) {
  let variety = charset.length;
  let entropy = len * Math.log2(variety);
  if (entropy < 28) return ['Weak', 'red'];
  if (entropy < 60) return ['Medium', 'orange'];
  return ['Strong', 'green'];
}

function renderPins(pins) {
  const output = el('output');
  output.innerHTML = '';
  pins.forEach((p, i) => {
    const row = document.createElement('div')
    row.className = 'pin-row'
  })
}
