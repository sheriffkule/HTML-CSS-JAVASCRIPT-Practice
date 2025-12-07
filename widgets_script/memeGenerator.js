const generateMemeBtn = document.querySelector('.generate-meme-btn');
const memeImage = document.querySelector('.meme-generator img');
const memeTitle = document.querySelector('.meme-title');
const memeAuthor = document.querySelector('.meme-author');

// Helper to toggle loading state and disable the generate button
const setLoading = (isLoading) => {
  if (generateMemeBtn) {
    generateMemeBtn.disabled = isLoading;
    if (isLoading) {
      generateMemeBtn.innerHTML = `<span class="btn-spinner" aria-hidden="true"></span> Loading...`;
    } else {
      generateMemeBtn.textContent = 'Generate';
    }
  }
  if (isLoading) {
    if (memeTitle) memeTitle.textContent = 'Loading...';
    if (memeImage) memeImage.removeAttribute('src');
  }
};

const updateDetails = (url, title, author) => {
  if (memeImage) memeImage.setAttribute('src', url || '');
  if (memeTitle) memeTitle.textContent = title || 'Untitled';
  if (memeAuthor) memeAuthor.textContent = `Meme by: ${author || 'Unknown'}`;
};

const generateMeme = () => {
  setLoading(true);
  fetch('https://meme-api.com/gimme/wholesomememes')
    .then((response) => {
      if (!response.ok) throw new Error(`Network response was not ok: ${response.status}`);
      return response.json();
    })
    .then((data) => {
      const url = data.url || (data.preview && data.preview[0]) || '';
      const title = data.title || 'Untitled';
      const author = data.author || 'Unknown';
      updateDetails(url, title, author);
    })
    .catch((err) => {
      console.error('Failed to fetch meme:', err);
      if (memeTitle) memeTitle.textContent = 'Failed to load meme';
      if (memeImage) memeImage.removeAttribute('src');
    })
    .finally(() => {
      setLoading(false);
    });
};

if (generateMemeBtn) generateMemeBtn.addEventListener('click', generateMeme);
generateMeme();
