document.addEventListener('DOMContentLoaded', function () {
  // Timer functionality
  const timerDisplay = document.getElementById('timer');
  const startBtn = document.getElementById('startBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  const stopBtn = document.getElementById('stopBtn');

  let seconds = 0;
  let minutes = 0;
  let hours = 0;
  let timerInterval = null;
  let isRunning = false;

  // Format time to always show two digits
  function formatTime(value) {
    return value < 10 ? `0${value}` : value;
  }

  // Update timer display
  function updateTimer() {
    seconds++;

    if (seconds >= 60) {
      seconds = 0;
      minutes++;

      if (minutes >= 60) {
        minutes = 0;
        hours++;
      }
    }

    timerDisplay.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
  }

  // Start the timer
  startBtn.addEventListener('click', function () {
    if (!isRunning) {
      timerInterval = setInterval(updateTimer, 1000);
      isRunning = true;
      startBtn.disabled = true;
      pauseBtn.disabled = false;
      stopBtn.disabled = false;
    }
  });

  // Pause the timer
  pauseBtn.addEventListener('click', function () {
    clearInterval(timerInterval);
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    stopBtn.disabled = false;
    startBtn.innerHTML = '<i class="fas fa-play"></i> Resume';
  });

  // Stop the timer
  stopBtn.addEventListener('click', function () {
    clearInterval(timerInterval);
    isRunning = false;
    seconds = 0;
    minutes = 0;
    hours = 0;
    timerDisplay.textContent = '00:00:00';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    stopBtn.disabled = true;
    startBtn.innerHTML = '<i class="fas fa-play"></i> Start';

    // Add to recent activity
    addActivity('Stopped timer', 'Just now');
  });

  // Project selection
  const projectItems = document.querySelectorAll('.project-item');
  projectItems.forEach((item) => {
    item.addEventListener('click', function () {
      // Remove active class from all items
      projectItems.forEach((i) => i.classList.remove('active'));

      // Add active class to clicked item
      this.classList.add('active');

      // Update current project
      const projectName = this.querySelector('.project-name').textContent;
      document.querySelector('.current-project strong').textContent = projectName;

      // Add to recent activity
      addActivity(`Switched to ${projectName}`, 'Just now');
    });
  });

  // Add activity to recent activities
  function addActivity(title, time) {
    const activityList = document.querySelector('.recent-activity');
    const newActivity = document.createElement('li');
    newActivity.className = 'activity-item';

    // Determine icon based on activity
    let icon = 'fas fa-circle';
    if (title.includes('Started')) icon = 'fas fa-play';
    else if (title.includes('Stopped')) icon = 'fas fa-stop';
    else if (title.includes('Added')) icon = 'fas fa-plus';
    else if (title.includes('Switched')) icon = 'fas fa-exchange-alt';

    newActivity.innerHTML = `
      <div class="activity-icon">
        <i class="${icon}"></i>
      </div>
      <div class="activity-content">
        <div class="activity-title">${title}</div>
        <div class="activity-time">${time}</div>
      </div>
    `;

    // Add new activity at the top of the list
    activityList.insertBefore(newActivity, activityList.firstChild);

    // Remove the last activity if there are more than 5
    if (activityList.children.length > 5) {
      activityList.removeChild(activityList.lastChild);
    }
  }

  // Add new project
  const projectInput = document.querySelector('.project-input');
  projectInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && this.value.trim() !== '') {
      const projectList = document.getElementById('projectList');
      const newProject = document.createElement('li');
      newProject.className = 'project-item';

      newProject.innerHTML = `
        <div class="project-info">
          <span class="project-name">${this.value}</span>
          <span class="project-time">Total: 0h 0m</span>
        </div>
        <div class="project-actions">
          <button class="icon-btn"><i class="fas fa-edit"></i></button>
          <button class="icon-btn"><i class="fas fa-trash"></i></button>
        </div>
      `;

      projectList.appendChild(newProject);

      // Add click event to the new project
      newProject.addEventListener('click', function () {
        projectItems.forEach((i) => i.classList.remove('active'));
        this.classList.add('active');

        const projectName = this.querySelector('.project-name').textContent;
        document.querySelector('.current-project strong').textContent = projectName;

        addActivity(`Switched to ${projectName}`, 'Just now');
      });

      // Add delete functionality
      const deleteBtn = newProject.querySelector('.fa-trash').parentNode;
      const projectNameForDelete = newProject.querySelector('.project-name').textContent;
      deleteBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        newProject.remove();
        addActivity(`Deleted project: ${projectNameForDelete}`, 'Just now');
      });

      // Clear input
      this.value = '';

      // Add to recent activity
      addActivity(`Added project: ${newProject.querySelector('.project-name').textContent}`, `Just now`);
    }
  });

  // Simulate initial activity
  setTimeout(() => {
    addActivity('Started Web Development', '2hours ago');
  }, 1000);
});
