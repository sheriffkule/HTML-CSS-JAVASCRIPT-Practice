document.addEventListener('DOMContentLoaded', function () {
    let btns = document.querySelectorAll('.btns');

    btns.forEach(function (btn) {
        const spans = [];
        for (let i = 0; i < 40; i++) {
            let span = document.createElement('span');

            span.style.top = `${i * 2}px`;
            spans.push(span);
            btn.appendChild(span);

            let randomDelay = (Math.random() * 0.85) + 0;
            span.style.transitionDelay = `${randomDelay}s`;
        }
    })
})