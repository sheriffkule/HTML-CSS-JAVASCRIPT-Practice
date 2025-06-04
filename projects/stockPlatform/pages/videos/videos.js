"use strict";

'use strict';
import { client } from '../../js/api_configure.js';
import { filter } from '../../js/filter.js';
import { gridInit, updateGrid } from '../../js/utils/masonry_grid.js';
import { updateUrl } from '../../js/utils/updateUrl.js';
import { urlDecode } from '../../js/utils/urlDecode.js';
import { videoCard } from '../../js/video_card.js';

const $filterBar = document.querySelector('[data-filter-bar]');

$filterBar.style.display = window.location.search ? 'flex' : 'none';

const $filterWrappers = document.querySelectorAll('[data-filter]');

$filterWrappers.forEach($filterWrapper => {
    filter($filterWrapper, window.filterObj, (newObj) => {
        window.filterObj = newObj;
        updateUrl(newObj, 'videos');
    });
})

const $videoGrid = document.querySelector('[data-video-grid]');
const $title = document.querySelector('[data-title]');
const videoGrid = gridInit($videoGrid);
const perPage = 30;
let currentPage = 1;
let totalPage = 0;
const searchUrl = window.location.search.slice(1);
let searchObj = searchUrl && urlDecode(searchUrl);
const title = searchObj ? `${searchObj.query} videos` : 'Popular videos';

$title.textContent = title;
document.title = title;

const renderVideos = function (currentPage) {
  client.videos[searchObj ? 'search' : 'popular'](
    { ...searchObj, per_page: perPage, page: currentPage },
    (data) => {
      totalPage = Math.ceil(data.total_results / perPage);

      data.videos.forEach((video) => {
        const $videoCard = videoCard(video);
        updateGrid($videoCard, videoGrid.columnsHeight, videoGrid.$columns);
      });

      isLoaded = true;

      if (currentPage >= totalPage) $loader.style.display = 'none';
    }
  );
};

renderVideos(currentPage);

const $loader = document.querySelector('[data-loader]');
let isLoaded = true;

window.addEventListener('scroll', function () {
  if ($loader.getBoundingClientRect().top < window.innerHeight * 2 && currentPage <= totalPage && isLoaded) {
    currentPage++;
    renderVideos(currentPage);
    isLoaded = false;
  }
});
