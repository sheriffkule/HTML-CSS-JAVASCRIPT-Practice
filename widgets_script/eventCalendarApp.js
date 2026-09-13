document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const calendarView = document.getElementById('calendar-view');
  const eventList = document.getElementById('event-list');
  const currentDateElement = document.getElementById('current-date');
  const todayBtn = document.getElementById('today-btn');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const viewOptions = document.querySelectorAll('.view-option');
  const addEventBtn = document.getElementById('add-event-btn');
  const eventModal = document.getElementById('event-modal');
  const eventDetailsModal = document.getElementById('event-details-modal');
  const closeBtns = document.querySelectorAll('.close-btn');
  const eventForm = document.getElementById('event-form');
  const eventTitleInput = document.getElementById('event-title');
  const eventDateInput = document.getElementById('event-date');
  const eventStartTimeInput = document.getElementById('event-start-time');
  const eventEndTimeInput = document.getElementById('event-end-time');
  const eventDescriptionInput = document.getElementById('event-description');
  const eventColorInput = document.getElementById('event-color');
  const eventReminderInput = document.getElementById('event-reminder');
  const detailsTitle = document.getElementById('details-title');
  const detailsDate = document.getElementById('details-date');
  const detailsTime = document.getElementById('details-time');
  const detailsDescription = document.getElementById('details-description');
  const deleteEventBtn = document.getElementById('delete-event-btn');
  const editEventBtn = document.getElementById('edit-event-btn');
  const closeDetailsBtn = document.getElementById('close-details-btn');

  // App state
  let currentView = 'month';
  let currentDate = new Date();
  let event = JSON.parse(localStorage.getItem('events')) || [];
  let selectedEventId = null;

  // Initialize the app
  init();

  function init() {
    renderCalendar();
    renderEventsList();
    setupEventListeners();
  }
});
