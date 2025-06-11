const uploadBox = document.querySelector('.upload-box');
const previewImg = uploadBox.querySelector('img');
const fileInput = document.querySelector('input');
const widthInput = document.querySelector('.width input');
const heightInput = document.querySelector('.height input');
const ratioInput = document.querySelector('.ratio input');
const downloadBtn = document.querySelector('.download-btn');
const qualityInput = document.querySelector('.quality input');

let ogImageRatio;

const loadFile = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  previewImg.src = URL.createObjectURL(file);
  previewImg.addEventListener('load', () => {
    widthInput.value = previewImg.naturalWidth;
    heightInput.value = previewImg.naturalHeight;
    ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
    document.querySelector('.wrapper').classList.add('active');
  });
};

widthInput.addEventListener('keyup', () => {
  const height = ratioInput.checked ? widthInput.value / ogImageRatio : heightInput.value;
  heightInput.value = Math.floor(height);
});

heightInput.addEventListener('keyup', () => {
  const width = ratioInput.checked ? heightInput.value * ogImageRatio : widthInput.value;
  widthInput.value = Math.floor(width);
});

const resizeAndDownload = () => {
  const canvas = document.createElement('canvas');
  const a = document.createElement('a');
  const ctx = canvas.getContext('2d');

  const imgQuality = qualityInput.checked ? 0.7 : 1.0;

  canvas.width = widthInput.value;
  canvas.height = heightInput.value;

  ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);
  
  a.href = canvas.toDataURL('image/jpg', imgQuality);
  a.download = new Date().getTime();
  a.click();
};

downloadBtn.addEventListener('click', resizeAndDownload);
fileInput.addEventListener('change', loadFile);
uploadBox.addEventListener('click', () => fileInput.click());

function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');

  if (!yearElement) {
    console.error('Year element not found');
    return;
  }

  if (yearElement) {
    yearElement.setAttribute('datetime', currentYear.toString());
    yearElement.dateTime = currentYear;
    yearElement.textContent = currentYear.toString();
  }
}

window.addEventListener('load', updateYear);

for ( let i = 1; i <= 100; i++) {
    let sizeW = Math.random() * 10;
    let box = document.createElement('div');
    box.classList.add('box');
    box.style.left = Math.random() * + innerWidth + 'px';
    box.style.top = Math.random() * + innerHeight + 'px';
    box.style.fontSize = 10 + sizeW + 'px';
    document.querySelector('.sec').appendChild(box);
}

function animateBox() {
    let boxes = document.querySelectorAll('.box');
    let num = Math.floor(Math.random() * boxes.length);
    boxes[num].classList.toggle('animate');
}

setInterval(animateBox, 500);