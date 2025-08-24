let emoji = document.querySelector('.emoji');
let joke = document.querySelector('.joke');
let getJokeBtn = document.querySelector('.refresh');
let copyBtn = document.querySelector('.copy');
let copyIcon = document.querySelector('.copy i');
let copyText = document.querySelector('.copy span');
let twitterBtn = document.querySelector('.twitter');

let url =
  'https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark,Pun,Spooky?blacklistFlags=nsfw,religious';

let getJoke = () => {
  joke.textContent = 'Loading...';
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      joke.textContent = data.delivery;
    });
};

let copyJoke = () => {
  navigator.clipboard.writeText(joke.innerText);
  copyIcon.style.display = 'none';
  copyText.style.visibility = 'visible';
  copyText.style.bottom = '17px';
  copyText.style.opacity = '1';
  setTimeout(() => {
    copyIcon.style.display = 'block';
    copyText.style.visibility = 'hidden';
  }, 1000);
};

let twitterJoke = () => {
  let tweetUrl = `https://twitter.com/intent/tweet?url=${joke.innerText}`;
  window.open(tweetUrl, '_blank');
};

getJoke()
twitterBtn.addEventListener('click', twitterJoke);
copyBtn.addEventListener('click', copyJoke);
getJokeBtn.addEventListener('click', getJoke);
