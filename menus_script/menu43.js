const tabWrapper = document.querySelector('.tab-wrapper');
const tabBtns = tabWrapper.querySelectorAll('.tab-btn');
const underline = tabWrapper.querySelector('.underline');
const tabContents = tabWrapper.querySelectorAll('.tab-content');

tabBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    tabBtns.forEach((btn) => btn.classList.remove('active'));

    btn.classList.add('active');

    underline.style.left = `${btn.offsetLeft}px`;
    underline.style.width = `${btn.offsetWidth}px`;
  });
});
