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
    bingoGrid.innerHTML = '';

    // Generate numbers for each column
    const bCol = generateUniqueNumbers(1, 15, 5);
    const iCol = generateUniqueNumbers(6, 30, 5);
    const nCol = generateUniqueNumbers(31, 45, 5);
    const gCol = generateUniqueNumbers(46, 60, 5);
    const oCol = generateUniqueNumbers(61, 75, 5);

    // createCells
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        const cell = document.createElement('div');
        cell.className = 'bingo-cell';

        // Center cell is free space
        if (row === 2 && col === 2 && centerFreeCheckbox.checked) {
          cell.classList.add('free');
          cell.textContent = freeTextInput.value || 'FREE';
        } else {
          // Assign number based on column
          switch (col) {
            case 0:
              cell.textContent = bCol[row];
              break;
            case 1:
              cell.textContent = iCol[row];
              break;
            case 2:
              cell.textContent = nCol[row];
              break;
            case 3:
              cell.textContent = gCol[row];
              break;
            case 4:
              cell.textContent = oCol[row];
              break;
          }

          // Add click event to mark cells
          cell.addEventListener('click', function () {
            this.classList.toggle('marked');
          });
        }

        bingoGrid.appendChild(cell);
      }
    }

    updateCardColor();
    showToast('New Bingo card generated!');
  }

  function generateUniqueNumbers(min, max, count) {
    const numbers = [];
    while (numbers.length < count) {
      const num = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    return numbers;
  }

  function updateCardColor() {
    const card = document.getElementById('bingo-card');
    card.style.borderTop = `5px solid ${currentColor}`;

    const headerCells = document.querySelectorAll('.bingo-header div');
    headerCells.forEach((cell) => {
      cell.style.color = currentColor;
    });

    const title = document.querySelector('.card-title');
    if (title) title.style.color = currentColor;
  }

  function updateCardTitle() {
    const title = document.querySelector('.card-title');
    if (title) title.textContent = cardTitleInput.value || 'Bingo Card';
  }

  function toggleCardTitle() {
    const title = document.querySelector('.card-title');
    if (title) title.style.display = showTitleCheckbox.checked ? 'block' : 'none';
  }

  function saveCardAsImage() {
    const card = document.getElementById('bingo-card');

    html2canvas(card, {
      scale: 2,
      logging: false,
      useCORS: true,
      allowTaint: true,
    }).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'bingo-card.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      showToast('Card saved as image!');
    });
  }
});
