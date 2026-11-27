document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const csvInput = document.getElementById('csvInput');
  const jsonOutput = document.getElementById('jsonOutput');
  const clearCsvBtn = document.getElementById('clearCsvBtn');
  const exampleCsvBtn = document.getElementById('exampleCsvBtn');
  const copyJsonBtn = document.getElementById('copyJsonBtn');
  const downloadJsonBtn = document.getElementById('downloadJsonBtn');
  const delimiterSelect = document.getElementById('delimiter');
  const customDelimiter = document.getElementById('customDelimiter');
  const hasHeaderCheckbox = document.getElementById('hasHeader');
  const outputFormatSelect = document.getElementById('outputFormat');
  const quoteCharSelect = document.getElementById('quoteChar');
  const transposeCheckbox = document.getElementById('transpose');
  const parseNumberCheckbox = document.getElementById('parseNumber');
  const statusText = document.getElementById('statusText');
  const csvCharCount = document.getElementById('csvCharCount');
  const jsonCharCount = document.getElementById('jsonCharCount');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  const dragDropArea = document.getElementById('dragDropArea');
  const fileInput = document.getElementById('fileInput');
  const fileInfo = document.getElementById('fileInfo');
  const fileName = document.getElementById('fileName');
  const filePreview = document.getElementById('filePreview');
  const removeFileBtn = document.getElementById('removeFileBtn');
  const errorMessage = document.getElementById('errorMessage');
  const tabs = document.querySelectorAll('.tab');
  const tabContent = document.querySelectorAll('.tab-content');

  // Example CSV data
  const exampleCsv = `name,age,email,is_active
John Doe,30,john@example.com,true
Jane Smith,25,jane@example.com,false
Bob Johnson,45,bob@example.com,true
Alice Williams,28,alice@example.com,false`;

  // Initialize
  updateCharCounts();
  setupEventListeners();

  function setupEventListeners() {
    // Input changes
    csvInput.addEventListener('input', handleInputChange);

    // Buttons
    clearCsvBtn.addEventListener('click', clearCsv);
    exampleCsvBtn.addEventListener('click', loadExample);
    copyJsonBtn.addEventListener('click', copyJsonToClipboard);
    downloadJsonBtn.addEventListener('click', downloadJson);

    // Options
    delimiterSelect.addEventListener('change', handleDelimiterChange);
    customDelimiter.addEventListener('input', convertCsvToJson);
    hasHeaderCheckbox.addEventListener('change', convertCsvToJson);
    outputFormatSelect.addEventListener('change', convertCsvToJson);
    quoteCharSelect.addEventListener('change', convertCsvToJson);
    transposeCheckbox.addEventListener('change', convertCsvToJson);
    parseNumberCheckbox.addEventListener('change', convertCsvToJson);

    // File handling
    dragDropArea.addEventListener('click', () => fileInput.click());
    dragDropArea.addEventListener('dragover', handleDragOver);
    dragDropArea.addEventListener('dragleave', handleDragLeave);
    dragDropArea.addEventListener('drop', handleDrop);
    fileInput.addEventListener('change', handleFileSelect);
    removeFileBtn.addEventListener('click', removeFile);

    // Tabs
    tabs.forEach((tab) => {
      tab.addEventListener('click', switchTab);
    });
  }

  function handleInputChange() {
    updateCharCounts();
    convertCsvToJson();
  }

  function handleDelimiterChange() {
    if (delimiterSelect.value === 'custom') {
      customDelimiter.style.display = 'block';
    } else {
      customDelimiter.style.display = 'none';
      convertCsvToJson();
    }
  }

  function convertCsvToJson() {
    errorMessage.style.display = 'none';
    const csv = csvInput.value.trim();

    if (!csv) {
      jsonOutput.value = '';
      updateCharCounts();
      return;
    }

    try {
      const delimiter =
        delimiterSelect.value === 'custom'
          ? customDelimiter.value
          : delimiterSelect.value === '\\t'
            ? '\t'
            : delimiterSelect.value;

      if (!delimiter && delimiterSelect.value === 'custom') {
        throw new Error('Please specify a custom delimiter.');
      }

      const quoteChar = quoteCharSelect.value;
      const hasHeader = hasHeaderCheckbox.checked;
      const parseNumbers = parseNumberCheckbox.checked;
      const outputFormat = outputFormatSelect.value;
      const transpose = transposeCheckbox.checked;

      const lines = csv.split('\n').filter((line) => line.trim() !== '');
      let result;

      if (transpose) {
        result = convertTransposedCsv(lines, delimiter, quoteChar, hasHeader, parseNumbers, outputFormat);
      } else {
        result = convertStandardCsv(lines, delimiter, quoteChar, hasHeader, parseNumbers, outputFormat);
      }

      jsonOutput.value = result;
      statusText.textContent = 'Conversion successful!';
    } catch (error) {
      console.error('Conversion error', error);
      errorMessage.textContent = `Error: ${error.message}`;
      errorMessage.style.display = 'block';
      statusText.textContent = 'Conversion failed!';
    }

    updateCharCounts();
  }

  function convertStandardCsv(lines, delimiter, quoteChar, hasHeader, parseNumbers, outputFormat) {
    const headers = hasHeader
      ? lines[0].split(delimiter).map((h) => h.trim().replace(new RegExp(quoteChar, 'g'), ''))
      : Array.from({ length: lines[0].split(delimiter).length }, (_, i) => `column_${i + 1}`);

    const data = [];

    const startRow = hasHeader ? 1 : 0;
    for (let i = startRow; i < lines.length; i++) {
      const currentLine = lines[i];
      const values = parseCsvLine(currentLine, delimiter, quoteChar);

      if (values.length !== headers.length) {
        throw new Error(`Row ${i + 1} has ${values.length} columns, expected ${headers.length}`);
      }

      const obj = {};
      for (let j = 0; j < headers.length; j++) {
        let value = values[j];
        if (parseNumbers && !isNaN(value) && value.trim() !== '') {
          value = value.includes('.') ? parseFloat(value) : parseInt(value);
        } else if (value === 'true') {
          value = true;
        } else if (value === 'false') {
          value = false;
        }
        obj[headers[j]] = value;
      }
      data.push(obj);
    }

    if (outputFormat === 'array') {
      return JSON.stringify(data, null, 2);
    } else if (outputFormat === 'object') {
      const resultObj = {};
      data.forEach((item, index) => {
        resultObj[`item_${index + 1}`] = item;
      });
      return JSON.stringify(result, null, 2);
    } else {
      return JSON.stringify(data);
    }
  }

  function convertTransposedCsv(lines, delimiter, quoteChar, hasHeader, parseNumbers, outputFormat) {
    // Transpose the matrix first
    const matrix = lines.map((line) => parseCsvLine(line, delimiter, quoteChar));
    const transposed = matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));

    const headers = hasHeader
      ? transposed[0].map((h) => h.trim().replace(new RegExp(quoteChar, 'g'), ''))
      : Array.from({ length: transposed.length }, (_, i) => `column_${i + 1}`);

    const data = [];

    const startRow = hasHeader ? 1 : 0;
    for (let i = startRow; i < transposed.length; i++) {
      const currentLine = transposed[i];
      const obj = {};

      for (let j = 0; j < headers.length; j++) {
        let value = currentLine[j];
        if (parseNumbers && !isNaN(value) && value.trim() !== '') {
          value = value.includes('.') ? parseFloat(value) : parseInt(value);
        } else if (value === 'true') {
          value = true;
        } else if (value === 'false') {
          value = false;
        }
        obj[headers[j]] = value;
      }
      data.push(obj);
    }

    if (outputFormat === 'array') {
      return JSON.stringify(data, null, 2);
    } else if (outputFormat === 'object') {
      const resultObj = {};
      data.forEach((item, index) => {
        resultObj[`item_${index + 1}`] = item;
      });
      return JSON.stringify(resultObj, null, 2);
    } else {
      return JSON.stringify(data);
    }
  }

  function parseCsvLine(line, delimiter, quoteChar) {
    const pattern = new RegExp(
      `(?:${quoteChar}([^${quoteChar}]*)(${quoteChar}|([^${delimiter}]+))(?=${delimiter}\$)`,
      'g',
    );
    const matches = line.matchAll(pattern);
    const values = [];

    for (const match of matches) {
      values.push(match[1] !== undefined ? match[1] : match[2]);
    }

    // Handle case where line ends with delimiter
    if (line.endsWith(delimiter)) {
      values.push('');
    }

    return values;
  }

  function clearCsv() {
    csvInput.value = '';
    jsonOutput.value = '';
    updateCharCounts();
    statusText.textContent = 'Cleared input and output.';
    showToast('Input cleared!');
  }

  function loadExample() {
    csvInput.value = exampleCsv;
    updateCharCounts();
    convertCsvToJson();
    statusText.textContent = 'Loaded example CSV data.';
    showToast('Loaded example CSV!');
  }

  function copyJsonToClipboard() {
    if (!jsonOutput.value.trim()) {
      showToast('Nothing to copy!', 'warning');
      return;
    }

    navigator.clipboard
      .writeText(jsonOutput.value)
      .then(() => {
        showToast('JSON copied to clipboard!');
        statusText.textContent = 'JSON copied to clipboard!';
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
        showToast('Failed to copy JSON!', 'error');
      });
  }

  function downloadJson() {
    if (!jsonOutput.value.trim()) {
      showToast('Nothing to download!', 'warning');
      return;
    }

    const blob = new Blob([jsonOutput.value], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('JSON file downloaded!');
    statusText.textContent = 'File downloaded!';
  }

  function updateCharCounts() {
    csvCharCount.textContent = csvInput.value.length;
    jsonCharCount.textContent = jsonOutput.value.length;
  }

  function showToast(message, type = 'success') {
    toastMessage.textContent = message;

    toast.className = 'toast';
    toast.classList.add('show');

    // Add type-specific class
    if (type === 'success') {
      toast.style.backgroundColor = 'var(--success)';
    } else if (type === 'warning') {
      toast.style.backgroundColor = 'var(--warning)';
    } else if (type === 'error') {
      toast.style.backgroundColor = '#dc3545';
    }

    // Hide after 3 seconds
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    dragDropArea.classList.add('dragover');
  }
});
