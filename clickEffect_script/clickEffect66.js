popit.onclick = function (event) {
  const target = event.target;

  if (!target.matches('.circle')) {
    return;
  }

  if ('vibrate' in navigator) {
    navigator.vibrate(100);
  }

  target.classList.toggle('pressed');
};
