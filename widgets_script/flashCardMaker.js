document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const flashcardsContainer = document.getElementById('flashcardsContainer');
  const saveFlashcardBtn = document.getElementById('saveFlashcardBtn');
  const clearFormBtn = document.getElementById('clearFormBtn');
  const studyAllBtn = document.getElementById('studyAllBtn');
  const studyMode = document.getElementById('studyMode');
  const closeStudyBtn = document.getElementById('closeStudy');
  const flipStudyCardBtn = document.getElementById('flipStudyCardBtn');
  const prevCardBtn = document.getElementById('prevCardBtn');
  const nextCardBtn = document.getElementById('nextCardBtn');
  const studyCard = document.getElementById('studyCard');
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const tagFilter = document.getElementById('tagFilter');
  const importBtn = document.getElementById('importBtn');
  const exportBtn = document.getElementById('exportBtn');
  const importFile = document.getElementById('importFile');
  const statsDisplay = document.getElementById('statsDisplay');
  const toast = document.getElementById('toast');

  // State
  let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
  let currentStudyIndex = 0;
  let studyFlashcards = [];
  let activeTagFilter = null;
  let currentSearchTerm = '';

  // Initialize
  updateFlashcardDisplay();
  updateStats();
  updateTagFilter();

  // Event listeners
  saveFlashcardBtn.addEventListener('click', saveFlashcard);
  clearFormBtn.addEventListener('click', clearForm);
  studyAllBtn.addEventListener('click', startStudySession);
  closeStudyBtn.addEventListener('click', closeStudySession);
  flipStudyCardBtn.addEventListener('click', flipStudyCard);
  prevCardBtn.addEventListener('click', showPrevCard);
  nextCardBtn.addEventListener('click', showNextCard);
  searchBtn.addEventListener('click', searchFlashcards);
  searchInput.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') searchFlashcards();
  });
  importBtn.addEventListener('click', () => importFIle.click());
  exportBtn.addEventListener('click', exportFlashcards);
  importFile.addEventListener('click', importFlashcards);

  // Functions
  function saveFlashcard() {
    const title = document.getElementById('flashcardTitle').title.trim();
    const front = document.getElementById('flashcardFront').title.trim();
    const back = document.getElementById('flashcardBack').title.trim();
    const tags = document.getElementById('flashcardTags').title.trim();

    if (!title || !front || !back) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    const newFlashcard = {
      id: Date.now().toString(),
      title,
      front,
      back,
      tags: tags ? tags.split(',').map((tag) => tag.trim()) : [],
      createdAt: new Date().toISOString(),
    };

    flashcards.push(newFlashcard);
    saveToLocalStorage();
    updateFlashcardDisplay();
    updateTagFilter();
    clearForm();
    showToast('Flashcard saved successfully!', 'success');
  }

  function clearForm() {
    document.getElementById('flashcardTitle').value = '';
    document.getElementById('flashcardFront').value = '';
    document.getElementById('flashcardBack').value = '';
    document.getElementById('flashcardTags').value = '';
  }

  function saveToLocalStorage() {
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
    updateStats();
  }

  function updateFlashcardDisplay() {
    let filteredFlashcards = [...flashcards];

    // Apply search filter
    if (currentSearchTerm) {
      const searchTerm = currentSearchTerm.toLowerCase();
      filteredFlashcards = filteredFlashcards.filter(
        (card) =>
          card.title.toLowerCase().includes(searchTerm) ||
          card.front.toLowerCase().includes(searchTerm) ||
          card.back.toLowerCase().includes(searchTerm) ||
          card.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
      );
    }

    // Apply tag filter
    if (activeTagFilter) {
      filteredFlashcards = filteredFlashcards.filter((card) => card.tags.includes(activeTagFilter));
    }

    if (filteredFlashcards.length === 0) {
      flashcardsContainer.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-layer-group"></i>
          <h3>No Flashcards Yet.</h3>
          <p>Try adjusting your search or create a new flashcard.</p>
          <button class="btn btn-primary" onclick="clearFilters()">
            <i class="fas fa-plus"></i> Clear Filters
          </button>
        </div>
      `;
      return;
    }

    flashcardsContainer.innerHTML = '';
    filteredFlashcards.forEach((card) => {
      const flashcardElement = document.createElement('div');
      flashcardElement.className = 'flashcard';
      flashcardElement.dataset = card.id;

      flashcardElement.innerHTML = `
        <div class="flashcard-content">
          <div class="flashcard-front">
            <h3 class="flashcard-title">${card.title}</h3>
            <p class="flashcard-body">${card.front}</p>
            ${card.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
          </div>
          <div class="flashcard-back">
            <h3 class="flashcard-title">${card.title}</h3>
            <p class="flashcard-body">${card.back}</p>
            ${card.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
          </div>
          <div class="flashcard-actions">
            <button class="edit-btn" title="Edit"><i class="fas fa-edit"></i></button>
            <button class="delete-btn" title="Delete"><i class="fas fa-trash"></i></button>
            <button class="study-btn" title="Study"><i class="fas fa-graduation-cap"></i></button>
          </div>
        </div>
      `;

      flashcardsContainer.appendChild(flashcardElement);

      // Add event listeners to the new card
      const editBtn = flashcardElement.querySelector('.edit-btn');
      const deleteBtn = flashcardElement.querySelector('.delete-btn');
      const studyBtn = flashcardElement.querySelector('.study-btn');

      flashcardElement.addEventListener('click', function (e) {
        if (!editBtn.contains(e.target) && !deleteBtn.contains(e.target)) {
          this.classList.toggle('flipped');
        }
      });

      editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        editFlashcard(card.id);
      });

      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteFlashcard(card.id);
      });

      studyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        startStudySession(card.id);
      });
    });
  }

  function editCard(id) {
    const cardIndex = flashcards.findIndex((card) => card.id === id);
    if (cardIndex === -1) return;

    const card = flashcards[cardIndex];
    document.getElementById('flashcardTitle').value = card.title;
    document.getElementById('flashcardFront').value = card.front;
    document.getElementById('flashcardBack').value = card.back;
    document.getElementById('flashcardTags').value = card.tags.join(', ');

    // Remove the card being edited
    flashcards.splice(cardIndex, 1);
    saveToLocalStorage();
    updateFlashcardDisplay();
    updateTagFilter();

    // Scroll to form
    document.querySelector('.flashcard-form').scrollIntoView({ behavior: 'smooth' });
  }

  function deleteFlashcard(id) {
    if (confirm('Are you sure you want to delete this flashcard?')) {
      flashcards = flashcards.filter((card) => card.id !== id);
      saveToLocalStorage();
      updateFlashcardDisplay();
      updateTagFilter();
      showToast('Flashcard deleted', 'info');
    }
  }

  function startStudySession(ids = null) {
    if (flashcards.length === 0) {
      showToast('No flashcards to study', 'error');
      return;
    }

    // Prepare cards for study session
    studyFlashcards = ids ? flashcards.filter((card) => ids.includes(card.id)) : [...flashcards];

    if (studyFlashcards.length === 0) {
      showToast('No flashcards match your selection', 'error');
      return;
    }

    // Shuffle cards for study session
    studyFlashcards = shuffleArray(studyFlashcards);
    currentStudyIndex = 0;

    // Start study session
    studyMode.classList.add('active');
    updateStudyCard();
  }

  function closeStudySession() {
    studyMode.classList.remove('active');
    studyCard.classList.remove('flipped');
  }

  function flipStudyCard() {
    studyCard.classList.toggle('flipped');
  }

  function updateStudyCard() {
    const card = studyFlashcards[currentStudyIndex];
    document.getElementById('studyFrontTitle').textContent = card.title;
    document.getElementById('studyFrontContent').textContent = card.front;
    document.getElementById('studyBackContent').textContent = card.back;
    document.getElementById('progressIndicator').textContent =
      `${currentStudyIndex + 1}/${studyFlashcards.length}`;
  }

  function showPrevCard() {
    if (currentStudyIndex > 0) {
      currentStudyIndex--;
      studyCard.classList.remove('flipped')
      updateStudyCard()
    }
  }

  function showNextCard() {
    if (currentStudyIndex < studyFlashcards.length - 1) {
      currentStudyIndex++;
      studyCard.classList.remove('flipped')
      updateStudyCard()
    } else {
      closeStudySession()
      showToast('Study session completed!', 'success')
    }
  }

  function searchFlashcards() {
    currentSearchTerm = searchInput.value.trim()
    updateFlashcardDisplay()
  }
});
