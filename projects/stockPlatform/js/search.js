'use strict';

import { segment } from './segment_btn.js';
import { addEventOnElements } from './utils/event.js';

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
  }
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
