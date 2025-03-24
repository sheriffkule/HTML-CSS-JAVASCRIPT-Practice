'use strict';
import { fetchData } from './api.js';
import { $skeletonCard, cardQueries } from './global.js';

const $accordions = document.querySelectorAll('[data-accordion]');
const initAccordion = function ($element) {
  const $button = $element.querySelector('[data-accordion-btn]');
  let isExpanded = false;

  $button.addEventListener('click', function () {
    isExpanded = isExpanded ? false : true;
    this.setAttribute('aria-expanded', isExpanded);
  });
};

for (const $accordion of $accordions) initAccordion($accordion);

const $filterBar = document.querySelector('[data-filter-bar]');
const $filterTogglers = document.querySelectorAll('[data-filter-toggler]');
const $overlay = document.querySelector('[data-overlay]');

addEventOnElements($filterTogglers, 'click', function () {
  $filterBar.classList.toggle('active');
  $overlay.classList.toggle('active');
  const bodyOverflow = document.body.style.overflow;
  document.body.style.overflow = bodyOverflow === 'hidden' ? 'visible' : 'hidden';
});

const $filterSubmit = document.querySelector('[data-filter-submit]');
const $filterClear = document.querySelector('[data-filter-clear]');
const $filterSearch = $filterBar.querySelector("input[type='search']");

$filterSubmit.addEventListener('click', function () {
  const $filterCheckboxes = $filterBar.querySelectorAll('input:checked');
  const queries = [];

  if ($filterSearch.value) queries.push(['q', $filterSearch.value]);

  if ($filterCheckboxes.length) {
    for (const $checkbox of $filterCheckboxes) {
      const key = $checkbox.parentElement.parentElement.dataset.filter;
      queries.push([key, $checkbox.value]);
    }
  }

  window.location = queries.length ? `?${queries.join('&').replace(/,/g, '=')}` : '/recipes.html';
});

$filterSearch.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') $filterSubmit.click();
});

$filterClear.addEventListener('click', function () {
  const $filterCheckboxes = $filterBar.querySelectorAll('input:checked');

  $filterCheckboxes?.forEach((elem) => (elem.checked = false));
  $filterSearch.value &&= '';
});

const queryStr = window.location.search.slice(1);
const queries = queryStr && queryStr.split('&').map((i) => i.split('='));

const $filterCount = document.querySelector('[data-filter-count]');

if (queries.length) {
  $filterCount.style.display = 'block';
  $filterCount.innerHTML = queries.length;
} else {
  $filterCount.style.display = 'none';
}

queryStr &&
  queryStr.split('&').map((i) => {
    if (i.split('=')[0] === 'q') {
      $filterBar.querySelector("input[type='search']").value = i.split('=')[1].replace(/%20/g, ' ');
    } else {
      $filterBar.querySelector(`[value="${i.split('=')[1].replace(/%20/g, ' ')}"]`).checked = true;
    }
  });

const $filterBtn = document.querySelector('[data-filter-btn]');

window.addEventListener('scroll', (e) => {
  $filterBtn.classList[window.scrollY >= 120 ? 'add' : 'remove']('active');
});

const $gridList = document.querySelector('[data-grid-list]');
const $loadMore = document.querySelector('[data-load-more]');
const defaultQueries = [
  ['mealType', 'breakfast'],
  ['mealType', 'dinner'],
  ['mealType', 'lunch'],
  ['mealType', 'snack'],
  ['mealType', 'teatime'],
  ...cardQueries,
];

$gridList.innerHTML = $skeletonCard.repeat(20);

const renderRecipe = (data) => {
  data.hits.map((item, index) => {
    const {
      recipe: { image, label: title, totalTime: cookingTime, uri },
    } = item;
  });
};

let requestedBefore = true;

fetchData(queries);