'use strict';

const addEventOnElements = function ($elements, eventType, callback) {
  $elements.forEach(($element) => $element.addEventListener(eventType, callback));
};

const getGreetingMsg = function (currentHour) {
  const greeting =
    currentHour < 5
      ? 'Night'
      : currentHour < 12
      ? 'Morning'
      : currentHour < 14
      ? 'Noon'
      : currentHour < 17
      ? 'Afternoon'
      : currentHour < 22
      ? 'Evening'
      : 'Night';

  return `Good ${greeting}`;
};

let $lastActiveNavItem;

const activeNotebook = function () {
  $lastActiveNavItem?.classList.remove('active');
  this.classList.add('active');
  $lastActiveNavItem = this;
};

const makeElemEditable = function ($element) {
  $element.setAttribute('contenteditable', true);
  $element.focus();
};

const generateID = function () {
  return new Date().getTime().toString();
};

const findNotebook = function (db, notebookId) {
  return db.notebooks.find((notebook) => notebook.id === notebookId);
};

const findNotebookIndex = function (db, notebookId) {
  return db.notebooks.findIndex((item) => item.id === notebookId);
};

const getRelativeTime = function (milliseconds) {
  const currentTime = new Date().getTime();

  const minute = Math.floor((currentTime - milliseconds) / 1000 / 60);
  const hour = Math.floor(minute / 60);
  const day = Math.floor(hour / 24);

  return minute < 1
    ? 'Just Now'
    : minute < 60
    ? `${minute} min ago`
    : hour < 24
    ? `${hour} hour ago`
    : `${day} day ago`;
};

const findNote = (db, noteId) => {
  let note;
  for (const notebook of db.notebooks) {
    note = notebook.notes.find((note) => note.id === noteId);
    if (note) break;
  }
  return note;
};

const findNoteIndex = function (notebook, noteId) {
  return notebook.notes.findIndex((note) => note.id === noteId);
};

export {
  activeNotebook,
  addEventOnElements,
  findNote,
  findNotebook,
  findNotebookIndex,
  findNoteIndex,
  generateID,
  getGreetingMsg,
  getRelativeTime,
  makeElemEditable
};

