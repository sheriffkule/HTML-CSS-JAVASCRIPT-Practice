let left = document.querySelector('.left');
let right = document.querySelector('.right');

window.addEventListener('scroll', function () {
    let value = window.scrollY/6;

    left.style.borderBottomRightRadius = value + '%';
    right.style.borderBottomLeftRadius = value + '%';
})