document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.items');
  let count = 0;
  let animationTimeout = null;
  let currentPlaying = false;

  let images = [
    { name: '../thumb/bakeryWebsite.jpg' },
    { name: '../thumb/architectureWebsite.jpg' },
    { name: '../thumb/cactusWebsite.jpg' },
    { name: '../thumb/chipsWebsite.jpg' },
    { name: '../thumb/burgerWebsite.jpg' },
    { name: '../thumb/bookWebsite.jpg' },
    { name: '../thumb/FruitSite.jpg' },
    { name: '../thumb/lampWebsite.jpg' },
    { name: '../thumb/pizzaWebsite.jpg' },
    { name: '../thumb/plantWebsite.jpg' },
    { name: '../thumb/portfolio06.jpg' },
    { name: '../thumb/helloweenSite.jpg' },
    { name: '../thumb/portfolio07.jpg' },
    { name: '../thumb/portfolio08.jpg' },
    { name: '../thumb/portfolio5.jpg' },
  ];
  function addNewItem(x, y) {
    const newItem = document.createElement('div');
    newItem.className = 'item';
    newItem.style.left = `${x - 75}px`;
    newItem.style.top = `${y - 100}px`;

    const countIndex = (count = (count + 1) % images.length);
    const img = document.createElement('img');
    img.classList.add('hero_media_image');
    img.setAttribute('src', images[countIndex].name);
    img.alt = 'hero image';

    newItem.appendChild(img);
    container.appendChild(newItem);
    menageItemLimit();
  }

  function menageItemLimit() {
    while (container.children.length > 20) {
      container.removeChild(container.firstChild);
    }
  }

  function startAnimation() {
    if (currentPlaying || container.children.length === 0) return;
    currentPlaying = true;

    gsap.to('.item', {
      y: 1000,
      scale: 0.5,
      opacity: 0,
      duration: 0.9,
      stagger: 0.025,
      onComplete: function () {
        this.targets().forEach((item) => {
          if (item.parentNode) {
            item.parentNode.removeChild(item);
          }
        });

        currentPlaying = false;
      },
    });
  }

  container.addEventListener('mousemove', function (event) {
    clearTimeout(animationTimeout);
    addNewItem(event.pageX, event.pageY);
    animationTimeout = setTimeout(startAnimation, 200);
  });
});