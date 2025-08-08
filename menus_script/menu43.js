const tabWrapper = document.querySelectorAll('.tab-wrapper');

function initTabs(tabWrapper, currentActive) {
  const tabBtns = tabWrapper.querySelectorAll('.tab-btn');
  const underline = tabWrapper.querySelector('.underline');
  const tabContents = tabWrapper.querySelectorAll('.tab-content');

  currentActive = currentActive - 1;;

  tabBtns[currentActive].classList.add('active');
  underline.style.left = `${tabBtns[currentActive].offsetLeft}px`;
  underline.style.width = `${tabBtns[currentActive].offsetWidth}px`;

  tabContents.forEach((content) => {
        content.style.transform = `translateX(-${currentActive * 100}%)`;
      });

  tabBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      tabBtns.forEach((btn) => btn.classList.remove('active'));

      btn.classList.add('active');

      underline.style.left = `${btn.offsetLeft}px`;
      underline.style.width = `${btn.offsetWidth}px`;

      tabContents.forEach((content) => {
        content.style.transform = `translateX(-${index * 100}%)`;
      });
    });
  });
}

tabWrapper.forEach(wrapper => {
  initTabs(wrapper, 1);
});
