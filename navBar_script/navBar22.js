let indicator = document.getElementById('indicator');
let items = document.querySelectorAll('nav a');

function marker(e) {
    indicator.style.left = e.offsetLeft + 'px';
    indicator.style.width = e.offsetWidth + 'px';
}

items.forEach((link) => {
    link.addEventListener('click', (e) => {
        marker(e.target);
    });
});