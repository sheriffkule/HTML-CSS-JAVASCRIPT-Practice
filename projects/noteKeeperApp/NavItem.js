'use strict';

import { client } from './client.js';
import { db } from './db.js';
import { DeleteConfirmModal } from './modal.js';
import { Tooltip } from './tooltip.js';
import { activeNotebook, makeElemEditable } from './utils.js';

const $notePanelTitle = document.querySelector('[data-note-panel-title]');

export const NavItem = function (id, name) {
  const $navItem = document.createElement('div');
  $navItem.classList.add('nav-item');
  $navItem.setAttribute('data-notebook', id);

  $navItem.innerHTML = `
        <span class="text text-label-large" data-notebook-field>${name}</span>
        <button class="icon-btn small" aria-label="Edit notebook" data-tooltip="Edit Notebook" data-edit-btn>
            <span class="material-symbols-rounded" aria-hidden="true">edit</span>
            <div class="state-layer"></div>
        </button>
    
        <button class="icon-btn small" aria-label="Delete notebook" data-tooltip="Delete Notebook" data-delete-btn>
            <span class="material-symbols-rounded" aria-hidden="true">delete</span>
            <div class="state-layer"></div>
        </button>
    
        <div class="state-layer"></div>
    `;

  const $tooltipElems = $navItem.querySelectorAll('[data-tooltip]');
  $tooltipElems.forEach(($elem) => Tooltip($elem));

  $navItem.addEventListener('click', function () {
    $notePanelTitle.textContent = name;
    activeNotebook.call(this);
  });

  const $navItemEditBtn = $navItem.querySelector('[data-edit-btn]');
  const $navItemField = $navItem.querySelector('[data-notebook-field]');

  $navItemEditBtn.addEventListener('click', makeElemEditable.bind(null, $navItemField));

  $navItemField.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        this.removeAttribute('contenteditable');

        const updateNotebookData = db.update.notebook(id, this.textContent);

        client.notebook.update(id, updateNotebookData);
    }
  });

  const $navItemDeleteBtn = $navItem.querySelector('[data-delete-btn]');

  $navItemDeleteBtn.addEventListener('click', function() {
    const modal = DeleteConfirmModal(name);

    modal.open();

    modal.onSubmit(function (isConfirm) {
        if (isConfirm) {
            db.delete.notebook(id);
            client.notebook.delete(id);
        }

        modal.close();
    })
  })

  return $navItem;
};
