const uploadBox = document.querySelector('.upload-box');
const fileInput = document.getElementById('fileInput');
const uploadStatus = document.querySelector('.upload-status');

uploadBox.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', function () {
  uploadImage(this.files[0]);
});

uploadBox.addEventListener('dragover', function (e) {
  e.preventDefault();
  uploadBox.classList.add('hover');
});

uploadBox.addEventListener('dragleave', function () {
  uploadBox.classList.remove('hover');
});

uploadBox.addEventListener('drop', function (e) {
  e.preventDefault();
  uploadBox.classList.remove('hover');
  uploadImage(e.dataTransfer.files[0]);
});

function uploadImage(file) {
  if (!file.type.startsWith('image/')) {
    alert('Please upload a valid image file.');
    return;
  }

  const reader = new FileReader();

  reader.onload = function (event) {
    uploadBox.innerHTML = `<img src="${event.target.result}" alt="Uploaded Image">`;
    uploadStatus.style.opacity = 1;
    uploadStatus.style.transform = 'translateY(0)';
    uploadStatus.textContent = 'Image uploaded successfully!';
  };

  reader.readAsDataURL(file);
}
