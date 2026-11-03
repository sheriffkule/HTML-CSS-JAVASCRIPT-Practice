const imageInput = document.querySelector('#image-input');
const displayImageContainer = document.querySelector('#image-section>figure');
const displayImage = document.querySelector('#display-image');
const allInputs = document.querySelectorAll('.filters-input');
const minMaxBtn = document.querySelector('#image-section button');
const minMaxBtnIcon = document.querySelector('#image-section button i');
const borderRadiusInput = document.querySelector('#border-radius');
const toggleBtn = document.querySelector('#toggle input');
const resetBtn = document.querySelector('#reset-btn');
const filters = {}; // Store current filter values
let isMinimized = true; // Track the state of the filter section

displayImage.style.maxHeight = '100%';
displayImage.style.maxWidth = '100%';
displayImageContainer.style.overflow = 'hidden';

let inputListeners = [];
let borderRadiusListener = null;
let minMaxBtnListener = null;

function updateFilters() {
  let filterString = '';
  for (const filter in filters) {
    filterString += `${filter}(${filters[filter]}) `;
  }
  displayImage.style.filter = filterString.trim();
}

function activateOnImageLoad() {
  allInputs.forEach((input) => {
    const inputListener = (e) => {
      filters[e.target.id] = e.target.value + (e.target.dataset.sizing || '');
      updateFilters();
    };
    input.addEventListener('input', inputListener);
    inputListeners.push({ element: input, listener: inputListener });
  });

  borderRadiusListener = (e) => {
    if (toggleBtn.checked) {
      e.target.dataset.sizing = '%';
      e.target.max = 50;
    } else {
      e.target.dataset.sizing = 'px';
      e.target.max = 250;
    }
    displayImage.style.borderRadius = `{e.target.value}${e.target.dataset.sizing}`;
  };

  borderRadiusInput.addEventListener('input', borderRadiusListener);

  minMaxBtnListener = () => {
    isMinimized = !isMinimized;
    if (isMinimized) {
      displayImage.style.maxHeight = '100%';
      displayImage.style.maxWidth = '100%';
      displayImageContainer.style.overflow = 'hidden';
      displayImageContainer.style.justifyContent = 'center';
      displayImageContainer.style.alignItems = 'center';
    } else {
      displayImage.style.maxHeight = '';
      displayImage.style.maxWidth = '';
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
  removeAllListeners();
  displayImage.style.filter = 'none';
  displayImage.style.borderRadius = 0;
  displayImage.style.cursor = 'move';
  borderRadiusInput.value = borderRadiusInput.defaultValue;
  allInputs.forEach((input) => {
    input.value = input.defaultValue;
  });
}

resetBtn.addEventListener('click', reset);

resetBtn.addEventListener('dblclick', () => {
  imageInput.value = '';
  displayImage.src = '';
  displayImageContainer.style.border = '4px dashed lightgrey';
  displayImageContainer.style.background = 'transparent';
});

imageInput.addEventListener('change', (e) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    const uploadedImage = reader.result;
    displayImage.src = uploadedImage;
    displayImage.style.cursor = 'move';
    displayImageContainer.style.border = '4px dotted lightgrey';
    displayImageContainer.style.background = 'transparent';
    reset();
    setTimeout(() => {
      console.log(displayImage.width, displayImage.height);
    }, 100);
    activateOnImageLoad();
  });

  reader.readAsDataURL(e.target.files[0]);
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

// Changing colors on input type range track
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
