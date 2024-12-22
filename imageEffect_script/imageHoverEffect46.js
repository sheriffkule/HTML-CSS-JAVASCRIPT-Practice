const hero = document.querySelector('.hero');
const heroMedia = document.querySelector('.hero_media');

let isEnabled = false;
let count = 1;

const images = [
  '../thumb/bakeryWebsite.jpg',
  '../thumb/architectureWebsite.jpg',
  '../thumb/cactusWebsite.jpg',
  '../thumb/chipsWebsite.jpg',
  '../thumb/burgerWebsite.jpg',
  '../thumb/bookWebsite.jpg',
  '../thumb/FruitSite.jpg',
  '../thumb/lampWebsite.jpg',
  '../thumb/pizzaWebsite.jpg',
  '../thumb/plantWebsite.jpg',
  '../thumb/portfolio06.jpg',
  '../thumb/helloweenSite.jpg',
  '../thumb/portfolio07.jpg',
];

const createImage = (event) => {
  const countIndex = (count = (count + 1) % images.length);

  const image = document.createElement('img');
  image.classList.add('hero_media_image');
  image.setAttribute('src', images[countIndex]);
  image.setAttribute('alt', 'hero image');
  heroMedia.appendChild(image);

  image.style.top = `${
    event.pageY - image.getBoundingClientRect().height / 2
  }px`;
  image.style.left = `${
    event.pageX - image.getBoundingClientRect().width / 2
  }px`;

  animateImage(image);
};

const randomValue = (value) => Math.floor(Math.random() * value);

const animateImage = (image) => {
  gsap.set(image, {
    autoAlpha: 1,
    yPercent: 100,
    rotate: 0,
  });

  gsap
    .timeline()
    .to(image, {
      duration: 1.2,
      yPercent: -100,
      rotate: randomValue(-10),
      ease: 'expo.out',
    })
    .to(image, {
      duration: 2,
      autoAlpha: 0,
      yPercent: 50,
      ease: 'expo.inOut',
      onComplete: () => {
        heroMedia.removeChild(image);
      },
    });
};

window.addEventListener('mousemove', (event) => {
  if (!isEnabled) {
    isEnabled = true;
    setTimeout(() => {
      isEnabled = false;
    }, 250);
    createImage(event);
  }
});
