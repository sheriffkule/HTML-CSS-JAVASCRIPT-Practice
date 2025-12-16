function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}

const rowsInput = document.getElementById('rows');
const colsInput = document.getElementById('cols');
const generateBtn = document.getElementById('generate');
const randomBtn = document.getElementById('random');
const transposeBtn = document.getElementById('transpose');
const clearBtn = document.getElementById('clear');
const inputMatrixDiv = document.getElementById('inputMatrix');
const outputMatrixDiv = document.getElementById('outputMatrix');
const pasteCSVBtn = document.getElementById('pasteCSV');
const copyInputBtn = document.getElementById('copyInput');
const copyOutputBtn = document.getElementById('copyOutput');
const downloadBtn = document.getElementById('download');

let currentRows = rowsInput ? (parseInt(rowsInput.value, 10) || 3) : 3;
let currentCols = colsInput ? (parseInt(colsInput.value, 10) || 3) : 3; 

function createGrid(container, r, c, values = null, readonly = false) {
  container.innerHTML = '';
  const table = document.createElement('table');
  for (let i = 0; i < r; i++) {
    const tr = document.createElement('tr');
    for (let j = 0; j < c; j++) {
      const td = document.createElement('td');
      const inp = document.createElement('input');
      inp.type = 'text';
      inp.inputMode = 'numeric';
      inp.autocomplete = 'off';
      inp.value = values && values[i] && values[i][j] !== undefined ? values[i][j] : '';
      if (readonly) inp.readOnly = true;
      td.appendChild(inp);
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  container.appendChild(table);
}

function readGrid(container) {
  const table = container.querySelector('table');
  if (!table) return [];
  const rows = [];
  for (const tr of table.rows) {
    const cols = [];
    for (const td of tr.cells) {
      const inp = td.querySelector('input');
      const v = inp ? String(inp.value).trim() : '';
      // allow numbers; if empty -> 0
      if (v === '') {
        cols.push('0');
      } else {
        cols.push(v);
      }
    }
    rows.push(cols);
  }
  return rows;
}

function transpose(values) {
  if (values.length === 0) return [];
  const r = values.length,
    c = values[0].length;
  const out = Array.from({ length: c }, () => Array.from({ length: r }, () => '0'));
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      out[j][i] = values[i][j];
    }
  }
  return out;
}

function valuesToCSV(values) {
  return values.map((row) => row.join(',')).join('\n');
}

function parseCSVText(text) {
  // split by lines then by comma/space/tab
  const lines = text.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length === 0) return [];
  const result = lines.map((line) =>
    line
      .split(/[\t,;]+|\s+/)
      .map((s) => s.trim())
      .filter((s) => s !== '')
  );
  const maxc = Math.max(...result.map((r) => r.length));
  for (const r of result) {
    while (r.length < maxc) r.push('0');
  }
  return result;
}

function showError(msg) {
  alert(msg);
}

// Handlers
function generate() {
  let r = clamp(parseInt(rowsInput.value || 0, 10) || 1, 1, 20);
  let c = clamp(parseInt(colsInput.value || 0, 10) || 1, 1, 20);
  currentRows = r;
  currentCols = c;
  createGrid(inputMatrixDiv, r, c);
  createGrid(outputMatrixDiv, c, r, null, true);
}

function fillRandom() {
  let r = clamp(parseInt(rowsInput.value || 0, 10) || 3, 1, 20);
  let c = clamp(parseInt(colsInput.value || 0, 10) || 3, 1, 20);
  const vals = [];
  for (let i = 0; i < r; i++) {
    const row = [];
    for (let j = 0; j < c; j++) {
      row.push((Math.random() * 20 - 10).toFixed(2));
    }
    vals.push(row);
  }
  currentRows = r;
  currentCols = c;
  createGrid(inputMatrixDiv, r, c, vals);
  createGrid(outputMatrixDiv, c, r, null, true);
}

function doTranspose() {
  const vals = readGrid(inputMatrixDiv);
  if (vals.length === 0) {
    showError('No input matrix');
    return;
  }
  const out = transpose(vals);
  createGrid(outputMatrixDiv, out.length, out[0].length, out, true);
}

function clearAll() {
  createGrid(inputMatrixDiv, currentRows, currentCols);
  createGrid(outputMatrixDiv, currentCols, currentRows, null, true);
}

function pasteCSV() {
  navigator.clipboard
    .readText()
    .then((text) => {
      if (!text) {
        showError('Clipboard empty or not allowed');
        return;
      }
      const parsed = parseCSVText(text);
      if (parsed.length === 0) {
        showError('Could not parse any values');
        return;
      }
      const r = clamp(parsed.length, 1, 20);
      const c = clamp(parsed[0].length, 1, 20);
      rowsInput.value = r;
      colsInput.value = c;
      currentRows = r;
      currentCols = c;
      createGrid(inputMatrixDiv, r, c, parsed);
      createGrid(outputMatrixDiv, c, r, null, true);
    })
    .catch((err) => {
      showError('Failed to read clipboard: ' + err);
    });
}

function copyCSVFrom(container) {
  const vals = readGrid(container);
  const csv = valuesToCSV(vals);
  navigator.clipboard
    .writeText(csv)
    .then(() => {})
    .catch(() => showError('Copy failed (clipboard permission?)'));
}

function downloadCSV() {
  const vals = readGrid(outputMatrixDiv);
  const csv = valuesToCSV(vals);
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'transposed.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
} 

// Init
if (generateBtn) generateBtn.addEventListener('click', generate);
if (randomBtn) randomBtn.addEventListener('click', fillRandom);
if (transposeBtn) transposeBtn.addEventListener('click', doTranspose);
if (clearBtn) clearBtn.addEventListener('click', clearAll);
if (pasteCSVBtn) pasteCSVBtn.addEventListener('click', pasteCSV);
if (copyInputBtn) copyInputBtn.addEventListener('click', () => copyCSVFrom(inputMatrixDiv));
if (copyOutputBtn) copyOutputBtn.addEventListener('click', () => copyCSVFrom(outputMatrixDiv));
if (downloadBtn) downloadBtn.addEventListener('click', downloadCSV);

// generate default
if (inputMatrixDiv) createGrid(inputMatrixDiv, currentRows, currentCols);
if (outputMatrixDiv) createGrid(outputMatrixDiv, currentCols, currentRows, null, true);
