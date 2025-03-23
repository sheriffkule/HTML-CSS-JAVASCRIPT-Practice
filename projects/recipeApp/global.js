'use strict';

import { fetchData } from './api.js';

window.addEventOnElements = ($elements, eventType, callback) => {
  for (const $element of $elements) {
    $element.addEventListener(eventType, callback);
  }
};

export const cardQueries = [
  ['field', 'uri'],
  ['field', 'label'],
  ['field', 'image'],
  ['field', 'totalTime'],
];

export const $skeletonCard = `
    <div class="card skeleton-card">
        <div class="skeleton card-banner"></div>
        <div class="card-body">
            <div class="skeleton card-title"></div>
            <div class="skeleton card-text"></div>
        </div>
    </div>
`;

const ROOT = 'https://api.edamam.com/api/recipes/v2';

window.saveRecipe = function (element, recipeId) {
  const isSaved = window.localStorage.getItem(`cookio-recipe${recipeId}`);
  ACCESS_POINT = `${ROOT}/${recipeId}`;

  if (!isSaved) {
    fetchData(cardQueries, function (data) {
      window.localStorage.setItem(`cookio-recipe${recipeId}`, JSON.stringify(data));
      element.classList.toggle('saved');
      element.classList.toggle('removed');
      showNotification('Added to Recipe book');
    });
    ACCESS_POINT = ROOT;
  } else {
    window.localStorage.removeItem(`cookio-recipe${recipeId}`);
    element.classList.toggle('saved');
    element.classList.toggle('removed');
    showNotification('Removed from Recipe book');
  }
};

const $snackbarContainer = document.createElement('div');
$snackbarContainer.classList.add('snackbar-container');
document.body.appendChild($snackbarContainer);

function showNotification(message) {
  const $snackbar = document.createElement('div');
  $snackbar.classList.add('snackbar');
  $snackbar.innerHTML = `<p class="body-medium">${message}</p>`;
  $snackbarContainer.appendChild($snackbar);
  $snackbar.addEventListener('animationend', (e) => $snackbarContainer.removeChild($snackbar));
}
