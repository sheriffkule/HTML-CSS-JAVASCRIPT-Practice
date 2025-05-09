'use strict';

import { segment } from './segment_btn.js';
import { addEventOnElements } from './utils/event.js';
import { ripple } from './utils/ripple.js';
import { updateUrl } from './utils/updateUrl.js';

const $searchToggler = document.querySelectorAll('[data-search-toggler]');
const $searchView = document.querySelector('[data-search-view]');

addEventOnElements($searchToggler, 'click', () => $searchView.classList.toggle('show'));

const $searchField = document.querySelector('[data-search-field]');
const $searchClearBtn = document.querySelector('[data-search-clear-btn]');

$searchClearBtn.addEventListener('click', () => ($searchField.value = ''));

const $searchSegment = document.querySelector("[data-segment='search']");
const $activeSegmentBtn = $searchSegment.querySelector('[data-segment-btn].selected');
window.searchType = $activeSegmentBtn.dataset.segmentValue;

segment($searchSegment, (segmentValue) => (window.searchType = segmentValue));

const $searchBtn = document.querySelector('[data-search-btn]');

$searchBtn.addEventListener('click', function () {
  const searchValue = $searchField.value.trim();
  if (searchValue) {
    updateSearchHistory(searchValue);
    window.filterObj.query = searchValue;
    updateUrl(window.filterObj, window.searchType);
  }
});

$searchField.addEventListener('keydown', (e) => {
  if ((e.key === 'Enter') & $searchField.value.trim()) $searchBtn.click();
});

let searchHistory = { items: [] };

if (window.localStorage.getItem('search_history')) {
  searchHistory = JSON.parse(window.localStorage.getItem('search_history'));
} else {
  window.localStorage.setItem('search_history', JSON.stringify(searchHistory));
}

const updateSearchHistory = (searchValue) => {
  if (searchHistory.items.includes(searchValue)) {
    searchHistory.items.splice(searchHistory.items.indexOf(searchValue), 1);
  }

  searchHistory.items.unshift(searchValue);

  window.localStorage.setItem('search_history', JSON.stringify(searchHistory));
};

const $searchList = document.querySelector('[data-search-list]');
const historyLen = searchHistory.items.length;

for (let i = 0; (i < historyLen) & (i <= 5); i++) {
  const $listItem = document.createElement('button');
  $listItem.classList.add('list-item');

  $listItem.innerHTML = `
    <span class="material-symbols-outlined leading-icon" aria-hidden="true">history</span>
    <span class="body-large text">${searchHistory.items[i]}</span>
    <div class="state-layer"></div>
  `;

  ripple($listItem);

  $listItem.addEventListener('click', function () {
    $searchField.value = this.children[1].textContent;
    $searchBtn.click();
  });

  $searchList.appendChild($listItem);
}

const search = urlDecode(window.location.search.slice(1));