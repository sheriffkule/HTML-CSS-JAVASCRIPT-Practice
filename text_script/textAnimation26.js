let body = document.querySelector('body');
let spotlight = document.querySelector('.spotlight');

window.onmousemove = function (e) {
    spotlight.style.top = e.clientY + 'px';
    spotlight.style.left = e.clientX + 'px';
};

body.ondblclick = function () {
    body.classList.toggle('active');
}