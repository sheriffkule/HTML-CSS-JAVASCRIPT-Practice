'use strict';

import { client } from './client.js';
import { db } from './db.js';
import { NoteModal } from './modal.js';
import { Tooltip } from './tooltip.js';
import {
  activeNotebook,
  addEventOnElements,
  getGreetingMsg,
  makeElemEditable,
} from './utils.js';

const $sidebar = document.querySelector('[data-sidebar]');
const $sidebarTogglers = document.querySelectorAll('[data-sidebar-toggler]');
const $overlay = document.querySelector('[data-sidebar-overlay]');

addEventOnElements($sidebarTogglers, 'click', function () {
  $sidebar.classList.toggle('active');
  $overlay.classList.toggle('active');
});

const $tooltipElems = document.querySelectorAll('[data-tooltip]');

$tooltipElems.forEach(($elem) => Tooltip($elem));

const $greetElem = document.querySelector('[data-greeting]');
const currentHour = new Date().getHours();

$greetElem.textContent = getGreetingMsg(currentHour);

const $currentDateElem = document.querySelector('[data-current-date]');
$currentDateElem.textContent = new Date().toDateString().replace(' ', ', ') + '.';

const $sidebarList = document.querySelector('[data-sidebar-list]');
const $addNotebookBtn = document.querySelector('[data-add-notebook]');

const showNotebookField = function () {
  const $navItem = document.createElement('div');
  $navItem.classList.add('nav-item');

  $navItem.innerHTML = `
        <span class="text text-label-large" data-notebook-field></span>

        <div className="state-layer"></div>
    `;

  $sidebarList.appendChild($navItem);
  const $navItemField = $navItem.querySelector('[data-notebook-field]');

  activeNotebook.call($navItem);

  makeElemEditable($navItemField);

  $navItemField.addEventListener('keydown', createNotebook);
};

$addNotebookBtn.addEventListener('click', showNotebookField);

const createNotebook = function (event) {
  if (event.key === 'Enter') {
    const notebookData = db.post.notebook(this.textContent || 'Untitled');
    this.parentElement.remove();

    client.notebook.create(notebookData);
  }
};

const renderExistedNotebook = function () {
  const notebookList = db.get.notebook();
  client.notebook.read(notebookList);
};

renderExistedNotebook();

const $noteCreateBtns = document.querySelectorAll('[data-note-create-btn]');

addEventOnElements($noteCreateBtns, 'click', function () {
  const modal = NoteModal();
  modal.open();

  modal.onSubmit((noteObj) => {
    const activeNotebookId = document.querySelector('[data-notebook].active').dataset
      .notebook;

    const noteData = db.post.note(activeNotebookId, noteObj);
    client.note.create(noteData);
    modal.close();
  });
});

const renderExistedNote = function() {
  const activeNotebookId = document.querySelector('[data-notebook].active')?.dataset.notebook;

  if(activeNotebookId) {
    const noteList = db.get.note(activeNotebookId);
    
    client.note.read(noteList);
  }
}

renderExistedNote();