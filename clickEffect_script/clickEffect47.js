const body = document.querySelector('body');
const toggle = document.getElementById('toggle');
const textElements = document.querySelectorAll('#text');

toggle.onclick = function() {
    toggle.classList.toggle('active');
    body.classList.toggle('active');
    textElements.forEach((textElement) => textElement.classList.toggle('active'));
}