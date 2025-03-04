const themeToggle = document.querySelector('.theme-toggle');
const promptBtn = document.querySelector('.prompt-btn');
const promptInput = document.querySelector('.prompt-input');
const promptForm = document.querySelector('.prompt-form');
const modelSelect = document.getElementById('model-select');
const countSelect = document.getElementById('count-select');
const ratioSelect = document.getElementById('ratio-select');
const gridGallery = document.querySelector('.gallery-grid');
const generateBtn = document.querySelector('.generate-btn');

const API_KEY = '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';

const examplePrompts = [
  'A magic forest with glowing plants and fairy homes among giant mushrooms',
  'An old steampunk airship floating through golden clouds at sunset',
  'A futuristic underwater city with neon lights and schools of rainbow fish',
  'A dark and mysterious cave system with glowing crystals and ancient artifacts',
  'A future Mars colony with glass domes and gardens against red mountains',
  'A dragon sleeping on gold coins in a crystal cave',
  'An underwater kingdom with merpeople and glowing coral buildings',
  'A floating island with waterfalls pouring into clouds below',
  "A witch's cottage in fall with magic herbs in the garden",
  'A futuristic city with holographic advertisements and flying cars',
  'A fantasy castle with a moat and a drawbridge at sunset',
  'A space station with stars and planets visible through the windows',
  'A robot painting in a sunny studio with art supplies around it',
  'A medieval village with a blacksmith and a market square',
  'A haunted mansion with cobwebs and a ghostly figure in the window',
  'A futuristic laboratory with scientists in lab coats and test tubes',
  'A fantasy forest with unicorns and a rainbow-colored waterfall',
  'A magical library with floating glowing books and spiral staircases',
  'A futuristic city with neon lights and a giant robot in the center',
  'A japanese shrine during cherry blossom season with lanterns and misty mountains',
];

(() => {
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const isDarkTheme = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
  document.body.classList.toggle('dark-theme', isDarkTheme);
  themeToggle.querySelector('i').className = isDarkTheme
    ? 'fa-solid fa-sun'
    : 'fa-solid fa-moon';
})();

const toggleTheme = () => {
  const isDarkTheme = document.body.classList.toggle('dark-theme');
  localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
  themeToggle.querySelector('i').className = isDarkTheme
    ? 'fa-solid fa-sun'
    : 'fa-solid fa-moon';
};

const getImageDimensions = (aspectRatio, baseSize = 512) => {
  const [width, height] = aspectRatio.split('/').map(Number);
  const scaleFactor = baseSize / Math.sqrt(width * height);

  let calculatedWidth = Math.round(width * scaleFactor);
  let calculatedHeight = Math.round(height * scaleFactor);

  calculatedWidth = Math.floor(calculatedWidth / 16) * 16;
  calculatedHeight = Math.floor(calculatedHeight / 16) * 16;

  return { width: calculatedWidth, height: calculatedHeight };
};

const updateImageCard = (imgIndex, imgUrl) => {
    const imgCard = document.getElementById(`img-card-${imgIndex}`);
    if(!imgCard) return;

    imgCard.classList.remove('loading');
    imgCard.innerHTML = `
        <img src="${imgUrl}" class="result-img">
        <div class="img-overlay">
            <a href="${imgUrl}" class="img-download-btn" download="${Date.now()}.png">
              <i class="fa-solid fa-download"></i>
            </a>
        </div>`;
}

const generateImages = async (selectModel, imageCount, aspectRatio, promptText) => {
  const MODEL_URL = `https://api-inference.huggingface.co/models/${selectModel}`;
  const { width, height } = getImageDimensions(aspectRatio);
  generateBtn.setAttribute('disabled', 'true');

  const imagePromises = Array.from({ length: imageCount }, async (_, i) => {
    try {
      const response = await fetch(MODEL_URL, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'x-use-cache': 'false',
        },
        method: 'POST',
        body: JSON.stringify({
          inputs: promptText,
          parameters: { width, height },
          options: {wait_for_model: true, user_cache: false},
        }),
      });

      if(!response.ok) throw new Error((await response.json())?.error);

      const result = await response.blob();
      updateImageCard(i, URL.createObjectURL(result));
    } catch (error) {
      console.log(error);
      const imgCard = document.getElementById(`img-card-${i}`);
      imgCard.classList.replace('loading', 'error');
      imgCard.querySelector('status-text').textContent = 'Generation failed! Check console for details.';
    }
  });

  await Promise.allSettled(imagePromises);
  generateBtn.removeAttribute('disabled');
};

const createImageCards = (selectModel, imageCount, aspectRatio, promptText) => {
  gridGallery.innerHTML = '';

  for (let i = 0; i < imageCount; i++) {
    gridGallery.innerHTML += `
        <div class="img-card loading" id="img-card-${i}" style="aspect-ratio: ${aspectRatio}">
            <div class="status-container">
            <div class="spinner"></div>
            <i class="fa-solid fa-triangle-exclamation"></i>
            <p class="status-text">Generating...</p>
            </div>
        </div>
    `;
  }

  generateImages(selectModel, imageCount, aspectRatio, promptText);
};

const handleFormSubmit = (e) => {
  e.preventDefault();

  const selectModel = modelSelect.value;
  const imageCount = parseInt(countSelect.value) || 1;
  const aspectRatio = ratioSelect.value || '1/1';
  const promptText = promptInput.value.trim();

  createImageCards(selectModel, imageCount, aspectRatio, promptText);
};

promptBtn.addEventListener('click', () => {
  const prompt = examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
  promptInput.value = prompt;
  promptInput.focus();
});

promptForm.addEventListener('submit', handleFormSubmit);
themeToggle.addEventListener('click', toggleTheme);

function updateYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('year');
    yearElement.dateTime = currentYear;
    yearElement.textContent = currentYear;
  }
  
updateYear();