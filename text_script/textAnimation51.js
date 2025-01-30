let textElement = document.querySelector('.text');
let textContent = textElement.textContent;

textElement.innerHTML = '';

for (let char of textContent) {
    let span = document.createElement('span');
    span.textContent = char;
    textElement.appendChild(span);
}

let spans = textElement.querySelectorAll('span');
window.addEventListener('scroll', () => {
    let scrollDistance = window.scrollY;
    spans.forEach((span, index) => {
        if (scrollDistance >= (index + 1) * 10) {
            span.classList.add('active');
        } else {
            span.classList.remove('active');
        }
    });
})