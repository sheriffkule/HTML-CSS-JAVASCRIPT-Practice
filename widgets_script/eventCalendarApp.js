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

  function setupEventListeners() {
    // Navigation buttons
    todayBtn.addEventListener('click', goToToday);
    prevBtn.addEventListener('click', navigatePrevious);
    nextBtn.addEventListener('click', navigateNext);

    // View options
    viewOptions.forEach((option) => {
      option.addEventListener('click', () => switchView(option.dataset.view));
    });

    // Event modal
    addEventBtn.addEventListener('click', openEventModal);
    closeBtns.forEach((btn) => btn.addEventListener('click', closeModals));
    eventForm.addEventListener('submit', saveEvent);

    // Event details modal
    deleteEventBtn.addEventListener('click', deleteEvent);
    editEventBtn.addEventListener('click', editEvent);
    closeDetailsBtn.addEventListener('click', closeModals);

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
      if (e.target === eventModal) closeModals();

      if (e.target === eventDetailsModal) closeModals();
    });
  }

  function renderCalendar() {
    calendarView.innerHTML = '';

    switch (currentView) {
      case 'day':
        renderDayView();
        break;
      case 'week':
        renderWeekView();
        break;
      case 'month':
        renderMonthView();
        break;
    }

    updateCurrentDateDisplay();
  }

  function renderMonthView() {
    const monthContainer = document.createElement('div');
    monthContainer.className = 'month-view';

    // Get first day of month and total days
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDate(1);

    // Month header
    const monthHeader = document.createElement('div');
    monthHeader.className = 'month-header';

    // Day names
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    dayNames.forEach((day) => {
      const dayElement = document.createElement('div');
      dayElement.className = 'day-header';
      dayElement.textContent = day;
      monthHeader.appendChild(dayElement);
    });

    monthContainer.appendChild(monthHeader);

    // Month days grid
    const daysGrid = document.createElement('div');
    daysGrid.className = 'month-days';

    // Add empty cells for days before the first day of month
    for (let i = 0; i < startingDay; i++) {
      const prevMonthDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0 - (startingDay - i - 1),
      );
      const dayCell = createDayCell(prevMonthDay, true);
      daysGrid.appendChild(dayCell);
    }

    // Add cells for each day of the month
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const isToday =
        dayDate.getDate() === today.getDate() &&
        dayDate.getMonth === today.getMonth() &&
        dayDate.getFullYear() === today.getFullYear();
      const dayCell = createDayCell(dayDate, false, isToday);
      daysGrid.appendChild(dayCell);
    }

    // Add empty cells for days after the last day of the month
    const totalCells = Math.ceil((startingDay + daysInMonth) / 7) * 7;
    const remainingCells = totalCells - (startingDay + daysInMonth);
    for (let i = 1; i <= remainingCells; i++) {
      const nextMonthDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i);
      daysGrid.appendChild(dayCell);
    }

    monthContainer.appendChild(daysGrid);
    calendarView.appendChild(monthContainer);
  }

  function createDayCell(date, isOtherMonth, isToday = false) {
    const dayCell = document.createElement('div');
    dayCell.className = `day-cell ${isOtherMonth ? 'other-month' : ''} ${isToday ? 'current-day' : ''}`;

    const dayNumber = document.createElement('div');
    dayNumber.className = 'day-number';
    dayNumber.textContent = date.getDate();
    dayCell.appendChild(dayNumber);

    const dayEventContainer = document.createElement('div');
    dayEventContainer.className = 'day-events';

    // Get events for this day
    const dayEvents = getEventsForDate(date);

    // Display up to 3 events (0r 2 if one is multi-line)
    const maxEventsToShow = 3;
    let eventsShown = 0;
    let spaceUsed = 0;

    for (const events of dayEvents) {
      if (eventsShown >= maxEventsToShow || spaceUsed >= maxEventsToShow) break;

      const eventElement = document.createElement('div');
      eventElement.className = 'day-event';
      eventElement.textContent = event.title;
      eventElement.style.backgroundColor = event.color;

      // Estimate if this event will take more space (long title)
      const takeMoreSpace = event.title.length > 15;
      if (takeMoreSpace) spaceUsed += 1.5;
      else spaceUsed += 1;

      if (spaceUsed <= maxEventsToShow) {
        dayEventContainer.appendChild(eventElement);
        eventsShown++;

        eventElement.addEventListener('click', (e) => {
          e.stopPropagation();
          showEventDetails(event.id);
        });
      }
    }

    // Show "+X more" if there are more events
    if (dayEvents.length > eventsShown) {
      const moreEvents = document.createElement('div');
      moreEvents.className = 'day-event';
      moreEvents.textContent = `+${dayEvents.length - eventsShown} more`;
      moreEvents.style.backgroundColor = '#5a5c69';
      dayEventContainer.appendChild(moreEvents);
    }

    dayCell.appendChild(dayEventContainer);

    dayCell.addEventListener('click', () => {
      if (isOtherMonth) {
        // Navigate to that month
        currentDate = new Date(date);
        if (currentView === 'month') {
          renderCalendar();
        } else {
          switchView('month');
        }
      } else {
        // Switch to day view for this date
        currentDate = new Date(date);
        switchView('day');
      }
    });

    return dayCell;
  }
});
