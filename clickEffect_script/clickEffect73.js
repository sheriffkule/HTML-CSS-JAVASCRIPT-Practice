window.addEventListener('click', function () {
  const menu = document.getElementById('contextMenu');
  menu.classList.remove('visible');
});

document.addEventListener('contextmenu', showContextMenu);

function showContextMenu(e) {
  e.preventDefault();

  const pulse = document.getElementById('pulse');
  const menu = document.getElementById('contextMenu');
  const left = Math.max(0, Math.min(e.clientX, window.innerWidth - menu.offsetWidth));
  const top = Math.max(0, Math.min(e.clientY, window.innerHeight - menu.offsetHeight));

  pulse.style.left = `${e.clientX - 17.5}px`;
  pulse.style.top = `${e.clientY - 17.5}px`;
  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;
  menu.style.transformOrigin = 'top left';

  pulse.classList.add('active');
  setTimeout(() => {
    document.getElementById('pulse').classList.remove('active');
  }, 300);

  menu.classList.add('visible');
  menu.style.transformOrigin = 'top left';
  return false;
}
