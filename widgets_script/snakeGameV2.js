const menus = document.querySelectorAll('.menu');

function showMenu(menu) {
  hideAllMenus();
  menus[menu].classList.add('active');
}

function hideAllMenus() {
  menus.forEach((menu) => {
    menu.classList.remove('active');
  });
}

showMenu(2)