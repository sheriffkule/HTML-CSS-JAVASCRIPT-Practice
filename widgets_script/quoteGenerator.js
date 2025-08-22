'use strict';

const quoteTxt = document.querySelector('.quote');
const quoteBtn = document.querySelector('.btn-quote');
const authorEl = document.querySelector('.author');
const speechEl = document.querySelector('.speech');
const copyEl = document.querySelector('.copy');
const twitterEl = document.querySelector('.twitter');
const messageEl = document.querySelector('.message');

async function randomQuote() {
  quoteBtn.textContent = 'loading';
  const data = await fetch('https://quotes-api-self.vercel.app/quote');
  const result = await data.json();
  const { quote, author } = result;
  quoteTxt.textContent = quote;
  authorEl.textContent = author;
  quoteBtn.textContent = 'New Quote';
}

function speechTxt() {
  let speechText = new SpeechSynthesisUtterance();
  speechText.text = `${quoteTxt.textContent}`;
  speechText.voice = window.speechSynthesis.getVoices()[0];
  window.speechSynthesis.speak(speechText);
}

copyEl.addEventListener('click', () => {
  navigator.clipboard.writeText(quoteTxt.innerText);
  messageEl.classList.add('active');

  setInterval(() => {
    messageEl.classList.remove('active');
  }, 2000);
});

twitterEl.addEventListener('click', () => {
  let tweet = `https://twitter.com/intent/tweet?url=${quoteTxt.innerText}`;
  window.open(tweet, '_blank');
});

speechEl.addEventListener('click', speechTxt);
quoteBtn.addEventListener('click', randomQuote);
document.getElementById('year').textContent = new Date().getFullYear();

const switchButton = document.getElementById('switch');

window.addEventListener('DOMContentLoaded', () => {
  const mode = localStorage.getItem('mode');
  if (mode === 'dark') {
    document.body.classList.add('dark');
    switchButton.checked = true;
  } else {
    document.body.classList.remove('dark');
    switchButton.checked = false;
  }
});

switchButton.addEventListener('change', (e) => {
  const body = document.body;
  if (e.target.checked) {
    body.classList.add('dark');
    localStorage.setItem('mode', 'dark');
  } else {
    body.classList.remove('dark');
    localStorage.setItem('mode', 'light');
  }
});