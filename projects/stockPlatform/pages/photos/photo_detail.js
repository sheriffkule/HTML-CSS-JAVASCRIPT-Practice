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

$menuWrapper.forEach($menuWrapper => {
    menu($menuWrapper)
})

const favoritePhotos = JSON.parse(window.localStorage.getItem('favorite')).photos;
const $favoriteBtn = document.querySelector('[data-add-favorite]');
const photoId = window.location.search.split('=')[1];

$favoriteBtn.classList[favoritePhotos[photoId] ? 'add' : 'remove']('active');

favorite($favoriteBtn, 'photos', photoId);

const $detailWrapper = document.querySelector('[data-detail-wrapper]');
const $downloadLink = document.querySelector('[data-download-link]');
const $downloadMenu = document.querySelector('[data-download-menu]');

client.photos.detail(photoId, data => {
    const {
        avg_color,
        height,
        width,
        photographer,
        alt,
        src
    } = data;
})