const userInput = document.querySelector('input');
const resultBox = document.querySelector('.result-box');
const magnifyingGlass = document.querySelector('.search-box .fa-magnifying-glass');
const copyBtn = document.querySelector('.copyBtn');

const getSynonyms = (word) => {
  let li = '';
  resultBox.innerHTML = '<span class="msg">Loading...</span>';

  const url = `https://api.datamuse.com/words?rel_syn=${word}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        li += `<li class="synonym-item" title="Click to copy to clipboard">${data[i].word}</li>`;
      }
      if (data.length == 0) {
        resultBox.innerHTML = '<span class="msg">No Results Found! <br> Try something else.</span>';
      } else {
        resultBox.innerHTML = li;
        const items = document.querySelectorAll('.synonym-item');
        items.forEach((item) =>
          item.addEventListener('click', () => {
            const originalText = item.textContent;
            navigator.clipboard.writeText(originalText);
            item.textContent = 'Copied';
            item.style.color = '#0f0';
            setTimeout(() => {
              item.textContent = originalText;
              item.style.color = '';
            }, 1200);
          })
        );
      }
    });
};

userInput.addEventListener('keyup', (e) => {
  if (e.key == 'Enter' && e.target.value != '') {
    getSynonyms(e.target.value);
  }
});

magnifyingGlass.addEventListener('click', () => getSynonyms());

copyBtn.addEventListener('click', () => {
  const items = document.querySelectorAll('.synonym-item');
  const allWords = Array.from(items)
    .map((item) => item.textContent)
    .join('\n');
  if (allWords) {
    navigator.clipboard.writeText(allWords);
    copyBtn.textContent = 'Copied!';
    copyBtn.style.color = '#0f0';
    setTimeout(() => {
      copyBtn.textContent = 'Copy All';
      copyBtn.style.color = '';
    }, 1500);
  }
});

document.getElementById('year').textContent = new Date().getFullYear();
