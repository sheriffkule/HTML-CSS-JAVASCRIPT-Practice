'use strict';

import { favorite } from './favorite.js';
import { hoverOnPlay } from './utils/hoverOnPlay.js';
import { ripple } from './utils/ripple.js';

export const videoCard = (video) => {
  const root = window.location.origin;

  const { height, width, id, image, video_files } = video;

  const sdVideo = video_files.find((item) => item.quality === 'sd' && item.width < 1000);

  // const { file_type, link } = sdVideo;
  const { file_type, link } = sdVideo?.file_type || 'unknown';

  const $card = document.createElement('div');
  $card.classList.add('card', 'grid-item', 'video');

  const favoriteObj = JSON.parse(window.localStorage.getItem('favorite'));

  $card.innerHTML = `
    <div class="card-banner" style="--width: ${width}; --height: ${height}">
      <video poster="${image}" muted loop preload="none" class="img-cover" data-video>
        <source src="${link}" type="${file_type}" />
      </video>
    </div>
    <div class="card-content">
      <button
        class="icon-btn small ${favoriteObj.videos[id] ? 'active' : ''}"
        aria-label="Add to favorite" data-ripple data-favorite>
        <span class="material-symbols-outlined" aria-hidden="true">favorite</span>
        <div class="state-layer"></div>
      </button>
    </div>
    <span class="card-badge" data-card-badge>
      <span class="material-symbols-outlined" aria-hidden="true">play_arrow</span>
    </span>
    <a href="${root}/projects/stockPlatform/pages/videos/video_detail.html?id=${id}" class="state-layer"></a>
  `;

  const $rippleElems = [$card, $card.querySelector('[data-ripple]')];

  $rippleElems.forEach(($rippleElem) => ripple($rippleElem));

  const $favoriteBtn = $card.querySelector('[data-favorite]');
  favorite($favoriteBtn, 'videos', id);

  hoverOnPlay($card);

  return $card;
};
