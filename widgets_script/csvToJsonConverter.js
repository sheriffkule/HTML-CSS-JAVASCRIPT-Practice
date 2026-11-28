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
    customDelimiter.style.display = delimiterSelect.value === 'custom' ? 'block' : 'none';

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

      const matrix = parseCsv(csv.replace(/^\uFEFF/, ''), delimiter, quoteChar);
      if (matrix.length === 0) {
        throw new Error('CSV input does not contain any data.');
      }
      let result;

      if (transpose) {
        result = convertTransposedCsv(matrix, hasHeader, parseNumbers, outputFormat);
      } else {
        result = convertStandardCsv(matrix, hasHeader, parseNumbers, outputFormat);
      }

      jsonOutput.value = result;
      statusText.textContent = 'Conversion successful!';
    } catch (error) {
      console.error('Conversion error', error);
      jsonOutput.value = '';
      updateCharCounts();
      errorMessage.textContent = `Error: ${error.message}`;
      errorMessage.style.display = 'block';
      statusText.textContent = 'Conversion failed!';
    }

    updateCharCounts();
  }

  function convertStandardCsv(matrix, hasHeader, parseNumbers, outputFormat) {
    const columnCount = matrix[0].length;

    matrix.forEach((row, index) => {
      if (row.length !== columnCount) {
        throw new Error(`Row ${index + 1} has ${row.length} columns, expected ${columnCount}`);
      }
    });

    const headers = hasHeader
      ? matrix[0].map((header) => header.trim())
      : Array.from({ length: columnCount }, (_, i) => `column_${i + 1}`);

    if (headers.some((header) => header === '')) {
      throw new Error('Header names cannot be empty.');
    }
    if (new Set(headers).size !== headers.length) {
      throw new Error('Header names must be unique.');
    }

    const data = [];

    const startRow = hasHeader ? 1 : 0;
    for (let i = startRow; i < matrix.length; i++) {
      const values = matrix[i];
      const obj = {};
      for (let j = 0; j < headers.length; j++) {
        const value = convertPrimitive(values[j], parseNumbers);
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

  function convertTransposedCsv(matrix, hasHeader, parseNumbers, outputFormat) {
    const columnCount = matrix[0].length;
    matrix.forEach((row, index) => {
      if (row.length !== columnCount) {
        throw new Error(`Row ${index + 1} has ${row.length} columns, expected ${columnCount}`);
      }
    });

    const transposed = matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
    return convertStandardCsv(transposed, hasHeader, parseNumbers, outputFormat);
  }

  function convertPrimitive(value, parseNumbers) {
    const trimmed = value.trim();
    if (trimmed === 'true') return true;
    if (trimmed === 'false') return false;

    if (parseNumbers && /^[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?$/.test(trimmed)) {
      return Number(trimmed);
    }
    return value;
  }

  function parseCsv(csv, delimiter, quoteChar) {
    if (!delimiter) {
      throw new Error('Please specify a custom delimiter.');
    }

    const matrix = [];
    let row = [];
    let field = '';
    let inQuotes = false;

    for (let i = 0; i < csv.length; i++) {
      const char = csv[i];

      if (inQuotes) {
        if (char === quoteChar) {
          if (csv[i + 1] === quoteChar) {
            field += quoteChar;
            i++;
          } else {
            inQuotes = false;
          }
        } else {
          field += char;
        }
        continue;
      }

      if (char === quoteChar && field.trim() === '') {
        field = '';
        inQuotes = true;
      } else if (csv.startsWith(delimiter, i)) {
        row.push(field);
        field = '';
        i += delimiter.length - 1;
      } else if (char === '\n' || char === '\r') {
        if (char === '\r' && csv[i + 1] === '\n') i++;
        row.push(field);
        if (row.length > 1 || row[0] !== '') matrix.push(row);
        row = [];
        field = '';
      } else {
        field += char;
      }
    }

    if (inQuotes) {
      throw new Error('Unclosed quoted field.');
    }

    row.push(field);
    if (row.length > 1 || row[0] !== '') matrix.push(row);
    return matrix;
  }

  function clearCsv() {
    csvInput.value = '';
    jsonOutput.value = '';
    errorMessage.style.display = 'none';
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

    const copied = () => {
      showToast('JSON copied to clipboard!');
      statusText.textContent = 'JSON copied to clipboard!';
    };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(jsonOutput.value)
        .then(copied)
        .catch((err) => {
          console.error('Failed to copy: ', err);
          showToast('Failed to copy JSON!', 'error');
        });
      return;
    }

    jsonOutput.focus();
    jsonOutput.select();
    if (document.execCommand('copy')) {
      copied();
    } else {
      showToast('Failed to copy JSON!', 'error');
    }
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
    window.setTimeout(() => URL.revokeObjectURL(url), 0);

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

  function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    dragDropArea.classList.remove('dragover');
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    dragDropArea.classList.remove('dragover');

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  }

  function handleFileSelect(e) {
    const file = e.target.files;
    if (file && file.length > 0) {
      handleFile(file[0]);
    }
  }

  function handleFile(file) {
    if (!/\.(csv|txt)$/i.test(file.name)) {
      showToast('Please select a CSV or text file!', 'warning');
      return;
    }

    fileName.textContent = file.name;
    fileInfo.style.display = 'block';

    const reader = new FileReader();
    reader.onload = function (e) {
      const content = e.target.result;
      csvInput.value = content;
      filePreview.textContent = content.length > 200 ? content.substring(0, 200) + '...' : content;
      convertCsvToJson();
      showToast('File loaded successfully!');
    };
    reader.readAsText(file);
  }

  function removeFile() {
    fileInput.value = '';
    fileInfo.style.display = 'none';
    csvInput.value = '';
    jsonOutput.value = '';
    errorMessage.style.display = 'none';
    updateCharCounts();
    statusText.textContent = 'File removed.';
    showToast('File removed.');
  }

  function switchTab(e) {
    const tabId = e.target.getAttribute('data-tab');

    // Update tabs
    tabs.forEach((tab) => {
      tab.classList.remove('active');
      if (tab === e.target) {
        tab.classList.add('active');
      }
    });

    // Update tab content
    tabContent.forEach((content) => {
      content.classList.remove('active');
      if (content.id === `${tabId}-content`) {
        content.classList.add('active');
      }
    });
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
