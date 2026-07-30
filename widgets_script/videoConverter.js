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
});
