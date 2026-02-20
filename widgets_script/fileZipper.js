document.addEventListener('DOMContentLoaded', function () {
  const title = document.getElementById('title');
  const text = title.textContent;
  const dropZone = document.getElementById('dropZone');
  const browseBtn = document.getElementById('browseBtn');
  const fileInput = document.getElementById('filterInput');
  const fileList = document.getElementById('fileList');
  const emptyState = document.getElementById('emptyState');
  const clearAllBtn = document.getElementById('clearAllBtn');
  const zipBtn = document.getElementById('zipBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const progressSection = document.getElementById('progressSection');
  const progressBar = document.getElementById('progressBar');
  const progressPercentage = document.getElementById('progressPercentage');
  const progressStatus = document.getElementById('progressStatus');
  const downloadSection = document.getElementById('downloadSection');
  const downloadLink = document.getElementById('downloadLink');
  const zipFileName = document.getElementById('zipFileName');
  const notification = document.getElementById('notification');
  const notificationText = document.getElementById('notificationText');

  // Store files
  let files = [];
  let zip = null;

  // Initialize
  UpdateFileList();

  // Title spiting characters for animation
  title.innerHTML = '';
  [...text].forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.setProperty('--i', i);
    span.className = 'titleCharacter';
    title.appendChild(span);
  });

  // Event listeners
  browseBtn.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', handleFileSelect);

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');

    if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
  });

  clearAllBtn.addEventListener('click', clearAllFiles);

  zipBtn.addEventListener('click', createZip);

  downloadBtn.addEventListener('click', () => {
    if (zip) downloadLink.click();
  });

  // Functions
  function handleFileSelect(e) {
    handleFiles(e.target.files);
  }

  function handleFiles(newFiles) {
    for (let i = 0; i < newFiles.length; i++) {
      if (!files.some((file) => file.name === newFiles[i].name && file.size === newFiles[i].size)) {
        files.push(newFiles[i]);
      }
    }

    UpdateFileList();
    showNotification(`Added ${newFiles.length} file(s)`);
  }
});
