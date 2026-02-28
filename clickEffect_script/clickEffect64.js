document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('myModal');
  const openModalBtn = document.getElementById('openModalBtn');
  const closeBtn = document.querySelector('.close');
  const modalContent = document.querySelector('.modal-content');

  openModalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    setTimeout(() => {
      modalContent.classList.add('show');
    }, 50);
  });

  closeBtn.addEventListener('click', () => {
    modalContent.classList.remove('show');
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
  });

  let isDragging = false;
  let offsetX;
  let offsetY;

  modalContent.addEventListener('mousedown', (e) => {
    if (e.target !== closeBtn) {
      isDragging = true;
      offsetX = e.clientX - modalContent.getBoundingClientRect().left;
      offsetY = e.clientY - modalContent.getBoundingClientRect().top;
      modalContent.style.cursor = 'move';
    }
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;
      modalContent.style.position = 'absolute';
      modalContent.style.top = `${y}px`;
      modalContent.style.left = `${x}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    modalContent.style.cursor = 'default';
  });
});
