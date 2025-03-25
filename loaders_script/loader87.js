const aside = document.querySelector('aside');
const fragment = document.createDocumentFragment();

for (let i = 1; i < 60; i++) {
  const article = document.createElement('article');
  article.classList.add('element');
  article.style.setProperty('--i', i);
  fragment.appendChild(article);
}

aside.appendChild(fragment);
