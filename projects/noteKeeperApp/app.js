'use strict';

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

const createNotebook = function(event){
    if (event.key === 'Enter') {
        console.log(event.key);
    }
}