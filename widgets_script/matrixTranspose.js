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

let currentRows = parseInt(rowsInput.value, 10);
let currentCols = parseInt(colsInput.value, 10);

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
      const v = table.firstElementChild.value.trim();
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

// generate default
createGrid(inputMatrixDiv, currentRows, currentCols);
createGrid(outputMatrixDiv, currentCols, currentRows, null, true);
