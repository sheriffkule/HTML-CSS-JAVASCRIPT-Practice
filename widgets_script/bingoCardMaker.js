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
  freeTextInput.addEventListener('input', generateCard);
  centerFreeCheckbox.addEventListener('change', generateCard);

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
    const iCol = generateUniqueNumbers(16, 30, 5);
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
    updateCardTitle();
    toggleCardTitle();
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
    if (card) card.style.borderTop = `5px solid ${currentColor}`;

    const headerCells = document.querySelectorAll('.bingo-header div');
    headerCells.forEach((cell) => {
      cell.style.color = currentColor;
    });

    const titles = document.querySelectorAll('.card-title');
    titles.forEach((title) => {
      title.style.color = currentColor;
    });
  }

  function updateCardTitle() {
    const titles = document.querySelectorAll('.card-title');
    titles.forEach((title, index) => {
      if (index === 0) {
        title.textContent = cardTitleInput.value || 'Bingo Card';
      } else {
        title.textContent = `${cardTitleInput.value || 'Bingo Card'} ${index + 1}`;
      }
    });
  }

  function toggleCardTitle() {
    const titles = document.querySelectorAll('.card-title');
    titles.forEach((title) => {
      title.style.display = showTitleCheckbox.checked ? 'block' : 'none';
    });
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

  function generateMultipleCards() {
    cards = [];
    multipleCardsContainer.innerHTML = '';
    const rawCount = parseInt(cardCountInput.value, 10);
    const count = Number.isInteger(rawCount) && rawCount > 0 ? rawCount : 4;

    for (let i = 0; i < count; i++) {
      const cardDiv = document.createElement('div');
      cardDiv.className = 'bingo-card';
      cardDiv.style.borderTop = `5px solid ${currentColor}`;

      const title = document.createElement('div');
      title.className = 'card-title';
      title.textContent = `${cardTitleInput.value || 'Bingo Card'} ${i + 1}`;
      title.style.color = currentColor;
      title.style.display = showTitleCheckbox.checked ? 'block' : 'none';
      cardDiv.appendChild(title);

      const header = document.createElement('div');
      header.className = 'bingo-header';
      header.innerHTML = `
        <div style="color: ${currentColor}">B</div>
        <div style="color: ${currentColor}">I</div>
        <div style="color: ${currentColor}">N</div>
        <div style="color: ${currentColor}">G</div>
        <div style="color: ${currentColor}">O</div>
      `;
      cardDiv.appendChild(header);

      const grid = document.createElement('div');
      grid.className = 'bingo-grid';

      // Generate numbers for each column
      const bCol = generateUniqueNumbers(1, 15, 5);
      const iCol = generateUniqueNumbers(16, 30, 5);
      const nCol = generateUniqueNumbers(31, 45, 5);
      const gCol = generateUniqueNumbers(46, 60, 5);
      const oCol = generateUniqueNumbers(61, 75, 5);

      // Create cells
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
          }

          grid.appendChild(cell);
        }
      }

      cardDiv.appendChild(grid);
      multipleCardsContainer.appendChild(cardDiv);
      cards.push(cardDiv);
    }

    showToast(`Generated ${count} Bingo cards!`);
  }

  function saveAllCardsAsImages() {
    if (cards.length === 0) {
      showToast('No cards to save! Generate some first.');
      return;
    }

    let savedCount = 0;

    cards.forEach((card, index) => {
      html2canvas(card, {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
      }).then((canvas) => {
        const link = document.createElement('a');
        link.download = `bingo-card-${index + 1}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();

        savedCount++;
        if (savedCount === cards.length) {
          showToast(`All ${savedCount} cards saved!`);
        }
      });
    });
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
});
