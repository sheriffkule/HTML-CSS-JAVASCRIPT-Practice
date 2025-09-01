function viewStatus(name, imgSrc, caption, time) {
  const modal = document.getElementById('statusModal');
  const modalImg = document.getElementById('modalImage');
  const modalAvatar = document.getElementById('modalAvatar');
  const modalName = document.getElementById('modalName');
  const modalCaption = document.getElementById('modalCaption');
  const modalTime = document.getElementById('modalTime');
  const progressContainer = document.getElementById('statusProgress');

  if (modalImg) modalImg.src = imgSrc;
  if (modalAvatar) modalAvatar.src = imgSrc;
  modalName.textContent = name;
  modalCaption.textContent = caption;
  modalTime.textContent = time;

  progressContainer.innerHTML = '';
  for (let i = 0; i < 5; i++) {
    const seg = document.createElement('div');
    seg.className = 'progress-segment';
    progressContainer.appendChild(seg);

    setTimeout(() => {
      seg.style.width = '100%';
      seg.style.opacity = 1 - i * 0.1;
    }, i * 500);
  }

  setTimeout(() => {
    modal.classList.remove('active');
  }, 5000);

  modal.classList.add('active');
}

function closeStatus() {
  document.querySelector('.close-btn').addEventListener('click', () => {
    document.getElementById('statusModal').classList.remove('active');
  });
}
