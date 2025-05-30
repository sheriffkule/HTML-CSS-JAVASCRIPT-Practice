'use strict';

const headerTime = document.querySelector('[data-header-time]');
const menuTogglers = document.querySelectorAll('[data-menu-toggler]');
const menu = document.querySelector('[data-menu]');
const themeBtns = document.querySelectorAll('[data-theme-btn]');
const modalTogglers = document.querySelectorAll('[data-modal-toggler]');
const welcomeNote = document.querySelector('[data-welcome-note]');
const taskList = document.querySelector('[data-task-list]');
const taskInput = document.querySelector('[data-task-input]');
const modal = document.querySelector('[data-info-modal]');
let taskItem = {};
let taskRemover = {};

const date = new Date();

const taskCompleteSound = new Audio('../thumb/alarm.mp3');

const getWeekDayName = function (dayNumber) {
  switch (dayNumber) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
    default:
      return 'Invalid day';
  }
};

const getMonthName = function (monthNumber) {
  switch (monthNumber) {
    case 0:
      return 'January';
    case 1:
      return 'February';
    case 2:
      return 'March';
    case 3:
      return 'April';
    case 4:
      return 'May';
    case 5:
      return 'June';
    case 6:
      return 'July';
    case 7:
      return 'August';
    case 8:
      return 'September';
    case 9:
      return 'October';
    case 10:
      return 'November';
    case 11:
      return 'December';
    default:
      return 'Invalid month';
  }
};

const weekDayName = getWeekDayName(date.getDay());
const monthName = getMonthName(date.getMonth());
const monthOfDay = date.getDate();

headerTime.textContent = `${weekDayName}, ${monthName} ${monthOfDay}.`;

const elemToggler = function (elem) {
  elem.classList.toggle('active');
};

const addEventOnMultiElem = function (elem, event) {
  for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener('click', event);
  }
};

const taskItemNode = function (taskText) {
  const createTaskItem = document.createElement('li');
  createTaskItem.classList.add('task-item');
  createTaskItem.setAttribute('data-task-item', '');

  createTaskItem.innerHTML = `
        <button class="item-icon" data-task-remove="complete">
            <span class="check-icon"></span>
        </button>

        <p class="item-text">${taskText}</p>

        <button class="item-action-btn" data-task-remove>
            <ion-icon name="trash-outline" aria-hidden="true"></ion-icon>
        </button>
    `;

  return createTaskItem;
};

const taskInputValidation = function (taskIsValid) {
  if (taskIsValid) {
    if (taskList.childElementCount > 0) {
      taskList.insertBefore(taskItemNode(taskInput.value), taskItem[0]);
    } else {
      taskList.appendChild(taskItemNode(taskInput.value));
    }

    taskInput.value = '';

    welcomeNote.classList.add('hide');

    taskItem = document.querySelectorAll('[data-task-item]');
    taskRemover = document.querySelectorAll('[data-task-remove]');
  } else {
    alert('please write something!');
  }
};

const removeWelcomeNote = function () {
  if (taskList.childElementCount > 0) {
    welcomeNote.classList.add('hide');
  } else {
    welcomeNote.classList.remove('hide');
  }
};

const removeTask = function () {
  const parentElement = this.parentElement;

  if (this.dataset.taskRemover === 'complete') {
    parentElement.classList.add('complete');
    taskCompleteSound.play();

    setTimeout(function () {
      removeWelcomeNote();
    }, 250);
  } else {
    parentElement.remove();
    removeWelcomeNote();
  }
};

const addTask = function () {
  taskInputValidation(taskInput.value);

  addEventOnMultiElem(taskRemover, removeTask);
};

taskInput.addEventListener('keypress', function (e) {
  switch (e.key) {
    case 'Enter':
      addTask();
      break;
  }
});

const toggleMenu = function () {
  elemToggler(menu);
};

addEventOnMultiElem(menuTogglers, toggleMenu);

const toggleModal = function () {
  elemToggler(modal);
};

addEventOnMultiElem(modalTogglers, toggleModal);

window.addEventListener('load', function() {
    document.body.classList.add('loaded')
});

const themeChanger = function () {
    const hueValue = this.dataset.hue;

    document.documentElement.style.setProperty('--hue', hueValue);
    for(let i = 0; i < themeBtns.length; i++) {
        if (themeBtns[i].classList.contains('active')) {
            themeBtns[i].classList.remove('active')
        }
    }

    this.classList.add('active')
}

addEventOnMultiElem(themeBtns, themeChanger);