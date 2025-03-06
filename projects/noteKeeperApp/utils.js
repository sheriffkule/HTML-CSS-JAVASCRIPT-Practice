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
      : currentHour < 20
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
  return db.notebooks.findIndex(item => item.id === notebookId);
}

export {
  activeNotebook, addEventOnElements, findNotebook, findNotebookIndex, generateID, getGreetingMsg, makeElemEditable
};

