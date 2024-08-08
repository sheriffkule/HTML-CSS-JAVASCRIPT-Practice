let text = document.querySelector('.text');

for (let i = 1; i <= 18; i++) {
    let span = document.createElement('span');
    span.innerHTML = `<b>SheriffKule</b>3D`;
    span.style.setProperty('--i', i)
    text.appendChild(span);
}