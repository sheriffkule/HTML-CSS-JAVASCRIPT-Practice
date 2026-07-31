document.addEventListener('DOMContentLoaded', function () {
  const dropArea = document.getElementById('dropArea');
  const browseBtn = document.getElementById('browseBtn');
  const fileInput = document.getElementById('fileInput');
  const settingsPanel = document.getElementById('settingsPanel');
  const convertBtn = document.getElementById('convertBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  const progressContainer = document.getElementById('progressContainer');
  const resultContainer = document.getElementById('resultContainer');
  const downloadBtn = document.getElementById('downloadBtn');
  const newConversionBtn = document.getElementById('newConversionBtn');
  const fileName = document.getElementById('fileName');
  const fileSize = document.getElementById('fileSize');
  const fileDuration = document.getElementById('fileDuration');
  const videoThumbnail = document.getElementById('videoThumbnail');
  const trimVideoCheckbox = document.getElementById('trimVideo');
  const trimOptions = document.getElementById('trimOptions');
  const progressBar = document.getElementById('progressBar');
  const progressPercent = document.getElementById('progressPercent');
  const progressStatus = document.getElementById('progressStatus');
  const timeRemaining = document.getElementById('timeRemaining');
  const resultInfo = document.getElementById('resultInfo');

  // Variables
  let selectedFile = null;
  let conversionInProgress = false;
  let conversionCancelled = false;

  // Event listeners
  browseBtn.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', handleFileSelect);
  dropArea.addEventListener('dragover', handleDragOver);
  dropArea.addEventListener('dragleave', handleDragLeave);
  dropArea.addEventListener('drop', handleDrop);
  convertBtn.addEventListener('click', startConversion);
  cancelBtn.addEventListener('click', cancelConversion);
  newConversionBtn.addEventListener('click', resetConverter);
  trimVideoCheckbox.addEventListener('change', toggleTrimOptions);

  // Functions
  function handleFileSelect(e) {
    const files = e.target.files || e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    dropArea.classList.add('drag-over');
  }

  function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    dropArea.classList.remove('drag-over');
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    dropArea.classList.remove('drag-over');

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  }

  function processFile(file) {
    // Check if file is a video
    if (!file.type.startsWith('video/') && !file.name.match(/\.(mp4|avi|mov|webm|flv|wmv)$/i)) {
      showError('Please select a valid video file!');
      return;
    }

    selectedFile = file;

    // Display file info
    fileName.textContent = `Name: ${file.name}`;
    fileSize.textContent = `Size: ${formatFileSize(file.size)}`;

    // Create a video element to get duration and thumbnail
    const video = document.createElement('video');
    video.preload = 'metadata';

    video.onloadedmetadata = function () {
      fileDuration.textContent = `Duration: ${formatDuration(video.duration)}`;

      // Create thumbnail
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 120;
      canvas.height = 80;

      // Seek to 25% of the video for thumbnail
      video.currentTime = video.duration * 0.25;

      video.onseeked = function () {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        videoThumbnail.src = canvas.toDataURL('image/jpeg');
        videoThumbnail.style.display = 'block';

        // Show settings panel
        settingsPanel.style.display = 'block';
        settingsPanel.classList.add('active')
        convertBtn.disabled = false;
        cancelBtn.disabled = false;
      };
    };

    video.src = URL.createObjectURL(file);
  }

  function toggleTrimOptions() {
    if (trimVideoCheckbox.checked) {
      trimOptions.style.display = 'block';
    } else {
      trimOptions.style.display = 'none';
    }
  }

  function startConversion() {
    if (!selectedFile || conversionInProgress) return;

    const outputFormat = document.getElementById('outputFormat').value;
    const quality = document.getElementById('quality').value;
    const resolution = document.getElementById('resolution').value;
    const trimVideo = trimVideoCheckbox.checked;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;

    // Validate trim times if enabled
    if (trimVideo && (!isValidTimeFormat(startTime) || !isValidTimeFormat(endTime))) {
      showError('Please enter a valid start and end times in HH:MM:SS format.');
      return;
    }

    // Hide settings, show progress
    settingsPanel.style.display = 'none';
    settingsPanel.classList.remove('active')
    progressContainer.style.display = 'block';
    conversionInProgress = true;
    conversionCancelled = false;

    // Simulate conversion progress (in a real app, this would use Web Workers or FFmpeg.js)
    let progress = 0;
    const interval = setInterval(() => {
      if (conversionCancelled) {
        clearInterval(interval);
        resetProgress();
        return;
      }

      progress += Math.random() * 5;
      if (progress > 100) progress = 100;

      updateProgress(progress);

      // Simulate time remaining
      const remaining = Math.round((100 - progress) / 5);
      timeRemaining.textContent = `Estimated time remaining: ${remaining} seconds`;

      if (progress === 100) {
        clearInterval(interval);
        conversionComplete(outputFormat);
      }
    }, 500);
  }

  function updateProgress(percent) {
    progressBar.style.width = `${percent}%`;
    progressPercent.textContent = `${Math.round(percent)}%`;

    if (percent < 30) {
      progressStatus.textContent = 'Preparing video...';
    } else if (percent < 70) {
      progressStatus.textContent = 'Converting video...';
    } else {
      progressStatus.textContent = 'Finalizing conversion...';
    }
  }

  function resetProgress() {
    progressBar.style.width = '0%';
    progressPercent.textContent = '0%';
    progressStatus.textContent = 'Converting...';
    timeRemaining.textContent = 'Estimated time remaining: --';
  }

  function conversionComplete(format) {
    conversionInProgress = false;

    // Hide progress, show result
    progressContainer.style.display = 'none';
    resultContainer.style.display = 'block';

    // In a real app, this would be the actual converted file
    // For demo purposes, we'll just simulate it
    const convertedFileName = selectedFile.name.replace(/\.[^/.]+$/, '') + '.' + format;
    resultInfo.textContent = `Your video has been converted to ${format.toUpperCase()} format.`;

    // Set up download button (in a real app, this would be the actual converted file)
    downloadBtn.setAttribute('download', convertedFileName);
    downloadBtn.href = URL.createObjectURL(selectedFile); // In real app, use converted file
  }

  function cancelConversion() {
    if (conversionInProgress) {
      conversionCancelled = true;
      conversionInProgress = false;
      showError('Conversion cancelled!');
      resetProgress();
      progressContainer.style.display = 'none';
      settingsPanel.style.display = 'none';
    } else {
      resetConverter();
    }
  }

  function resetConverter() {
    // Reset all elements
    selectedFile = null;
    fileInput.value = '';
    fileName.textContent = 'No file selected';
    fileSize.textContent = '--';
    fileDuration.textContent = '--';
    videoThumbnail.src = '';
    videoThumbnail.style.display = 'none';
    trimVideoCheckbox.checked = false;
    trimOptions.style.display = 'none';
    document.getElementById('startTime').value = '';
    document.getElementById('endTime').value = '';

    // Reset UI states
    settingsPanel.style.display = 'none';
    progressContainer.style.display = 'none';
    resultContainer.style.display = 'none';
    convertBtn.disabled = true;
    cancelBtn.disabled = true;
  }

  function showError(message) {
    alert(message);
  }

  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  function formatDuration(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s].filter(Boolean).join(':');
  }

  function isValidTimeFormat(time) {
    return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(time);
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
