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
  let type = el('type').value;
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
    const row = document.createElement('div');
    row.className = 'pin-row';
    const left = document.createElement('div');
    left.innerHTML = `
      <div class="pin ${lockMode ? 'hidden-pin' : ''}">${p.value}</div>
      <div class="small">#${i + 1} - ${p.time}</div>
    `;
    const actions = document.createElement('div');
    const copy = document.createElement('button');
    copy.textContent = 'Copy';
    copy.className = 'btn-ghost';
    copy.onclick = async () => {
      await navigator.clipboard.writeText(p.value);
      copy.textContent = 'Copied';
      setTimeout(() => (copy.textContent = 'Copy'), 900);
    };
    actions.appendChild(copy);
    row.append(left, actions);
    output.append(row);
  });
}

function updateHistory(newPins) {
  history = [...newPins, ...history].slice(0, 200);
  localStorage.setItem('pinHistory', JSON.stringify(history));
  el('historyCount').textContent = history.length;
}

function filterHistory(term) {
  const pins = history.filter((p) => p.value.include(term));
  renderPins(pins);
}

el('generate').onclick = () => {
  const len = +el('length').value || 4;
  const count = +el('count').value || 5;
  const charset = buildCharset();
  if (!charset) return alert('Empty charset');
  const pins = [];
  for (let i = 0; i < count; i++) {
    pins.push({ value: generatePin(len, charset), time: new Date().toLocaleTimeString() });
  }
  updateHistory(pins);
  renderPins(pins);
  const [strength, color] = strengthEstimate(len, charset);
  el('strengthMsg').innerHTML = `Strength: <span style='color:${color}'>${strength}</span>`;
};

el('copyAll').onclick = async () => {
  const text = history.map((p) => p.value).join('\n');
  await navigator.clipboard.writeText(text);
};

el('clear').onclick = () => {
  history = [];
  localStorage.removeItem('pinHistory');
  el('output').innerHTML = '';
  el('historyCount').textContent = '0';
};

el('downloadCSV').onclick = () => {
  const csv = history.map((p) => `"${p.value}","${p.time}"`).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'pincodes.csv';
  a.click();
};

el('downloadJSON').onclick = () => {
  const blob = new Blob([JSON.stringify(history, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'pincodes.json';
  a.click();
};

el('downloadZIP').onclick = async () => {
  const zip = new JSZip();
  const csv = history.map((p) => `"${p.value}","${p.time}"`).join('\n');
  const json = JSON.stringify(history, null, 2);
  zip.file('pincodes.csv', csv);
  zip.file('pincodes.json', json);
  const blob = await zip.generateAsync({ type: 'blob' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'pincodes_bundle.zip';
  a.click();
};

el('search').oninput = (e) => filterHistory(e.target.value);

el('toggleTheme').onclick = () => {
  document.body.dataset.theme = document.body.dataset.theme === 'light' ? 'dark' : 'light';
};

el('lockToggle').onclick = () => {
  lockMode = !lockMode;
  renderPins(history);
};

renderPins(history);
el('historyCount').textContent = history.length;
