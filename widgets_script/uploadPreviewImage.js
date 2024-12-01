const file = document.querySelector('#file');
const image = document.querySelector('.image');
const cancelBtn = document.querySelector('.cancel-btn');

file.addEventListener('change', function () {
    const reader = new FileReader();

    image.classList.add('active');
    cancelBtn.classList.add('active');

    reader.addEventListener('load', () => {
        document.querySelector('#image').src=reader.result;
    })
    reader.readAsDataURL(this.files[0]);
});


cancelBtn.addEventListener('click', function () {
    image.classList.remove('active');
    cancelBtn.classList.remove('active');
});

const year = document.getElementById('year');
const thisYear = new Date().getFullYear();

year.setAttribute('datetime', thisYear);
year.textContent = thisYear;