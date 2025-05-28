'use strict';

import { client } from '../../js/api_configure.js';
import { favorite } from '../../js/favorite.js';
import { menu } from '../../js/menu.js';
import { ripple } from '../../js/utils/ripple.js';

const $rippleElems = document.querySelectorAll('[data-ripple]');

$rippleElems.forEach(($rippleElem) => ripple($rippleElem));

window.addEventListener('loadstart', function () {
  document.body.style.opacity = '0';
});

window.addEventListener('DOMContentLoaded', function () {
  document.body.style.opacity = '1';
});

const $menuWrapper = document.querySelectorAll('[data-menu-wrapper]');

$menuWrapper.forEach(($menuWrapper) => {
  menu($menuWrapper);
});

const favoriteVideos = JSON.parse(window.localStorage.getItem('favorite')).videos;
const $favoriteBtn = document.querySelector('[data-add-favorite]');
const videoId = window.location.search.split('=')[1];

$favoriteBtn.classList[favoriteVideos[videoId] ? 'add' : 'remove']('active');

favorite($favoriteBtn, 'videos', videoId);

const $detailWrapper = document.querySelector('[data-detail-wrapper]');
const $downloadLink = document.querySelector('[data-download-link]');
const $downloadMenu = document.querySelector('[data-download-menu]');

client.videos.detail(videoId, (data) => {
  const {
    width,
    height,
    image,
    user: { name: author },
    video_files,
  } = data;

  const hdVideo = video_files.find((item) => item.quality === 'hd');
  const { file_type, link } = hdVideo;

  $downloadLink.href = link;

  video_files.forEach((item) => {
    const { width, height, quality, link } = item;

    $downloadMenu.innerHTML += `
      <a href="${link}" download class="menu-item">
        <span class="label-large text">${quality.toUpperCase()}</span>
        <span class="label-large trailing-text">${width}x${height}</span>
        <div class="state-layer"></div>
      </a>
    `;
  });

  $detailWrapper.innerHTML = `
    <div class="detail banner" style="aspect-ratio: ${width} / ${height}">
      <video poster="${image}" controls class="img-cover" data-video>
        <source src="${link}" type="${file_type}" />
      </video>
    </div>
    <p class="title-small">Video by <span class="color-primary">${author}</span></p>
  `;
});
