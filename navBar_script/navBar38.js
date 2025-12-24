const showSidebar = (toggleId, sidebarId) => {
  const toggle = document.getElementById(toggleId);
  const sidebar = document.getElementById(sidebarId);

  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('show-sidebar');
  });
};

showSidebar('header-toggle', 'sidebar');

const drop = document.querySelectorAll('.drop');

drop.forEach((item) => {
  const dropBtn = item.querySelector('.drop__button');
  const dropList = item.querySelector('.drop__list');

  dropBtn.addEventListener('click', () => {
    const openItem = document.querySelector('.show-drop');

    if (openItem && openItem !== item) {
      const openList = openItem.querySelector('.drop__list');
      openList.removeAttribute('style');
      openItem.classList.remove('show-drop');
    }

    if (item.classList.contains('show-drop')) {
      dropList.removeAttribute('style');
      item.classList.remove('show-drop');
    } else {
      dropList.style.height = dropList.scrollHeight + 'px';
      item.classList.add('show-drop');
    }
  });
});
