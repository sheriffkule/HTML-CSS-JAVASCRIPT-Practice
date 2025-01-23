const apiKey = 'rpHhi6l4VlMV1xYfm1R0Or9DnJHH1VAHDVB3dc7N2Hw7fKvgaNVEJk7j';

const searchForm = document.getElementById('search-form');
const searchResult = document.getElementById('result');

let sentinelObserver;

const setupListeners = () => {
  searchForm.addEventListener('submit', onSearchFormSubmit);
};

const onSearchFormSubmit = (e) => {
  e.preventDefault();

  const query = searchForm.query.value.trim();

  if (!query) {
    alert('Please enter a valid search term');
    return;
  }

  const apiURL = `https://api.pexels.com/v1/search?query=${query}&orientation=landscape`;

  showLoading();

  fetchImages(apiURL)
    .then((data) => displayResults(data))
    .finally(hideLoading);
};

const displayResults = (data) => {
  removeObserver();

  if (data.total_results === 0) {
    searchResult.innerHTML = `
        <div class="no-result">No Images Found.</div>
        `;
    return;
  }

  if (data.page === 1) {
    searchResult.innerHTML = '';
  }

  data.photos.forEach((photo) => {
    searchResult.innerHTML += `
        <div class="grid-item">
          <a href="${photo.url}" target="_blank">
            <img src="${photo.src.small}" alt="${photo.alt}" loading="lazy" />
            <div class="image-content">
              <h3 class="photographer">${photo.photographer}</h3>
            </div>
          </a>
        </div>
        `;
  });

  createObserver(data.next_page);
};

const showLoading = () => {
  const div = document.createElement('div');
  div.classList.add('loader');

  document.body.prepend(div);
};

const hideLoading = () => {
  const loader = document.querySelector('.loader');
  loader && loader.remove();
};

const createObserver = (nextPageURL) => {
  if (!nextPageURL) return;

  const sentinel = document.createElement('div');
  sentinel.id = 'sentinel';

  document.querySelector('.container').appendChild(sentinel);

  sentinelObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadMoreResults(nextPageURL);
      }
    });
  });

  sentinelObserver.observe(sentinel);
};

const removeObserver = () => {
  const sentinel = document.getElementById('sentinel');
  sentinel && sentinel.remove();

  if (sentinelObserver) {
    sentinelObserver.disconnect();
    sentinelObserver = null;
  }
};

const fetchImages = async (apiURL) => {
  try {
    const response = await fetch(apiURL, {
      headers: { Authorization: apiKey },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! status=${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch error', error);
  }
};

const loadMoreResults = (nextPageURL) => {
  showLoading();

  fetchImages(nextPageURL)
    .then((data) => displayResults(data))
    .finally(hideLoading);
};

setupListeners();

function updateYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('year');
    yearElement.dateTime = currentYear;
    yearElement.textContent = currentYear;
  }
  
  updateYear();