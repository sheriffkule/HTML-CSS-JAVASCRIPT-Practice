const showModalBtn = document.querySelector('.show-modal');
const closeBtn = document.querySelector('.fa-close');
const showModal = document.querySelector('.wrapper');
const overlay = document.querySelector('.overlay');

const showModalFun = function() {
    overlay.classList.remove('hidden')
    showModal.classList.add('show')
}

const closeModal = function () {
    overlay.classList.add('hidden');
    showModal.classList.remove('show');
};

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (!showModal.classList.contains('hidden')) {
      closeModal();
    }
  }
});

showModalBtn.addEventListener('click', showModalFun);
closeBtn.addEventListener('click', closeModal);