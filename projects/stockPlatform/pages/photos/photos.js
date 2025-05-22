"use strict";
import { gridInit } from '../../js/utils/masonry_grid.js';
import { urlDecode } from '../../js/utils/urlDecode.js';

const $filterBar = document.querySelector('[data-filter-bar]');

$filterBar.style.display = window.location.search ? 'flex' : 'none';

const $photoGrid = document.querySelector('[data-photo-grid]');
const $title = document.querySelector('[data-title]');
const photoGrid = gridInit($photoGrid);
const perPage = 30;
let currentPage = 1;
let totalPage = 0;
const searchUrl = window.location.search.slice(1);
let searchObj = searchUrl && urlDecode(searchUrl);
const title = searchObj ? `${searchObj.query} photos` : 'Curated photos';

$title.textContent = title;
document.title = title;