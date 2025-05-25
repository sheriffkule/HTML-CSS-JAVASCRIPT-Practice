'use strict';
import { client } from '../../js/api_configure.js';
import { filter } from '../../js/filter.js';
import { photoCard } from '../../js/photo_card.js';
import { gridInit, updateGrid } from '../../js/utils/masonry_grid.js';
import { updateUrl } from '../../js/utils/updateUrl.js';
import { urlDecode } from '../../js/utils/urlDecode.js';

const $filterBar = document.querySelector('[data-filter-bar]');

$filterBar.style.display = window.location.search ? 'flex' : 'none';

const $filterWrappers = document.querySelectorAll('[data-filter]');

$filterWrappers.forEach($filterWrapper => {
    filter($filterWrapper, window.filterObj, (newObj) => {
        window.filterObj = newObj;
        updateUrl(newObj, 'photos');
    });
})

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

const renderPhotos = function (currentPage) {
  client.photos[searchObj ? 'search' : 'curated'](
    { ...searchObj, per_page: perPage, page: currentPage },
    (data) => {
      totalPage = Math.ceil(data.total_results / perPage);

      data.photos.forEach((photo) => {
        const $photoCard = photoCard(photo);
        updateGrid($photoCard, photoGrid.columnsHeight, photoGrid.$columns);
      });

      isLoading = true;

      if (currentPage >= totalPage) $loader.style.display = 'none';
    }
  );
};

renderPhotos(currentPage);

const $loader = document.querySelector('[data-loader]');
let isLoading = true;

window.addEventListener('scroll', function () {
  if ($loader.getBoundingClientRect().top < window.innerHeight * 2 && currentPage <= totalPage && isLoading) {
    currentPage++;
    renderPhotos(currentPage);
    isLoading = false;
  }
});
