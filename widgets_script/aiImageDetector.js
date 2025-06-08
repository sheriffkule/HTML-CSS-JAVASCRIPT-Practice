const tagsPerPage = 20;

document.getElementById('uploadButton').addEventListener('click', async () => {
    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0];
    const imagePreview = document.getElementById('imagePreview');
    const uploadModal = document.getElementById('uploadModal');
    const uploadProgress = document.getElementById('uploadProgress');

    if (!file) {
        return showToast('Please select an image file first...')
    }

    const reader = new FileReader();
    reader.onload = e => imagePreview.src = e.target.result;
    reader.readAsDataURL(file);

    const apiKey = '';
    const apiSecret = '';
})