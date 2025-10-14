'use strict';

const bodyEl = document.querySelector('body');
const checkBox = document.querySelector('.switch input');
const selectOptions = document.querySelector('.content select');
const searchBtn = document.querySelector('.search');
const inputEl = document.querySelector('form input');
const disContainer = document.querySelector('.dictionary_content');
const partOfSearch = document.querySelector('.partOfSearchNoun')

const API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

searchBtn.addEventListener('click', () => {
  if (inputEl.value !== '') {
    searching(inputEl.value);
    inputEl.style.outline = 'none';
  } else {
    inputEl.style.outline = '1px solid red';
  }
});

async function searching(data) {
  try {
    const api_data = await fetch(API_URL + data);
    const result = await api_data.json();

    const html = `
      <div class="section">
        <h2>${result[0].word}</h2>
        <p>${result[0].phonetic}</p>
      </div>
      <i class="ri-play-circle-fill"></i>
    `;

    disContainer.innerHTML = html;
    partOfSearch.textContent = result[0].meanings[0].partOfSpeech;
console.log(result);
  } catch (error) {
    console.log(error);
  }
}

selectOptions.addEventListener('change', (e) => {
  let fonts = e.target.value;
  bodyEl.style.fontFamily = fonts;
});

checkBox.addEventListener('click', () => {
  bodyEl.classList.toggle('dark');
});
