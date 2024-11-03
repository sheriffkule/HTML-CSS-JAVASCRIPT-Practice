let text = 'SheriffKule Ghost Text';
let h2 = document.getElementById('ghostText');

text.split('').forEach((char, index) => {
    let span = document.createElement('span');
    span.classList.add('ghost-text-char');
    span.textContent = char === ' ' ? '\u00A0\u00A0' : char;
    span.style.transitionDelay = `${(index) * 0.1}s`;
    h2.appendChild(span);
})