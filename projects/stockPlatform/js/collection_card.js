'use strict';

import { ripple } from "./utils/ripple.js";

export const collectionCard = (collection) => {
  const root = window.location.origin;

  const { id, title, media_count } = collection;

  const $card = document.createElement('div');
  $card.classList.add('grid-card', 'list-item', 'two-line');
  $card.setAttribute('title', title);

  $card.innerHTML = `
    <div>
      <h3 class="body-large">${title}</h3>
      <p class="body-medium label">${media_count}</p>
    </div>
    <a href="${root}/projects/stockPlatform/pages/collections/collection_detail.html?collectionId=${id}&title=${title}" class="state-layer collection-link"></a>
  `;

  ripple($card);

  return $card;
};
