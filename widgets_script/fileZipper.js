document.addEventListener('DOMContentLoaded', function () {
  const title = document.getElementById('title');
  const text = title.textContent;

  // Title spiting characters for animation
  title.innerHTML = '';
  [...text].forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.setProperty('--i', i);
    span.className = 'titleCharacter';
    title.appendChild(span);
  });
});
