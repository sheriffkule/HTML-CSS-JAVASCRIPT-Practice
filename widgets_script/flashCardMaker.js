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

  function normalizeFlashcard(card, index = 0) {
    if (!card || typeof card !== 'object') return null;

    const title = typeof card.title === 'string' ? card.title.trim() : '';
    const front = typeof card.front === 'string' ? card.front.trim() : '';
    const back = typeof card.back === 'string' ? card.back.trim() : '';
    if (!title || !front || !back) return null;

    const rawTags = Array.isArray(card.tags)
      ? card.tags
      : typeof card.tags === 'string'
        ? card.tags.split(',')
        : [];
    const tags = rawTags.filter((tag) => typeof tag === 'string').map((tag) => tag.trim()).filter(Boolean);

    return {
      id: String(card.id || `${Date.now()}-${index}`),
      title,
      front,
      back,
      tags,
      createdAt: card.createdAt || new Date().toISOString(),
    };
  }

  function loadFlashcards() {
    try {
      const storedCards = JSON.parse(localStorage.getItem('flashcards') || '[]');
      return Array.isArray(storedCards) ? storedCards.map(normalizeFlashcard).filter(Boolean) : [];
    } catch (error) {
      console.error('Unable to load flashcards', error);
      return [];
    }
  }

  function escapeHTML(value) {
    const element = document.createElement('div');
    element.textContent = value;
    return element.innerHTML;
  }

  // State
  let flashcards = loadFlashcards();
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
  studyAllBtn.addEventListener('click', () => startStudySession());
  closeStudyBtn.addEventListener('click', closeStudySession);
  flipStudyCardBtn.addEventListener('click', flipStudyCard);
  prevCardBtn.addEventListener('click', showPrevCard);
  nextCardBtn.addEventListener('click', showNextCard);
  searchBtn.addEventListener('click', searchFlashcards);
  searchInput.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') searchFlashcards();
  });
  importBtn.addEventListener('click', () => importFile.click());
  exportBtn.addEventListener('click', exportFlashcards);
  importFile.addEventListener('change', importFlashcards);

  // Functions
  function saveFlashcard() {
    const title = document.getElementById('flashcardTitle').value.trim();
    const front = document.getElementById('flashcardFront').value.trim();
    const back = document.getElementById('flashcardBack').value.trim();
    const tags = document.getElementById('flashcardTags').value.trim();

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
      flashcardElement.dataset.id = card.id;

      flashcardElement.innerHTML = `
        <div class="flashcard-content">
          <div class="flashcard-front">
            <h3 class="flashcard-title">${escapeHTML(card.title)}</h3>
            <p class="flashcard-body">${escapeHTML(card.front)}</p>
            ${card.tags.map((tag) => `<span class="tag">${escapeHTML(tag)}</span>`).join('')}
          </div>
          <div class="flashcard-back">
            <h3 class="flashcard-title">${escapeHTML(card.title)}</h3>
            <p class="flashcard-body">${escapeHTML(card.back)}</p>
            ${card.tags.map((tag) => `<span class="tag">${escapeHTML(tag)}</span>`).join('')}
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
        if (!editBtn.contains(e.target) && !deleteBtn.contains(e.target) && !studyBtn.contains(e.target)) {
          this.classList.toggle('flipped');
        }
      });

      editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        editCard(card.id);
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
    const selectedIds = ids === null ? null : Array.isArray(ids) ? ids : [ids];
    studyFlashcards = selectedIds ? flashcards.filter((card) => selectedIds.includes(card.id)) : [...flashcards];

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
      studyCard.classList.remove('flipped');
      updateStudyCard();
    }
  }

  function showNextCard() {
    if (currentStudyIndex < studyFlashcards.length - 1) {
      currentStudyIndex++;
      studyCard.classList.remove('flipped');
      updateStudyCard();
    } else {
      closeStudySession();
      showToast('Study session completed!', 'success');
    }
  }

  function searchFlashcards() {
    currentSearchTerm = searchInput.value.trim();
    updateFlashcardDisplay();
  }

  function updateTagFilter() {
    // Get all unique tags
    const allTags = new Set();
    flashcards.forEach((card) => {
      card.tags.forEach((tag) => allTags.add(tag));
    });

    tagFilter.innerHTML = '';

    // Add "All" button
    const allButton = document.createElement('button');
    allButton.textContent = 'All';
    allButton.className = !activeTagFilter ? 'active' : '';
    allButton.addEventListener('click', () => {
      activeTagFilter = null;
      updateTagFilterButtons();
      updateFlashcardDisplay();
    });
    tagFilter.appendChild(allButton);

    // Add tag buttons
    Array.from(allTags)
      .sort()
      .forEach((tag) => {
        const tagButton = document.createElement('button');
        tagButton.textContent = tag;
        tagButton.className = activeTagFilter === tag ? 'active' : '';
        tagButton.addEventListener('click', () => {
          activeTagFilter = activeTagFilter === tag ? null : tag;
          updateTagFilterButtons();
          updateFlashcardDisplay();
        });
        tagFilter.appendChild(tagButton);
      });
  }

  function updateTagFilterButtons() {
    const buttons = tagFilter.querySelectorAll('button');
    buttons.forEach((button) => {
      button.classList.remove('active');
      if ((!activeTagFilter && button.textContent === 'All') || button.textContent === activeTagFilter) {
        button.classList.add('active');
      }
    });
  }

  function clearFilters() {
    activeTagFilter = null;
    currentSearchTerm = '';
    searchInput.value = '';
    updateTagFilterButtons();
    updateFlashcardDisplay();
  }

  function exportFlashcards() {
    if (flashcards.length === 0) {
      showToast('No flashcards to export', 'error');
      return;
    }

    const data = JSON.stringify(flashcards, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `flashcards-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('Flashcards exported successfully', 'success');
  }

  function importFlashcards(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const importedData = JSON.parse(e.target.result);
        const importedCards = Array.isArray(importedData)
          ? importedData
          : Array.isArray(importedData?.flashcards)
            ? importedData.flashcards
            : importedData && typeof importedData === 'object'
              ? [importedData]
              : [];

        const validCards = importedCards.map(normalizeFlashcard).filter(Boolean);
        if (validCards.length === 0) {
          throw new Error('No valid flashcards found in the selected file.');
        }

        // Merge with existing cards, avoiding duplicates
        const existingIds = new Set(flashcards.map((card) => card.id));
        const importedIds = new Set();
        const newCards = validCards.filter((card) => {
          if (existingIds.has(card.id) || importedIds.has(card.id)) return false;
          importedIds.add(card.id);
          return true;
        });

        if (newCards.length === 0) {
          showToast('No new flashcards to import', 'error');
          return;
        }

        flashcards = [...flashcards, ...newCards];
        saveToLocalStorage();
        updateFlashcardDisplay();
        updateTagFilter();
        showToast(`Imported ${newCards.length} flashcards`, 'success');
      } catch (error) {
        showToast('Error importing flashcards', 'error');
        console.error(error);
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset input
  }

  function updateStats() {
    const count = flashcards.length;
    statsDisplay.textContent = `${count} flashcard${count !== 1 ? 's' : ''}`;
  }

  function showToast(message, type = '') {
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  // Make clearFilters available globally for the empty state button
  window.clearFilters = clearFilters;

  // Update year in footer
  function updateYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('year');

    if (!yearElement) {
      console.error('Year element not found');
      return;
    }
    yearElement.setAttribute('datetime', currentYear.toString());
    yearElement.textContent = currentYear.toString();
  }
  updateYear();
});
