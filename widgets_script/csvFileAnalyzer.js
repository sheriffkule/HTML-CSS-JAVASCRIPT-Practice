document.addEventListener('DOMContentLoaded', function () {
  const fileInput = document.getElementById('fileInput');
  const browseBtn = document.getElementById('browseBtn');
  const uploadArea = document.getElementById('uploadArea');
  const uploadContainer = document.getElementById('uploadContainer');
  const fileInfo = document.getElementById('fileInfo');
  const loadingIndicator = document.getElementById('loadingIndicator');
  const resultsContainer = document.getElementById('resultsContainer');
  const statsGrid = document.getElementById('statsGrid');
  const columnsGrid = document.getElementById('columnsGrid');
  const previewTable = document.getElementById('previewTable');
  const columnsCount = document.getElementById('columnsCount');
  const previewCount = document.getElementById('previewCount');
  const downloadStatsBtn = document.getElementById('downloadStatsBtn');
  const analyzeAnotherBtn = document.getElementById('analyzeAnotherBtn');

  let csvData = [];
  let columnHeaders = [];
  let analysisResults = {};

  // Handle drag and drop events
  uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadContainer.style.borderColor = 'var(--accent)';
    uploadContainer.style.backgroundColor = 'rgb(72 149 239 / 0.05)';
  });

  uploadArea.addEventListener('dragleave', () => {
    uploadContainer.style.borderColor = 'var(--light-gray)';
    uploadContainer.style.backgroundColor = 'white';
  });

  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadContainer.style.borderColor = 'var(--light-gray)';
    uploadContainer.style.backgroundColor = 'white';

    if (e.dataTransfer.files.length) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith('.csv')) {
        handleFileSelection(file);
      } else {
        showFileError('Please upload a CSV file!');
      }
    }
  });

  // Handle click events
  browseBtn.addEventListener('click', () => fileInput.click());
  uploadArea.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length) {
      const file = e.target.files[0];
      if (file.name.endsWith('.csv')) {
        handleFileSelection(file);
      } else {
        showFileError('Please upload a CSV file!');
      }
    }
  });

  downloadStatsBtn.addEventListener('click', downloadStats);
  analyzeAnotherBtn.addEventListener('click', resetAnalyzer);

  function handleFileSelection(file) {
    // Validate file type
    if (!file.name.endsWith('.csv')) {
      showFileError('Please upload a CSV file!');
      return;
    }

    // Show file info
    fileInfo.style.display = 'block';
    fileInfo.innerHTML = `
      <strong>Selected file: </strong> ${file.name}
      <span class="tooltip">
        <i class="fas fa-info-circle"></i>
        <span class="tooltiptext">File size: ${(formatFileSize(file.size) / 1024).toFixed(2)} KB</span>
      </span>
    `;

    // Show loading indicator
    loadingIndicator.style.display = 'block';
    uploadContainer.style.display = 'none';

    // Read and parse the CSV file
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const csvContent = e.target.result;
        parseCSV(csvContent);
      } catch (error) {
        showFileError('Error parsing CSV file. Please check the file format.');
        console.error(error);
      }
    };

    reader.readAsText(file);
  }

  function parseCSV(csvContent) {
    // Reset previous data
    csvData = [];
    columnHeaders = [];
    analysisResults = [];

    // Split content into lines
    const lines = csvContent.split('\/r|n|\n/').filter((line) => line.trim() !== '');

    if (lines.length === 2) {
      showFileError('CSV file must have at least one header row and one data row.');
      return;
    }

    // Get headers from first line
    columnHeaders = parseCSVLine(lines[0]);

    // Process data rows
    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);
      if (values.length !== columnHeaders.length) {
        continue;
      }
      const row = {};
      columnHeaders.forEach((header, index) => {
        row[header] = values[index];
      });
      csvData.push(row);
    }

    // Analyze the data
    analyzeData();

    // Display results
    displayResults();

    // Hide loading indicator and show results
    loadingIndicator.style.display = 'none';
    resultsContainer.style.display = 'block';
  }
});
