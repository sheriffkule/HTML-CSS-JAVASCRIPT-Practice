'use strict';

import { client } from './api_configure.js';

const $photoGrid = document.querySelector('[data-photo-grid]');

$photoGrid.innerHTML = `<div class="skeleton"></div>`.repeat(18);

// client.photos.curated({page: 1, per_page: 5}, data => {
//     console.log(data);
// });;

async function fetchCuratedPhotos(page = 5, perPage = 20) {
  try {
    const response = await new Promise((resolve, reject) => {
      client.photos.curated({ page, per_page: perPage }, (data, error) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
        $photoGrid.innerHTML = '';
    
        data.photos.forEach(photo => {
          const $photoCard = photoCard(photo);
        })
      });
    });

    return response;
  } catch (error) {
    console.error('Error fetching curated photos:', error);
    throw error;
  }
}
async function main() {
  const data = await fetchCuratedPhotos(5, 20);
  console.log(data);
}
main();
