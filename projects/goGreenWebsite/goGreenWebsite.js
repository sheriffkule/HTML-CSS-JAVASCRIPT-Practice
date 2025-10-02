let line = document.querySelector('.navbar .ri-menu-line')
let menu = document.querySelector('.navbar ul')

line.addEventListener('click', () => {
    menu.classList.toggle('show-menu')
})

window.addEventListener('scroll', () => {
    let nav = document.querySelector('.navbar')
    if(scrollY > 50) {
        nav.classList.add('navbarSticky')
    } else {
        nav.classList.remove('navbarSticky')
    }
})