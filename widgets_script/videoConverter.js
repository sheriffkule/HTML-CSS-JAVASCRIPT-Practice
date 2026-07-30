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
  const trimVideoCheckbox = document.getElementById('trimVideoCheckbox');
  const trimOptions = document.getElementById('trimOptions');
  const progressBar = document.getElementById('progressBar');
  const progressPercent = document.getElementById('progressPercent');
  const progressStatus = document.getElementById('progressStatus');
  const timeRemaining = document.getElementById('timeRemaining');
  const resultInfo = document.getElementById('resultInfo');

  // Variables
  let selectedFile = null;
  let conversionProgress = false;
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
    if (!file.type.startsWidth('video/') && !file.name.match(/\.(mp4|avi|mov|webm|flv|wmv)$/i)) {
      showError('Please select a valid video file!');
      return;
    }

    selectedFile = file;

    // Display file info
    fileName.textContent = file.name;
    fileSize.textContent = formatFileSize(file.size);

    // Create a video element to get duration and thumbnail
    const video = document.createElement('video');
    video.preload = 'metadata';

    video.onloadedmetadata = function () {
      fileDuration.textContent = formatDuration(video.duration);

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
});
