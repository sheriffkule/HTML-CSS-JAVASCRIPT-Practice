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
});
