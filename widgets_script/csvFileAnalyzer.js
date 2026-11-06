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

  if (!fileInput || !browseBtn || !uploadArea || !uploadContainer || !fileInfo || !loadingIndicator || !resultsContainer || !statsGrid || !columnsGrid || !previewTable || !columnsCount || !previewCount || !downloadStatsBtn || !analyzeAnotherBtn) {
    return;
  }

  let csvData = [];
  let columnHeaders = [];
  let analysisResults = {};
  let selectedFile = null;

  function isNumericValue(value) {
    if (value === null || value === undefined) {
      return false;
    }

    const trimmed = String(value).trim();
    return trimmed !== '' && /^[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?$/.test(trimmed);
  }

  function formatFileSize(bytes) {
    if (!bytes || Number(bytes) === 0) {
      return '0 Bytes';
    }

    const units = ['Bytes', 'KB', 'MB', 'GB'];
    const size = Number(bytes);
    const index = Math.min(Math.floor(Math.log(size) / Math.log(1024)), units.length - 1);
    const value = size / 1024 ** index;
    const decimals = value >= 10 || index === 0 ? 0 : 1;

    return `${value.toFixed(decimals)} ${units[index]}`;
  }

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
      if (/\.csv$/i.test(file.name)) {
        handleFileSelection(file);
      } else {
        showFileError('Please upload a CSV file!');
      }
    }
  });

  // Handle click events
  browseBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    fileInput.value = '';
    fileInput.click();
  });
  uploadArea.addEventListener('click', (event) => {
    if (!browseBtn.contains(event.target) && event.target !== fileInput) {
      fileInput.value = '';
      fileInput.click();
    }
  });

  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length) {
      const file = e.target.files[0];
      if (/\.csv$/i.test(file.name)) {
        handleFileSelection(file);
      } else {
        showFileError('Please upload a CSV file!');
      }
    }
  });

  downloadStatsBtn.addEventListener('click', downloadStats);
  analyzeAnotherBtn.addEventListener('click', resetAnalyzer);

  function handleFileSelection(file) {
    if (!file || !/\.csv$/i.test(file.name)) {
      showFileError('Please upload a CSV file!');
      return;
    }

    selectedFile = file;
    fileInfo.textContent = `Selected file: ${file.name} (File size: ${formatFileSize(file.size)})`;
    fileInfo.style.display = 'block';

    loadingIndicator.style.display = 'block';
    uploadContainer.style.display = 'none';

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
    reader.onerror = function () {
      showFileError('Unable to read the selected file. Please try again.');
    };

    reader.readAsText(file);
  }

  function parseCSV(csvContent) {
    csvData = [];
    columnHeaders = [];
    analysisResults = {};

    const normalizedContent = String(csvContent || '').replace(/^\uFEFF/, '');
    const lines = normalizedContent.split(/\r\n|\n|\r/).filter((line) => line.trim() !== '');

    if (lines.length < 2) {
      showFileError('CSV file must have at least one header row and one data row.');
      return;
    }

    columnHeaders = parseCSVLine(lines[0]);

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

    if (!csvData.length) {
      showFileError('CSV file must include at least one valid data row.');
      return;
    }

    analyzeData();
    displayResults();
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
      fileSize: selectedFile ? selectedFile.size : 0,
      fileName: selectedFile ? selectedFile.name : 'unknown.csv',
      columns: {},
    };

    columnHeaders.forEach((header) => {
      const columnValues = csvData.map((row) => row[header]);
      const nonEmptyValues = columnValues.filter((value) => value !== '' && value !== null && value !== undefined);
      const numericValues = nonEmptyValues.filter((value) => isNumericValue(value)).map((value) => Number(value));
      const isNumeric = nonEmptyValues.length > 0 && numericValues.length === nonEmptyValues.length;
      const emptyValues = columnValues.filter((value) => value === '' || value === null || value === undefined).length;
      const emptyPercentage = columnValues.length ? (emptyValues / columnValues.length) * 100 : 0;
      const minValue = isNumeric && numericValues.length ? Math.min(...numericValues) : null;
      const maxValue = isNumeric && numericValues.length ? Math.max(...numericValues) : null;
      const avgValue = isNumeric && numericValues.length ? numericValues.reduce((a, b) => a + b, 0) / numericValues.length : null;

      analysisResults.columns[header] = {
        isNumeric,
        sampleData: columnValues.slice(0, 5).map((value) => value ?? ''),
        isEmpty: emptyValues === columnValues.length,
        emptyPercentage,
        name: header,
        type: isNumeric ? 'numeric' : 'text',
        totalValues: columnValues.length,
        emptyValues,
        nonEmptyValues: columnValues.length - emptyValues,
        uniqueValues: [...new Set(columnValues)].length,
        numericValues: isNumeric ? numericValues : [],
        maxValue,
        minValue,
        average: avgValue,
        min: minValue,
        max: maxValue,
        avg: avgValue,
      };
    });
  }

  function displayResults() {
    statsGrid.innerHTML = `
      <div class="stat-card">
        <div class="stat-value">${analysisResults.rowCount}</div>
        <div class="stat-label">Total Rows</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${analysisResults.columnCount}</div>
        <div class="stat-label">Total Columns</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${formatFileSize(analysisResults.fileSize)}</div>
        <div class="stat-label">File Size</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${new Date().toLocaleDateString()}</div>
        <div class="stat-label">Analysis Date</div>
      </div>
    `;

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

    displayDataPreview(10);
  }

  function displayDataPreview(rowCount) {
    previewTable.innerHTML = '';
    previewCount.textContent = `${Math.min(rowCount, csvData.length)} of ${csvData.length} rows`;

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    columnHeaders.forEach((header) => {
      const th = document.createElement('th');
      th.textContent = header;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    previewTable.appendChild(thead);

    const tbody = document.createElement('tbody');
    const displayCount = Math.min(rowCount, csvData.length);

    for (let i = 0; i < displayCount; i++) {
      const row = document.createElement('tr');
      columnHeaders.forEach((header) => {
        const td = document.createElement('td');
        td.textContent = csvData[i][header] ?? 'NULL';
        row.appendChild(td);
      });
      tbody.appendChild(row);
    }

    previewTable.appendChild(tbody);
  }

  function downloadStats() {
    if (!analysisResults.fileName) {
      showFileError('Please analyze a CSV file before downloading the report.');
      return;
    }

    const dataStr = JSON.stringify(analysisResults, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `${analysisResults.fileName.replace(/\.csv$/i, '')}_analysis.json`;

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
    csvData = [];
    columnHeaders = [];
    analysisResults = {};
    selectedFile = null;
  }

  function showFileError(message) {
    fileInfo.style.display = 'block';
    fileInfo.textContent = message;
    loadingIndicator.style.display = 'none';
    uploadContainer.style.display = 'block';
    setTimeout(() => {
      fileInfo.style.display = 'none';
      uploadContainer.style.borderColor = 'var(--light-gray)';
    }, 3000);
  }

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
