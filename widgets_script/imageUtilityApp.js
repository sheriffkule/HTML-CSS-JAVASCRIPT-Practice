const imageInput = document.querySelector('#image-input');
const displayImageContainer = document.querySelector('#image-section>div');
const displayImage = document.querySelector('#display-image');
const imageStatus = document.querySelector('#image-status');
const allInputs = document.querySelectorAll('.filters-input');
const minMaxBtn = document.querySelector('#image-section button');
const minMaxBtnIcon = document.querySelector('#image-section button i');
const borderRadiusInput = document.querySelector('#border-radius');
const toggleBtn = document.querySelector('.toggle input') || document.querySelector('#toggle input');
const resetBtn = document.querySelector('#reset-btn');
const filters = {}; // Store current filter values
let isMinimized = true; // Track the state of the filter section

displayImage.style.maxHeight = '100%';
displayImage.style.maxWidth = '100%';
displayImage.style.width = '100%';
displayImage.style.height = '100%';
displayImageContainer.style.overflow = 'hidden';
let currentImageUrl = null;

let inputListeners = [];
let borderRadiusListener = null;
let minMaxBtnListener = null;

function updateRangeValueDisplay(input) {
  const displayValue = document.querySelector(`#${input.id}-value`);
  if (!displayValue) return;

  const suffix = input.dataset.sizing || '';
  displayValue.textContent = `${input.value}${suffix}`;
}

function updateFilters() {
  let filterString = '';
  for (const filter in filters) {
    filterString += `${filter}(${filters[filter]}) `;
  }
  displayImage.style.filter = filterString.trim() || 'none';
}

function activateOnImageLoad() {
  allInputs.forEach((input) => {
    const inputListener = (e) => {
      const target = e.target;
      filters[target.id] = `${target.value}${target.dataset.sizing || ''}`;
      updateRangeValueDisplay(target);
      updateFilters();
    };
    input.addEventListener('input', inputListener);
    inputListeners.push({ element: input, listener: inputListener });
    updateRangeValueDisplay(input);
  });

  borderRadiusListener = (e) => {
    if (toggleBtn && toggleBtn.checked) {
      e.target.dataset.sizing = '%';
      e.target.max = 50;
    } else {
      e.target.dataset.sizing = 'px';
      e.target.max = 250;
    }
    const radiusValue = `${e.target.value}${e.target.dataset.sizing}`;
    updateRangeValueDisplay(e.target);
    displayImage.style.borderRadius = radiusValue;
  };

  borderRadiusInput.addEventListener('input', borderRadiusListener);
  updateRangeValueDisplay(borderRadiusInput);

  minMaxBtnListener = () => {
    isMinimized = !isMinimized;
    if (isMinimized) {
      displayImage.style.maxHeight = '100%';
      displayImage.style.maxWidth = '100%';
      displayImage.style.width = '100%';
      displayImage.style.height = '100%';
      displayImageContainer.style.overflow = 'hidden';
      displayImageContainer.style.justifyContent = 'center';
      displayImageContainer.style.alignItems = 'center';
    } else {
      displayImage.style.maxHeight = '';
      displayImage.style.maxWidth = '';
      displayImage.style.width = 'auto';
      displayImage.style.height = 'auto';
      displayImageContainer.style.overflow = 'auto';
      displayImageContainer.style.justifyContent = 'flex-start';
      displayImageContainer.style.alignItems = 'flex-start';
    }
    minMaxBtnIcon.classList.toggle('fa-expand');
    minMaxBtnIcon.classList.toggle('fa-compress');
  };

  minMaxBtn.addEventListener('click', minMaxBtnListener);
}

function removeAllListeners() {
  inputListeners.forEach(({ element, listener }) => {
    element.removeEventListener('input', listener);
  });
  inputListeners = [];

  if (borderRadiusListener) {
    borderRadiusInput.removeEventListener('input', borderRadiusListener);
    borderRadiusListener = null;
  }

  if (minMaxBtnListener) {
    minMaxBtn.removeEventListener('click', minMaxBtnListener);
    minMaxBtnListener = null;
  }
}

function reset() {
  for (const key in filters) delete filters[key];
  displayImage.style.filter = 'none';
  displayImage.style.borderRadius = '0px';
  displayImage.style.cursor = 'move';
  borderRadiusInput.value = borderRadiusInput.defaultValue;
  borderRadiusInput.dataset.sizing = 'px';
  borderRadiusInput.max = 250;
  if (toggleBtn) toggleBtn.checked = false;
  allInputs.forEach((input) => {
    input.value = input.defaultValue;
    updateRangeValueDisplay(input);
  });
  updateRangeValueDisplay(borderRadiusInput);
}

resetBtn.addEventListener('click', reset);

resetBtn.addEventListener('dblclick', () => {
  imageInput.value = '';
  if (currentImageUrl) URL.revokeObjectURL(currentImageUrl);
  currentImageUrl = null;
  displayImage.removeAttribute('src');
  imageStatus.textContent = 'Choose an image or drag it here.';
  imageStatus.style.display = 'block';
  displayImageContainer.style.border = '4px dashed lightgrey';
  displayImageContainer.style.background = 'transparent';
});

function loadImageFile(file) {
  if (!file) return;

  if (currentImageUrl) URL.revokeObjectURL(currentImageUrl);
  const imageUrl = URL.createObjectURL(file);
  currentImageUrl = imageUrl;
  imageStatus.textContent = 'Loading image...';
  imageStatus.style.display = 'block';
  displayImage.removeAttribute('src');
  displayImage.onload = () => {
    if (currentImageUrl !== imageUrl) return;
    imageStatus.style.display = 'none';
    displayImage.style.cursor = 'move';
    displayImageContainer.style.border = '4px dotted lightgrey';
    displayImageContainer.style.background = 'transparent';
    reset();
  };
  displayImage.onerror = () => {
    if (currentImageUrl !== imageUrl) return;
    imageStatus.textContent = 'This image could not be loaded. Please choose another file.';
    imageStatus.style.display = 'block';
    displayImage.removeAttribute('src');
    URL.revokeObjectURL(imageUrl);
    currentImageUrl = null;
  };
  displayImage.src = imageUrl;
}

imageInput.addEventListener('change', (e) => {
  loadImageFile(e.target.files && e.target.files[0]);
});

displayImageContainer.addEventListener('dragover', (e) => {
  e.preventDefault();
  displayImageContainer.classList.add('drag-over');
});

displayImageContainer.addEventListener('dragleave', (e) => {
  if (!displayImageContainer.contains(e.relatedTarget)) {
    displayImageContainer.classList.remove('drag-over');
  }
});

displayImageContainer.addEventListener('drop', (e) => {
  e.preventDefault();
  displayImageContainer.classList.remove('drag-over');
  loadImageFile(e.dataTransfer.files && e.dataTransfer.files[0]);
});

const downloadNowBtn = document.querySelector('#download-now-btn');
const closeBtn = document.querySelector('#close-btn');
const popup = document.querySelector('#popup');
const imgContainer = document.querySelector('#img-container');
const downloadBtn = document.querySelector('#download-btn');
const shareBtn = document.querySelector('#share-btn');

const convertDivToPNG = async () => {
  const node = displayImage;
  const dataUrl = await domtoimage.toPng(node, { backgroundColor: null });
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  return new File([blob], 'edited.png', { type: 'image/png' });
};

const showDownloadPreview = (file) => {
  popup.style.display = 'block';
  if (imgContainer.firstChild) imgContainer.removeChild(imgContainer.firstChild);

  const img = document.createElement('img');
  img.src = URL.createObjectURL(file);
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.repeat = 'no-repeat';
  imgContainer.appendChild(img);

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    shareBtn.style.display = 'block';
    shareBtn.onclick = () => {
      navigator
        .share({
          title: 'edited.png',
          text: 'Check out my edited image!',
          files: [file],
        })
        .then(() => {
          console.log('Thanks for sharing!');
        })
        .catch((error) => {
          console.error('Error sharing:', error);
        });
    };
  } else {
    shareBtn.style.display = 'none';
  }
};

const downloadFile = () => {
  const img = imgContainer.querySelector('img');
  if (!img) return;

  const imgUrl = img.src;
  const link = document.createElement('a');
  link.href = imgUrl;
  link.download = 'edited.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const generateAndPreviewDownload = (shouldDownload = false) => {
  convertDivToPNG()
    .then((file) => {
      showDownloadPreview(file);
      if (shouldDownload) downloadFile();
    })
    .catch((error) => {
      console.error('Oops, something went wrong!', error);
    });
};

downloadNowBtn.addEventListener('click', () => generateAndPreviewDownload(true));
downloadBtn.addEventListener('click', () => generateAndPreviewDownload(true));
closeBtn.addEventListener('click', () => {
  popup.style.display = 'none';
});

popup.addEventListener('click', (e) => {
  if (e.target === popup) popup.style.display = 'none';
});

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.querySelector('#preloader').style.transform = 'translate(0, -105dvh)';
  }, 2500);
});

// Changing colors on input type range track
activateOnImageLoad();

document.querySelectorAll('input[type="range"]').forEach((input) => {
  const updateTrack = () => {
    const min = parseFloat(input.min) || 0;
    const max = parseFloat(input.max) || 100;
    const value = parseFloat(input.value);
    const ratio = Math.min(Math.max((value - min) / (max - min), 0), 1);
    const val = ratio * 100;

    input.style.backgroundImage = `linear-gradient(to right, var(--primary) 0%, var(--success) ${val}%, var(--surface) ${val}%, var(--surface) 100%)`;
  };
  input.addEventListener('input', updateTrack);
  updateTrack();
});
