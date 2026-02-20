document.addEventListener('DOMContentLoaded', function () {
  const title = document.getElementById('title');
  const text = title.textContent;
  const dropZone = document.getElementById('dropZone');
  const browseBtn = document.getElementById('browseBtn');
  const fileInput = document.getElementById('fileInput');
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
  updateFileList();

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

    updateFileList();
    showNotification(`Added ${newFiles.length} file(s)`);
  }

  function updateFileList() {
    // Clear file list
    fileList.innerHTML = '';

    if (files.length === 0) {
      fileList.appendChild(emptyState);
      emptyState.style.display = 'block';
      clearAllBtn.disabled = true;
      zipBtn.disabled = true;
      return;
    }

    emptyState.style.display = 'none';
    clearAllBtn.disabled = false;
    zipBtn.disabled = false;

    // Add files to list
    files.forEach((file, index) => {
      const fileItem = document.createElement('div');
      fileItem.className = 'file-item';

      const fileExtension = getFileExtension(file.name);
      const fileIcon = getFileIcon(fileExtension);

      fileItem.innerHTML = `
        <div class="file-icon">${fileIcon}</div>
        <div class="file-name">${file.name}</div>
        <div class="file-size">${formatFileSize(file.size)}</div>
        <div class="remove-file" data-index="${index}">&times;</div>
      `;

      fileList.appendChild(fileItem);
      document.querySelector('.file-list').style.display = '';
    });

    // Add event listeners to remove buttons
    const removeButtons = document.querySelectorAll('.remove-file');
    removeButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-index'));
        removeFile(index);
      });
    });
  }

  function removeFile(index) {
    const removedFile = files[index].name;
    files.splice(index, 1);
    updateFileList();
    showNotification(`Removed ${removedFile}`);
  }

  function clearAllFiles() {
    files = [];
    updateFileList();
    showNotification('All files cleared');
    progressSection.style.display = 'none'
  }

  function getFileExtension(filename) {
    return filename.split('.').pop().toLowerCase();
  }

  function getFileIcon(extension) {
    const iconMap = {
      pdf: '<i class="fas fa-file-pdf"></i>',
      doc: '<i class="fas fa-file-word"></i>',
      docx: '<i class="fas fa-file-word"></i>',
      xls: '<i class="fas fa-file-excel"></i>',
      xlsx: '<i class="fas fa-file-excel"></i>',
      ppt: '<i class="fas fa-file-powerpoint"></i>',
      pptx: '<i class="fas fa-file-powerpoint"></i>',
      jpg: '<i class="fas fa-file-image"></i>',
      jpeg: '<i class="fas fa-file-image"></i>',
      png: '<i class="fas fa-file-image"></i>',
      gif: '<i class="fas fa-file-image"></i>',
      txt: '<i class="fas fa-file-alt"></i>',
      zip: '<i class="fas fa-file-archive"></i>',
      rar: '<i class="fas fa-file-archive"></i>',
      mp3: '<i class="fas fa-file-audio"></i>',
      wav: '<i class="fas fa-file-audio"></i>',
      mp4: '<i class="fas fa-file-video"></i>',
      avi: '<i class="fas fa-file-video"></i>',
    };

    return iconMap[extension] || '<i class="fas fa-file"></i>';
  }

  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
  }

  function showNotification(message, isError = false) {
    notificationText.textContent = message;
    notification.className = 'notification';

    if (isError) notification.classList.add('error');

    notification.classList.add('show');

    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000);
  }

  function updateProgress(progress) {
    const percentage = typeof progress === 'object' ? progress.percent : progress;

    progressBar.style.width = percentage + '%';
    progressPercentage.textContent = Math.round(percentage) + '%';

    if (percentage === 100) progressStatus.textContent = 'Compression complete!';
  }

  async function createZip() {
    if (files.length === 0) {
      showNotification('Please add files to compress', true);
      return;
    }

    // Reset UI
    progressSection.style.display = 'block';
    downloadSection.style.display = 'none';
    downloadBtn.disabled = true;
    updateProgress(0);

    try {
      zip = new JSZip();

      // Add files to zip with smooth progress updates
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        zip.file(file.name, file);

        const fileProgress = Math.floor(((i + 1) / files.length) * 20);
        updateProgress(fileProgress);

        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      // Generate zip file with progress callback
      const zipName = zipFileName.value || 'compressed_files';
      const zipBlob = await zip.generateAsync(
        {
          type: 'blob',
          compression: 'DEFLATE',
          compressionOptions: {
            level: 6,
          },
        },
        (metadata) => {
          const compressionProgress = 30 + Math.floor((metadata.percent * 80) / 100);
          updateProgress(compressionProgress);
        },
      );

      updateProgress(100);

      // Create download link
      const url = URL.createObjectURL(zipBlob);
      downloadLink.href = url;
      downloadLink.download = `${zipName}.zip`;

      // Show download section
      progressStatus.textContent = 'Compression complete!';
      downloadSection.style.display = 'block';
      downloadBtn.disabled = false;

      showNotification('Files compressed successfully!');
    } catch (error) {
      console.error('Error creating zip: ', error);
      showNotification('Error compressing files: ' + error.message, true);
    }
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
