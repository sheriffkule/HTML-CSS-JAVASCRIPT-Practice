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
