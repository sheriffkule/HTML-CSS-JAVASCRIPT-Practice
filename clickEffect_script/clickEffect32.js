const modal = document.getElementById('modal');
const cardsContainer = document.getElementById('cards-container');

const dataFromFetch = [];

async function fetchData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    const data = await response.json();

    dataFromFetch.push(...data);

    renderCards();
  } catch (error) {
    console.error('Error fetching data', error);
  }
}

function createCard(data) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <h3 class="card-title">${data.name}</h3>
    <div class="read-more">Read More</div>`;

  card.addEventListener('click', () => {
    openModal(data);
  });
  return card;
}

function openModal(data) {
  const { name, address, email, website } = data;
  modal.innerHTML = `
    <div class="modal-content">
    <h2 class="modal-title">${name}</h2>
      <h3 class="modal-city">${address.city}</h3>
      <p class="modal-email">${email}</p>
      <p class="modal-website">${website}</p>
      <span class="close">&times;</span>
    </div>
   `;

  modal.classList.add('open');

  const closeButton = modal.querySelector('.close');
  closeButton.addEventListener('click', closeModal);
}

function closeModal() {
  modal.classList.remove('open');
}

function renderCards() {
  dataFromFetch.forEach((data) => {
    const card = createCard(data);
    cardsContainer.appendChild(card);
  });
}

window.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('open')) closeModal();
})

document.addEventListener('DOMContentLoaded', fetchData);

let snowContainer = document.querySelector('.snow-container');

function createSnowFlake(){
    let snowflake = document.createElement('div');

    snowflake.classList.add('snowFlake');
    snowflake.textContent = '❄';
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.top = Math.random() * 100 + 'vh';
    snowflake.style.fontSize = `${Math.random() * 12 + 10}px`;
    snowflake.style.opacity = Math.random();
    snowflake.style.animationDuration = `${Math.random() * 12 + 18}s`;
    snowContainer.appendChild(snowflake);

    setTimeout(() => {
        snowflake.remove();
    }, 5000);
}
setInterval(createSnowFlake, 50);