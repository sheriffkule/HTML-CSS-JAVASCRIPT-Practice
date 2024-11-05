let banner = document.querySelector('.banner');

banner.onmousemove = function (e) {
    let x = e.clientX - banner.offsetLeft;
    let y = e.clientY - banner.offsetTop;

    banner.style.setProperty('--x', x + 'px');
    banner.style.setProperty('--y', y + 'px');
}