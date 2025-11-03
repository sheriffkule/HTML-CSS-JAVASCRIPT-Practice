const items = document.querySelectorAll('.list-item');

items.forEach((item) => {
  item.addEventListener('touchstart', (e) => {
    e.target.dataset.x = Number(e.touches[0].pageX) + Number(e.target.dataset.move) || 0;
  });

  item.addEventListener('touchmove', (e) => {
    let moveX = Number(e.target.dataset.x) - e.touches[0].pageX;
    moveX > 130 ? (moveX = 130) : null;
    moveX < -130 ? (moveX = -130) : null;
    e.target.dataset.move = moveX;

    anime({
      targets: e.target,
      translateX: -Number(e.target.dataset.move),
      duration: 300,
    });
  });

  item.addEventListener('touchend', (e) => {
    let elementMove = e.target.dataset.move;
    if (elementMove > 100) {
      elementMove = 100;
    } else if (elementMove < -100) {
      elementMove - 100;
    } else {
      elementMove = 0;
    }

    items.forEach((item) => {
      let content = item.querySelector('.list-content');

      if (content === e.target) {
        return null;
      }

      content.dataset.x = 0;
      content.dataset.move = 0;

      anime({
        targets: content,
        translateX: 0,
      });
    });

    setTimeout(() => {
      anime({
        targets: e.target,
        translateX: -Number(elementMove),
      });
    }, 10);
  });
});
