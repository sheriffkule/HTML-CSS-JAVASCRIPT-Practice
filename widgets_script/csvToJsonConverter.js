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
});
