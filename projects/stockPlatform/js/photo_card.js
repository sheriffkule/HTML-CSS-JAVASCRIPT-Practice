'use strict';

import { favorite } from './favorite.js';
import { ripple } from './utils/ripple.js';

export const photoCard = (photo) => {
  const root = window.location.origin;

  const {
    alt,
    avg_color: backdropColor,
    width,
    height,
    id,
    src: { large },
  } = photo;

  const $card = document.createElement('div');
  $card.classList.add('card', 'grid-item');
  $card.style.backgroundColor = backdropColor;

  const favoriteObj = JSON.parse(window.localStorage.getItem('favorite'));

  $card.innerHTML = `
    <figure class="card-banner" style="--width: ${width}; --height: ${height}">
      <img src="${large}" width="${width}" height="${height}" loading="lazy" alt="${alt}" class="img-cover" />
    </figure>
    <div class="card-content">
      <button class="icon-btn small ${favoriteObj.photos[id] ? 'active' : ''}" aria-label="Add to favorite" data-ripple data-favorite>
        <span class="material-symbols-outlined" aria-hidden="true">favorite</span>
        <div class="state-layer"></div>
      </button>
    </div>
    <a href="${root}/projects/stockPlatform/pages/photos/photo_detail.html?id=${id}" class="state-layer"></a>
  `;

  const $cardBanner = $card.querySelector('img');
  $cardBanner.style.opacity = 0;
  $cardBanner.style.scale = 0;
  $cardBanner.style.transformOrigin = 'bottom';

  $cardBanner.addEventListener('load', function () {
    this.animate(
      {
        opacity: 1,
        scale: 1,
      },
      { duration: 500, fill: 'forwards' }
    );
  });

  const $rippleElems = [$card, $card.querySelector('[data-ripple]')];

  $rippleElems.forEach(($rippleElem) => ripple($rippleElem));

  const $favoriteBtn = $card.querySelector('[data-favorite]');
  favorite($favoriteBtn, 'photos', id);

  return $card;
};
