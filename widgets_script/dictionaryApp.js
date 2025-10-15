'use strict';

const bodyEl = document.querySelector('body');
const checkBox = document.querySelector('.switch input');
const selectOptions = document.querySelector('.content select');
const searchBtn = document.querySelector('.search');
const inputEl = document.querySelector('form input');
const disContainer = document.querySelector('.dictionary_content');
const partOfSearch = document.querySelector('.partOfSearchNoun');
const ulEl = document.querySelector('.meaning');
const synEl = document.querySelector('.syn');
const verbEl = document.querySelector('.verb');
const form = document.querySelector('form');

const API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

searchBtn.addEventListener('click', () => {
  if (inputEl.value !== '') {
    searching(inputEl.value);
    inputEl.style.outline = 'none';
  } else {
    inputEl.style.outline = '1px solid red';
  }
});

inputEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    if (inputEl.value.trim() !== '') {
      searching(inputEl.value.trim());
      inputEl.style.outline = 'none';
    } else {
      inputEl.style.outline = '1px solid red';
    }
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
      <i class="ri-play-circle-fill playBtn"></i>
    `;

    disContainer.innerHTML = html;
    partOfSearch.textContent = result[0].meanings[0].partOfSpeech;

    ulEl.innerHTML = result[0].meanings[0].definitions.map((def) => `<li>${def.definition}</li>`).join('');

    const syn = result[0].meanings[0].synonyms;

    for (let i = 0; i < syn.length; i++) {
      synEl.innerHTML = syn.map((word) => `<span>${word}</span>`).join(', ');
    }

    if (result[0].meanings[1]) {
      const definitions = result[0].meanings[1].definitions;
      const definitionsList = definitions.map((def) => `<li>${def.definition}</li>`).join('');

      let partOfSpeech2 = `
        <div class="verbContent">
          <h3>${result[0].meanings[1].partOfSpeech}</h3>
          <p>Meaning</p>
          <ul class="meaning">
            ${definitionsList}
          </ul>
        </div>
      `;

      verbEl.innerHTML = partOfSpeech2;
    } else {
      verbEl.innerHTML = '';
    }

    const playBtn = document.querySelector('.ri-play-circle-fill');
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        const speechWord = result[0].word;
        speechText(speechWord)
      });
    }
  } catch (error) {
    console.log(error);
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  searching(inputEl.value);
  inputEl.value = '';
});

selectOptions.addEventListener('change', (e) => {
  let fonts = e.target.value;
  bodyEl.style.fontFamily = fonts;
});

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('dictionaryTheme');
  if (savedTheme === 'dark') {
    bodyEl.classList.add('dark');
    checkBox.checked = true;
  } else {
    bodyEl.classList.remove('dark');
    checkBox.checked = false;
  }
});

checkBox.addEventListener('click', () => {
  bodyEl.classList.toggle('dark');
  const theme = bodyEl.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('dictionaryTheme', theme);
});

function speechText(textSpeech) {
  let speechText = new SpeechSynthesisUtterance();
  speechText.text = textSpeech;
  speechText.voice = window.speechSynthesis.getVoices()[0];
  window.speechSynthesis.speak(speechText);
}

function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');

  if (!yearElement) {
    console.error('Year element not found');
    return;
  }

  if (yearElement) {
    yearElement.setAttribute('datetime', currentYear.toString());
    yearElement.dateTime = currentYear;
    yearElement.textContent = currentYear.toString();
  }
}

window.addEventListener('load', updateYear);