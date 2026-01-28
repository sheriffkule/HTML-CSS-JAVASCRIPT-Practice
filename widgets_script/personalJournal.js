document.addEventListener('DOMContentLoaded', function () {
  const journalList = document.getElementById('journalList');
  const emptyState = document.getElementById('emptyState');
  const journalEditor = document.getElementById('journalEditor');
  const statsView = document.getElementById('statsView');
  const newEntryBtn = document.getElementById('newEntryBtn');
  const emptyNewBtn = document.getElementById('emptyNewBtn');
  const statsBtn = document.getElementById('statsBtn');
  const backToJournal = document.getElementById('backToJournal');
  const saveBtn = document.getElementById('saveBtn');
  const deleteBtn = document.getElementById('deleteBtn');
  const favoriteBtn = document.getElementById('favoriteBtn');
  const journalTitle = document.getElementById('journalTitle');
  const journalContent = document.getElementById('journalContent');
  const journalDate = document.getElementById('journalDate');
  const journalTime = document.getElementById('journalTime');
  const wordCount = document.getElementById('wordCount');
  const moodButtons = document.querySelectorAll('.mood-btn');
  const tagOptions = document.querySelectorAll('.tag-option');
  const searchBox = document.querySelector('.search-box');
  const filterButtons = document.querySelectorAll('.filter-btn');

  // Sample journal entries
  let journals = [
    {
      id: 1,
      title: 'A Beautiful Day',
      content:
        'Today was such a wonderful day. I went for a walk in the park and the weather was perfect. I saw so many people enjoying the sunshine and it made me feel grateful for simple pleasure',
      date: 'June 15, 2025',
      time: '10:30 AM',
      mood: 'happy',
      tag: 'personal',
      favorite: true,
      wordCount: 35,
    },
    {
      id: 2,
      title: 'Project Milestone',
      content:
        'Finally completed the first phase of the new project. The team worked really well together and we managed to deliver ahead of schedule. Looking forward to the next phase!',
      date: 'June 14, 2025',
      time: '6:45 PM',
      mood: 'excited',
      tag: 'work',
      favorite: false,
      wordCount: 28,
    },
    {
      id: 3,
      title: 'Travel Plans',
      content:
        'Started planning my summer vacation. Thinking about visiting the mountains this time. Need to research hiking trails and accommodation options.',
      date: 'June 12, 2025',
      time: '8:15 PM',
      mood: 'excited',
      tag: 'travel',
      favorite: true,
      wordCount: 22,
    },
    {
      id: 4,
      title: 'Creative Ideas',
      content:
        'Had a sudden inspiration for a new painting series. The concept revolves around urban landscapes at different times of day. Need to sketch out some initial ideas.',
      date: 'June 10, 2025',
      time: '3:20 PM',
      mood: 'happy',
      tag: 'ideas',
      favorite: false,
      wordCount: 30,
    },
  ];

  let currentJournalId = null;
  let currentView = 'empty'; // 'empty', 'editor', 'stats'

  // Initialize the app
  function init() {
    renderJournalList();
    setupEventListeners();
  }

  // Set up event listeners
  function setupEventListeners() {
    newEntryBtn.addEventListener('click', createNewJournal);
    emptyNewBtn.addEventListener('click', createNewJournal);
    statsBtn.addEventListener('click', showStats);
    backToJournal.addEventListener('click', showJournal);
    saveBtn.addEventListener('click', saveJournal);
    deleteBtn.addEventListener('click', deleteJournal);
    favoriteBtn.addEventListener('click', toggleFavorite);

    journalContent.addEventListener('input', updateWordCount);

    moodButtons.forEach((button) => {
      button.addEventListener('click', function () {
        moodButtons.forEach((btn) => btn.classList.remove('active'));
        this.classList.add('active');
      });
    });

    tagOptions.forEach((option) => {
      option.addEventListener('click', function () {
        tagOptions.forEach((opt) => opt.classList.remove('active'));
        this.classList.add('active');
      });
    });

    searchBox.addEventListener('input', filterJournals);

    filterButtons.forEach((button) => {
      button.addEventListener('click', function () {
        filterButtons.forEach((btn) => btn.classList.remove('active'));
        this.classList.add('active');
        filterJournals();
      });
    });
  }

  // Render the journal list
  function renderJournalList() {
    journalList.innerHTML = '';
    if (journals.length === 0) {
      journalList.innerHTML =
        '<p style="text-align: center; color: var(--gray); padding: 20px;">No journal entries yet</p>';
      return;
    }

    journals.forEach((journal) => {
      const journalItem = document.createElement('div');
      journalItem.className = 'journal-item';
      if (journal.id === currentJournalId) {
        journalItem.classList.add('active');
      }

      journalItem.innerHTML = `
        <div class="journal-date">${journal.date} • ${journal.time}</div>
        <div class="journal-preview">${journal.date}</div>
        <div class="journal-tags">
          <div class="tag ${journal.tag}">${journal.tag.charAt(0).toUpperCase() + journal.tag.slice(1)}</div>
          ${
            journal.favorite
              ? '<div class="tag" style="background-color: #fff3cd; color: #856404"><i class="fas fa-star"></i></div>'
              : ''
          }
        </div>
      `;

      journalItem.addEventListener('click', () => openJournal(journal.id));
      journalList.appendChild(journalItem);
    });
  }

  // Create a new journal entry
  function createNewJournal() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = now.toLocaleDateString('en-US', options);
    const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

    currentJournalId = null;
    journalTitle.value = '';
    journalContent.value = '';
    journalDate.textContent = dateStr;
    journalTime.textContent = timeStr;
    updateWordCount();

    // Reset mood and tag to defaults
    moodButtons.forEach((btn) => btn.classList.remove('active'));
    moodButtons[0].classList.add('active');

    tagOptions.forEach((opt) => opt.classList.remove('active'));
    tagOptions[0].classList.add('active');

    showEditor();
  }

  // Open an existing journal entry
  function openJournal(id) {
    const journal = journals.find((j) => j.id === id);
    if (!journal) return;

    currentJournalId = id;
    journalTitle.value = journal.title;
    journalContent.value = journal.content;
    journalDate.textContent = journal.date;
    journalTime.textContent = journal.time;
    updateWordCount();

    // Set mod
    moodButtons.forEach((btn) => {
      btn.classList.remove('active');
      if (btn.dataset.mood === journal.mood) btn.classList.add('active');
    });

    // Set tag
    tagOptions.forEach((opt) => {
      opt.classList.remove('active');
      if (opt.dataset.tag === journal.tag) opt.classList.add('active');
    });

    // Update favorite button
    const favoriteIcon = favoriteBtn.querySelector('i');
    if (journal.favorite) {
      favoriteIcon.classList.remove('far');
      favoriteIcon.classList.add('fas');
    } else {
      favoriteIcon.classList.add('far');
      favoriteIcon.classList.remove('fas');
    }

    showEditor();
    renderJournalList();
  }

  // Save journal entry
  function saveJournal() {
    const title = journalTitle.value.trim();
    const content = journalContent.value.trim();

    if (!title) {
      alert('Please enter a title for your journal entry!');
      return;
    }

    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = now.toLocaleDateString('en-US', options);
    const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

    const activeMood = document.querySelector('.mood-btn.active').dataset.mood;
    const activeTag = document.querySelector('.tag-option.active').dataset.tag;
    const isFavorite = favoriteBtn.querySelector('i').classList.contains('fas');
  }

  init();
});
