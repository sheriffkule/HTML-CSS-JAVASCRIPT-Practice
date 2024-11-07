let tooltips = document.querySelectorAll('.tooltip');

window.onmousemove = function (e) {
    let x = (e.clientX + 10) + 'px';
    let y = (e.clientY + 10) + 'px';

    for (let i = 0; i < tooltips.length; i++) {
        tooltips[i].style.top = y;
        tooltips[i].style.left = x;
    }
}