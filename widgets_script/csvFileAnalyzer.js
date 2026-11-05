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

  function parseCSVLine(line) {
    const values = [];
    let currentValue = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
          currentValue += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        values.push(currentValue.trim());
        currentValue = '';
      } else {
        currentValue += char;
      }
    }

    values.push(currentValue.trim());
    return values;
  }

  function analyzeData() {
    analysisResults = {
      rowCount: csvData.length,
      columnCount: columnHeaders.length,
      fileSize: fileInput.files[0].size,
      fileName: fileInput.files[0].name,
      columns: {},
    };

    // Column analysis
    columnHeaders.forEach((header) => {
      const columnValues = csvData.map((row) => row[header]);
      const numericValues = columnValues.filter((val) => !isNaN(parseFloat(val))).map(Number);
      const isNumeric = numericValues > 0;
      const emptyValues = columnValues.filter(
        (val) => val === '' || val === null || val === undefined,
      ).length;

      analysisResults.columns[header] = {
        isNumeric: isNumeric,
        sampleData: columnValues.slice(0, 5),
        isEmpty: emptyValues === columnValues.length,
        emptyPercentage: (emptyValues / columnValues.length) * 100,
        name: header,
        type: isNumeric ? 'numeric' : 'text',
        totalValues: columnValues.length,
        emptyValues: emptyValues,
        nonEmptyValues: columnValues.length - emptyValues,
        uniqueValues: [...new Set(columnValues)].length,
        numericValues: isNumeric ? numericValues : [],
        maxValue: isNumeric ? Math.max(...numericValues) : null,
        minValue: isNumeric ? Math.min(...numericValues) : null,
        average: isNumeric ? numericValues.reduce((a, b) => a + b, 0) / numericValues.length : null,
      };

      if (isNumeric) {
        analysisResults.columns[header].min = Math.min(...numericValues);
        analysisResults.columns[header].max = Math.max(...numericValues);
        analysisResults.columns[header].avg = numericValues.reduce((a, b) => a + b, 0) / numericValues.length;
      }
    });
  }

  function displayResults() {
    // Update stats grid
    statsGrid.innerHTML = `
      <div class="stat-card">
        <div class="stat-value">${analysisResults.rowCount}</div>
        <div class="stat-label">Total Rows</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${analysisResults.columnCount}</div>
        <div class="stat-label">Total Columns</div>
        <div class="stat-card">
          <div class="stat-value">${formatFileSize(analysisResults.fileSize)}</div>
          <div class="stat-label">File Size</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${new Date().toLocaleDateString()}</div>
          <div class="stat-label">Analysis Date</div>
        </div>
      </div>
    `;

    // Display column info
    columnsGrid.innerHTML = '';
    columnsCount.textContent = columnHeaders.length;

    columnHeaders.forEach((header) => {
      const columnInfo = analysisResults.columns[header];
      const columnCard = document.createElement('div');
      columnCard.className = 'column-card';
      columnCard.innerHTML = `
        <div class="column-name">${header}</div>
        <div class="column-stats">
          <div>Type: ${columnInfo.isNumeric ? 'Numeric' : 'Text'}</div>
          <div>Unique values: ${columnInfo.uniqueValues}</div>
          ${
            columnInfo.isNumeric
              ? `
                <div>Min: ${columnInfo.min.toFixed(2)}</div>
                <div>Max: ${columnInfo.max.toFixed(2)}</div>
                <div>Avg: ${columnInfo.avg.toFixed(2)}</div>
              `
              : ''
          }
          <div>
            Empty: ${columnInfo.emptyValues}
            (${((columnInfo.emptyValues / analysisResults.rowCount) * 100).toFixed(1)}%)
          </div>
        </div>
      `;
      columnCard.title = `Sample values: ${columnInfo.sampleData.join(', ')}`;
      columnsGrid.appendChild(columnCard);
    });

    // Display data preview (first 10 rows)
    displayDataPreview(10);
  }

  function displayDataPreview(rowCount) {
    previewTable.innerHTML = '';
    previewCount.textContent = `${Math.min(rowCount, csvData.length)} of ${csvData.length} rows`;

    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    columnHeaders.forEach((header) => {
      const th = document.createElement('th');
      th.textContent = header;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    previewTable.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    const displayCount = Math.min(rowCount, csvData.length);

    for (let i = 0; i < displayCount; i++) {
      const row = document.createElement('tr');
      columnHeaders.forEach((header) => {
        const td = document.createElement('td');
        td.textContent = csvData[i][header] || 'NULL';
        row.appendChild(td);
      });
      tbody.appendChild(row);
    }

    previewTable.appendChild(tbody);
  }

  function downloadStats() {
    const dataStr = JSON.stringify(analysisResults, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = `${analysisResults.fileName.replace('.csv', '')}_analysis.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }

  function resetAnalyzer() {
    fileInput.value = '';
    fileInfo.style.display = 'none';
    fileInfo.textContent = '';
    resultsContainer.style.display = 'none';
    uploadContainer.style.display = 'block';
    loadingIndicator.style.display = 'none';
  }

  function showFileError(message) {
    fileInfo.style.display = 'block';
    fileInfo.innerHTML = `<span style="color: var(--warning);"><i class="fas fa-exclamation-triangle"></i> ${message}</span>`;
    setTimeout(() => {
      fileInfo.style.display = 'none';
      uploadContainer.style.borderColor = 'var(--light-gray)';
    }, 3000);
  }
});
