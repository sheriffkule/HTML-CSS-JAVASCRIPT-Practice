const home = {
  title: document.querySelectorAll('.home_heading_text > h1'),
  circle: document.querySelector('.home_heading_circle'),
  row: document.querySelectorAll('.home_thumbnail_row'),
  figure: document.querySelectorAll('.home_thumbnail_row_figure'),
  image: document.querySelectorAll('.home_thumbnail_row_image'),
};

const medias = [
  {
    row: 1,
    id: 1,
    url: '../thumb/bakeryWebsite.jpg',
  },
  {
    row: 1,
    id: 2,
    url: '../thumb/architectureWebsite.jpg',
  },
  {
    row: 1,
    id: 3,
    url: '../thumb/cactusWebsite.jpg',
  },
  {
    row: 1,
    id: 4,
    url: '../thumb/chipsWebsite.jpg',
  },
  {
    row: 1,
    id: 5,
    url: '../thumb/burgerWebsite.jpg',
  },
  {
    row: 2,
    id: 1,
    url: '../thumb/bookWebsite.jpg',
  },
  {
    row: 2,
    id: 2,
    url: '../thumb/FruitSite.jpg',
  },
  {
    row: 2,
    id: 3,
    url: '../thumb/lampWebsite.jpg',
  },
  {
    row: 2,
    id: 4,
    url: '../thumb/pizzaWebsite.jpg',
  },
  {
    row: 2,
    id: 5,
    url: '../thumb/plantWebsite.jpg',
  },
  {
    row: 3,
    id: 1,
    url: '../thumb/portfolio06.jpg',
  },
  {
    row: 3,
    id: 2,
    url: '../thumb/helloweenSite.jpg',
  },
  {
    row: 3,
    id: 3,
    url: '../thumb/portfolio07.jpg',
  },
  {
    row: 3,
    id: 4,
    url: '../thumb/portfolio08.jpg',
  },
  {
    row: 3,
    id: 5,
    url: '../thumb/portfolio5.jpg',
  },
];

const state = {
  targetX: 0,
  currentX: 0,
  lerp: 0.01,
  rows: [],
};

const init = () => {
  gsap.set(home.title, { yPercent: 100, rotate: 30, scale: 0 });
  gsap.set(home.circle, { scale: 0 });
  gsap.set(home.row, { xPercent: -100 });
  createRows();
};

const createRows = () => {
  for (let i = 0; i < 3; i++) {
    const row = document.createElement('div');
    row.classList.add('home_thumbnail_row_container');
    home.row[i].appendChild(row);
    state.rows.push(row);

    for (let j = 0; j < 5; j++) {
      const figure = document.createElement('figure');
      figure.classList.add('home_thumbnail_row_figure');
      row.appendChild(figure);

      const image = document.createElement('img');
      image.classList.add('home_thumbnail_row_image');
      figure.appendChild(image);

      for (let k = 0; k < medias.length; k++) {
        if (medias[k].row === i + 1 && medias[k].id === j + 1) {
          image.src = medias[k].url;
        }
      }
    }
  }

  animateHome();
};

const animateHome = () => {
  gsap
    .timeline({ defaults: { duration: 1.2, ease: 'power4.inOut' } })
    .to(home.row, {
      duration: 2.4,
      xPercent: 0,
      stagger: 0.05,
      onComplete: updateRows,
    })
    .to(
      home.title,
      {
        yPercent: 0,
        rotate: 0,
        scale: 1,
        stagger: 0.05,
      },
      '<1'
    )
    .to(home.circle, { scale: 1 }, '<0.5');
};

const onMouseMove = (event) => {
  state.targetX = (event.clientX / window.innerWidth - 0.5) * 20;
};

const updateRows = () => {
  state.currentX = lerp(state.currentX, state.targetX, state.lerp);

  home.row[0].style.transform = `translate3d(${state.currentX * 25}px, 0, 0)`;
  home.row[1].style.transform = `translate3d(${state.currentX * 60}px, 0, 0)`;
  home.row[2].style.transform = `translate3d(${state.currentX * 30}px, 0, 0)`;

  requestAnimationFrame(updateRows);
};

window.addEventListener('DOMContentLoaded', init);
window.addEventListener('mousemove', onMouseMove);

function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t;
}
