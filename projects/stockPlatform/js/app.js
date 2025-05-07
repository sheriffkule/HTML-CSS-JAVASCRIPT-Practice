'use strict';

import { client } from './api_configure.js';
import { photoCard } from './photo_card.js';
import { gridInit, updateGrid } from './utils/masonry_grid.js';
import { videoCard } from './video_card.js';

const $photoGrid = document.querySelector('[data-photo-grid]');

$photoGrid.innerHTML = `<div class="skeleton"></div>`.repeat(18);

// client.photos.curated({page: 1, per_page: 5}, data => {
//     console.log(data);
// });;

async function fetchCuratedPhotos(page = 1, perPage = 20) {
  try {
    const response = await new Promise((resolve, reject) => {
      client.photos.curated({ page, per_page: perPage }, (data, error) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
        $photoGrid.innerHTML = '';
        const photoGrid = gridInit($photoGrid);

        data.photos.forEach((photo) => {
          const $photoCard = photoCard(photo);

          updateGrid($photoCard, photoGrid.columnsHeight, photoGrid.$columns);
        });
      });
    });

    return response;
  } catch (error) {
    console.error('Error fetching curated photos:', error);
    throw error;
  }
}
async function mainPhoto() {
  const data = await fetchCuratedPhotos(1, 20);
}
mainPhoto();

const $videoGrid = document.querySelector('[data-video-grid]');

$videoGrid.innerHTML = `<div class="skeleton"></div>`.repeat(18);

async function fetchCuratedVideos(page = 1, perPage = 20) {
  try {
    const response = await new Promise((resolve, reject) => {
      client.videos.popular({ page, per_page: perPage }, (data, error) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
        $videoGrid.innerHTML = '';
        const videoGrid = gridInit($videoGrid);

        data.videos.forEach((video) => {
          const $videoCard = videoCard(video);

          updateGrid($videoCard, videoGrid.columnsHeight, videoGrid.$columns);
        });
      });
    });

    return response;
  } catch (error) {
    console.error('Error fetching curated photos:', error);
    throw error;
  }
}
async function mainVideo() {
  const data = await fetchCuratedVideos(1, 20);
  console.log(data);
}
mainVideo();