document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const bingoGrid = document.getElementById('bingo-grid');
  const generateBtn = document.getElementById('generate-btn');
  const saveBtn = document.getElementById('save-btn');
  const generateMultipleBtn = document.getElementById('generate-multiple-btn');
  const saveAllBtn = document.getElementById('save-all-btn');
  const cardCountInput = document.getElementById('card-count');
  const cardTitleInput = document.getElementById('card-title');
  const freeTextInput = document.getElementById('free-text');
  const showTitleCheckbox = document.getElementById('show-title');
  const centerFreeCheckbox = document.getElementById('center-free');
  const colorOptions = document.querySelectorAll('.color-option');
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');
  const singleCardContainer = document.getElementById('single-card-container');
  const multipleCardsContainer = document.getElementById('multiple-cards-container');
  const toast = document.getElementById('toast');

  // Game state
  let currentColor = '#3a86ff';
  let cards = [];

  // Initialize
  generateCard();

  // Event Listeners
  generateBtn.addEventListener('click', generateCard);
  saveBtn.addEventListener('click', saveCardAsImage);
  generateMultipleBtn.addEventListener('click', generateMultipleCards);
  saveAllBtn.addEventListener('click', saveAllCardsAsImages);

  cardTitleInput.addEventListener('input', updateCardTitle);
  showTitleCheckbox.addEventListener('change', toggleCardTitle);

  colorOptions.forEach((option) => {
    option.addEventListener('click', () => {
      colorOptions.forEach((opt) => opt.classList.remove('selected'));
      option.classList.add('selected');
      currentColor = option.dataset.color;
      updateCardColor();
    });
  });

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tabContents.forEach((content) => content.classList.remove('active'));

      tab.classList.add('active');
      document.getElementById(`${tab.dataset.tab}-tab`).classList.add('active');

      if (tab.dataset.tab === 'multiple') {
        singleCardContainer.style.display = 'none';
        multipleCardsContainer.style.display = 'grid';
      } else {
        singleCardContainer.style.display = 'flex';
        multipleCardsContainer.style.display = 'none';
      }
    });
  });

  // Functions
  function generateCard() {
    bingoGrid.innerHTML = ''
  }
});
