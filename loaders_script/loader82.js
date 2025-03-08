const container = document.querySelector('.container');

const loadersCount = 3;
const linesPerLoader = 20;

Array(loadersCount)
  .fill()
  .map(() => {
    const loader = document.createElement('div');
    loader.classList.add('loader');
    container.appendChild(loader);

    const lines = document.createElement('div');
    lines.classList.add('lines');
    loader.appendChild(lines);

    Array(linesPerLoader)
      .fill()
      .map((_, i) => {
        const line = document.createElement('span');
        line.style.setProperty('--i', i);
        lines.appendChild(line);
      });

    return loader;
  });

// Alternative approach, it gives the same result

// for (let j = 0; j < loadersCount; j++) {
//   const loader = document.createElement('div');
//   loader.classList.add('loader');
//   container.appendChild(loader);

//   const lines = document.createElement('div');
//   lines.classList.add('lines');
//   loader.appendChild(lines);

//   for (let i = 0; i < linesPerLoader; i++) {
//     const line = document.createElement('span');
//     line.style.setProperty('--i', i);
//     lines.appendChild(line);
//   }
// }
