const toggle = document.getElementById('toggle');
const menu = document.querySelector('.menu');

toggle.addEventListener('click', function() {
    menu.classList.toggle('active');
})