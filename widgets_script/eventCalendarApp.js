document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const calendarView = document.getElementById('calendar-view');
  const eventsList = document.getElementById('events-list');
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
  let events = JSON.parse(localStorage.getItem('events')) || [];
  let selectedEventId = null;

  // Initialize the app
  init();

  function init() {
    viewOptions.forEach((option) => {
      option.classList.toggle('active', option.dataset.view === currentView);
    });
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
    const startingDay = (firstDay.getDay() + 6) % 7;

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
      const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const isToday =
        dayDate.getDate() === today.getDate() &&
        dayDate.getMonth() === today.getMonth() &&
        dayDate.getFullYear() === today.getFullYear();
      const dayCell = createDayCell(dayDate, false, isToday);
      daysGrid.appendChild(dayCell);
    }

    // Add empty cells for days after the last day of the month
    const totalCells = Math.ceil((startingDay + daysInMonth) / 7) * 7;
    const remainingCells = totalCells - (startingDay + daysInMonth);
    for (let i = 1; i <= remainingCells; i++) {
      const nextMonthDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i);
      const dayCell = createDayCell(nextMonthDay, true);
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

    for (const event of dayEvents) {
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

  function renderWeekView() {
    const weekContainer = document.createElement('div');
    weekContainer.className = 'week-view';

    // Week header
    const weekHeader = document.createElement('div');
    weekHeader.className = 'week-header';

    // Empty cell for time labels
    const emptyHeader = document.createElement('div');
    weekHeader.appendChild(emptyHeader);

    // Get start of week (Monday)
    const startOfWeek = new Date(currentDate);
    const day = currentDate.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    startOfWeek.setDate(currentDate.getDate() + diff);

    // Add day headers
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(startOfWeek);
      dayDate.setDate(startOfWeek.getDate() + i);

      const dayHeader = document.createElement('div');
      dayHeader.className = 'week-day-header';

      const isToday =
        dayDate.getDate() === today.getDate() &&
        dayDate.getMonth() === today.getMonth() &&
        dayDate.getFullYear() === today.getFullYear();

      if (isToday) dayHeader.classList.add('current-day');

      dayHeader.innerHTML = `
        <div>${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</div>
        <div>${dayDate.getDate()}</div>
      `;
      weekHeader.appendChild(dayHeader);
    }

    weekContainer.appendChild(weekHeader);

    // Week grid
    const weekGrid = document.createElement('div');
    weekGrid.className = 'week-grid';

    // Time slots
    for (let hour = 0; hour < 24; hour++) {
      // Hour label
      const hourLabel = document.createElement('div');
      hourLabel.className = 'hour-label';
      hourLabel.textContent = `${hour === 0 ? 12 : hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
      weekGrid.appendChild(hourLabel);

      // Day cells
      for (let day = 0; day < 7; day++) {
        const dayDate = new Date(startOfWeek);
        dayDate.setDate(startOfWeek.getDate() + day);
        dayDate.setHours(hour);

        const dayCell = document.createElement('div');
        dayCell.className = 'week-cell';
        weekGrid.appendChild(dayCell);

        // Add event to this time slot
        const eventsForHour = getEventsForDateAndHour(dayDate, hour);
        eventsForHour.forEach((event) => {
          const eventElement = document.createElement('div');
          eventElement.className = 'week-event';
          eventElement.textContent = event.title;
          eventElement.style.backgroundColor = event.color;

          // Calculate position and height based on event duration
          const startMinutes =
            new Date(event.startTime).getHours() * 60 + new Date(event.startTime).getMinutes();
          const endMinutes = new Date(event.endTime).getHours() * 60 + new Date(event.endTime).getMinutes();
          const duration = endMinutes - startMinutes;
          const height = (duration / 60) * 60; // 60px per hour

          const position = ((startMinutes % 60) / 60) * 60;

          eventElement.style.top = `${position}px`;
          eventElement.style.height = `${height}px`;

          dayCell.appendChild(eventElement);

          eventElement.addEventListener('click', (e) => {
            e.stopPropagation();
            showEventDetails(event.id);
          });
        });

        dayCell.addEventListener('click', () => {
          // Create a new event at this time
          currentDate = new Date(dayDate);
          openEventModalWithTime(hour);
        });
      }
    }

    weekContainer.appendChild(weekGrid);
    calendarView.appendChild(weekContainer);
  }

  function renderDayView() {
    const dayContainer = document.createElement('div');
    dayContainer.className = 'day-view';

    // Day header
    const dayHeader = document.createElement('div');
    dayHeader.className = 'day-header';
    dayHeader.innerHTML = `
      <h2>
        ${currentDate.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </h2>
    `;
    dayContainer.appendChild(dayHeader);

    // Day grid
    const dayGrid = document.createElement('div');
    dayGrid.className = 'day-grid';

    // Time slots
    for (let hour = 0; hour < 24; hour++) {
      // Hour label
      const hourLabel = document.createElement('div');
      hourLabel.className = 'day-hour-label hour-label';
      hourLabel.textContent = `${hour === 0 ? 12 : hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
      dayGrid.appendChild(hourLabel);

      // Time block
      const timeBlock = document.createElement('div');
      timeBlock.className = 'day-time-block day-hour';
      dayGrid.appendChild(timeBlock);

      // Add events to this time slot
      const eventsForHour = getEventsForDateAndHour(currentDate, hour);
      eventsForHour.forEach((event) => {
        const eventElement = document.createElement('div');
        eventElement.className = 'day-event';
        eventElement.textContent = `${formatTime(new Date(event.startTime))} - ${event.title}`;
        eventElement.style.backgroundColor = event.color;

        // Calculate position and height based on event duration
        const startMinutes =
          new Date(event.startTime).getHours() * 60 + new Date(event.startTime).getMinutes();
        const endMinutes = new Date(event.endTime).getHours() * 60 + new Date(event.endTime).getMinutes();
        const duration = endMinutes - startMinutes;
        const height = (duration / 60) * 60; // 60px per hour

        const position = ((startMinutes % 60) / 60) * 60;

        eventElement.style.top = `${position}px`;
        eventElement.style.height = `${height}px`;

        timeBlock.appendChild(eventElement);

        eventElement.addEventListener('click', (e) => {
          e.stopPropagation();
          showEventDetails(event.id);
        });
      });

      timeBlock.addEventListener('click', () => {
        // Create a new event at this time
        openEventModalWithTime(hour);
      });
    }

    dayContainer.appendChild(dayGrid);
    calendarView.appendChild(dayContainer);
  }

  function renderEventsList() {
    eventsList.innerHTML = '';

    // Get upcoming events (today and future)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingEvents = events
      .filter((event) => new Date(event.startTime) >= today)
      .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

    if (upcomingEvents.length === 0) {
      const noEvents = document.createElement('div');
      noEvents.className = 'no-events';
      noEvents.textContent = 'No upcoming events. Add one!';
      eventsList.appendChild(noEvents);
      return;
    }

    upcomingEvents.forEach((event) => {
      const eventElement = document.createElement('div');
      eventElement.className = 'event-item';
      eventElement.style.borderLeftColor = event.color;

      const startDate = new Date(event.startTime);
      const endDate = new Date(event.endTime);

      eventElement.innerHTML = `
        <div class="event-title">
          <span>${event.title}</span>
          <span style="color: ${event.color}">●</span>
        </div>
        <div class="event-time">${formatDateTime(startDate, endDate)}</div>
        ${event.description ? `<div class="event-description">${event.description}</div>` : ''}
      `;

      eventsList.appendChild(eventElement);

      eventElement.addEventListener('click', () => {
        showEventDetails(event.id);
      });
    });
  }

  function getEventsForDate(date) {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter((event) => {
      const eventDate = new Date(event.startTime).toISOString().split('T')[0];
      return eventDate === dateStr;
    });
  }

  function getEventsForDateAndHour(date, hour) {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter((event) => {
      const eventDate = new Date(event.startTime).toISOString().split('T')[0];
      const eventHour = new Date(event.startTime).getHours();
      return eventDate === dateStr && eventHour === hour;
    });
  }

  function updateCurrentDateDisplay() {
    switch (currentView) {
      case 'day':
        currentDateElement.textContent = currentDate.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        });
        break;
      case 'week':
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        currentDateElement.textContent = `
          ${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} -
          ${endOfWeek.toLocaleDateString('en-US', {
            month: endOfWeek.getMonth() !== startOfWeek.getMonth() ? 'short' : undefined,
            day: 'numeric',
            year: endOfWeek.getFullYear() !== startOfWeek.getFullYear() ? 'numeric' : undefined,
          })}
        `;
        break;
      case 'month':
        currentDateElement.textContent = currentDate.toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        });
        break;
    }
  }

  function switchView(view) {
    currentView = view;

    // Update active view button
    viewOptions.forEach((option) => {
      option.classList.toggle('active', option.dataset.view === view);
    });

    renderCalendar();
  }

  function navigatePrevious() {
    switch (currentView) {
      case 'day':
        currentDate.setDate(currentDate.getDate() - 1);
        break;
      case 'week':
        currentDate.setDate(currentDate.getDate() - 7);
        break;
      case 'month':
        currentDate.setMonth(currentDate.getMonth() - 1);
        break;
    }
    renderCalendar();
  }

  function navigateNext() {
    switch (currentView) {
      case 'day':
        currentDate.setDate(currentDate.getDate() + 1);
        break;
      case 'week':
        currentDate.setDate(currentDate.getDate() + 7);
        break;
      case 'month':
        currentDate.setMonth(currentDate.getMonth() + 1);
        break;
    }
    renderCalendar();
  }

  function goToToday() {
    currentDate = new Date();
    renderCalendar();
  }

  function openEventModal() {
    // Reset form
    eventForm.reset();
    eventDateInput.valueAsDate = currentDate;
    eventStartTimeInput.value = '09:00';
    eventEndTimeInput.value = '10:00';
    eventColorInput.value = '#4e73df';

    // Show modal
    eventModal.setAttribute('open', 'open');
    eventModal.style.display = 'flex';
  }

  function openEventModalWithTime(hour) {
    openEventModal();
    eventStartTimeInput.value = `${hour.toString().padStart(2, '0')}:00`;
    eventEndTimeInput.value = `${(hour + 1).toString().padStart(2, '0')}:00`;
  }

  function closeModals() {
    eventModal.removeAttribute('open');
    eventDetailsModal.removeAttribute('open');
    eventModal.style.display = 'none';
    eventDetailsModal.style.display = 'none';
  }

  function saveEvent(e) {
    e.preventDefault();

    // Create event object
    const eventId = Date.now().toString();
    const startDateTime = new Date(eventDateInput.value);
    const startTimeParts = eventStartTimeInput.value.split(':');
    startDateTime.setHours(parseInt(startTimeParts[0]), parseInt(startTimeParts[1]));

    const endDateTime = new Date(eventDateInput.value);
    const endTImeParts = eventEndTimeInput.value.split(':');
    endDateTime.setHours(parseInt(endTImeParts[0]), parseInt(endTImeParts[1]));

    const newEvent = {
      id: eventId,
      title: eventTitleInput.value,
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString(),
      description: eventDescriptionInput.value,
      color: eventColorInput.value,
      reminder: eventReminderInput.checked,
    };

    // Add to events array
    events.push(newEvent);
    saveEventsToStorage();

    // Update UI
    renderCalendar();
    renderEventsList();
    closeModals();

    // Set reminder if needed
    if (newEvent.reminder) setReminder(newEvent);
  }

  function showEventDetails(eventId) {
    const event = events.find((e) => e.id === eventId);
    if (!event) return;

    selectedEventId = eventId;

    // Populate details
    detailsTitle.textContent = event.title;
    detailsDate.textContent = new Date(event.startTime).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    detailsTime.textContent = `${formatTime(new Date(event.startTime))} - ${formatTime(new Date(event.endTime))}`;
    detailsDescription.textContent = event.description || 'No description';

    // Show modal
    eventDetailsModal.setAttribute('open', 'open');
    eventDetailsModal.style.display = 'flex';
  }

  function editEvent() {
    if (!selectedEventId) return;

    const event = events.find((e) => e.id === selectedEventId);
    if (!event) return;

    // Populate form with event data
    eventTitleInput.value = event.title;
    eventDateInput.valueAsDate = new Date(event.startTime);

    const startDate = new Date(event.startTime);
    eventStartTimeInput.value = `${startDate.getHours().toString().padStart(2, '0')}:${startDate.getMinutes().toString().padStart(2, '0')}`;

    const endDate = new Date(event.endTime);
    eventEndTimeInput.value = `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;

    eventDescriptionInput.value = event.description || '';
    eventColorInput.value = event.color;
    eventReminderInput.checked = event.reminder || false;

    // Change form submit to update instead of create
    eventForm.onsubmit = function (e) {
      e.preventDefault();

      // Update event
      const startDateTime = new Date(eventDateInput.value);
      const startTimeParts = eventStartTimeInput.value.split(':');
      startDateTime.setHours(parseInt(startTimeParts[0]), parseInt(startTimeParts[1]));

      const endDateTime = new Date(eventDateInput.value);
      const endTimeParts = eventEndTimeInput.value.split(':');
      endDateTime.setHours(parseInt(endTimeParts[0]), parseInt(endTimeParts[1]));

      event.title = eventTitleInput.value;
      event.startTime = startDateTime.toISOString();
      event.endTime = endDateTime.toISOString();
      event.description = eventDescriptionInput.value;
      event.color = eventColorInput.value;
      event.reminder = eventReminderInput.checked;

      saveEventsToStorage();

      // Update UI
      renderCalendar();
      renderEventsList();
      closeModals();

      // Reset form submit handler
      eventForm.onsubmit = saveEvent;
    };

    // Show edit modal
    closeModals();
    eventModal.setAttribute('open', 'open');
    eventModal.style.display = 'flex';
  }

  function deleteEvent() {
    if (!selectedEventId) return;

    if (confirm('Are you sure you want to delete this event?')) {
      events = events.filter((event) => event.id !== selectedEventId);
      selectedEventId = null;
      saveEventsToStorage();

      // Update UI
      renderCalendar();
      renderEventsList();
      closeModals();
    }
  }

  function saveEventsToStorage() {
    localStorage.setItem('events', JSON.stringify(events));
  }

  function setReminder(event) {
    const reminderTime = new Date(event.startTime);
    reminderTime.setMinutes(reminderTime.getMinutes() - 15); // 15 minutes before

    const now = new Date();
    const timeUntilReminder = reminderTime - now;

    if (timeUntilReminder > 0) {
      setTimeout(() => {
        showReminderNotification(event);
      }, timeUntilReminder);
    }
  }

  function showReminderNotification(event) {
    if (Notification.permission === 'granted') {
      new Notification(`Reminder: ${event.title}`, {
        body: `Your event starts at ${formaTime(new Date(event.startTime))}`,
        icon: 'https://cdn-icons-png.flaticon.com/512/3652/3652191.png',
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') showReminderNotification(event);
      });
    }
  }

  // Helper function
  function formatTime(date) {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }

  const formaTime = formatTime;

  function formatDateTime(startDate, endDate) {
    const isSameDay = startDate.toDateString() === endDate.toDateString();

    if (isSameDay) {
      return `${startDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })} ● ${formatTime(startDate)} - ${formatTime(endDate)}`;
    } else {
      return `${startDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })} ${formatTime(startDate)} - ${endDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })} ${formatTime(endDate)}`;
    }
  }

  // Request notification permission on page load
  if ('Notification' in window) {
    Notification.requestPermission();
  }
});
