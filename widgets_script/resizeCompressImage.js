const uploadBox = document.querySelector('.upload-box');
const previewImg = uploadBox.querySelector('img');
const fileInput = document.querySelector('input');

const loadFile = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  previewImg.src = URL.createObjectURL(file);
  console.log(file);
};

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
