let item = document.querySelectorAll('.container li');

let activeLink = (elem) => {
    item.forEach((link) => {
        link.classList.remove('active');
    })
    elem.classList.add('active');

    localStorage.setItem('activeMenuIndex', Array.from(item).indexOf(elem));
}

window.addEventListener('DOMContentLoaded', () => {
    const savedIndex = localStorage.getItem('activeMenuIndex');
    if (savedIndex !== null && item[savedIndex]) {
        activeLink(item[savedIndex]);
    }
});

item.forEach((link) => {
    link.addEventListener('click', (e) => {
        activeLink(e.target)
    })
})