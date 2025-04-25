let cursor = document.getElementById('cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.pageX}px`;
  cursor.style.top = `${e.pageY}px`;
});

const listItems = document.querySelectorAll('ul li');

listItems.forEach((item) => {
  item.addEventListener('mousemove', (e) => {
    const itemRect = item.getBoundingClientRect();
    const transX = e.offsetX - itemRect.width / 5;
    const transY = e.offsetY - itemRect.height / 5;

    item.style.transform = `translate(${transX}px, ${transY}px)`;
  });

  item.addEventListener('mouseout', () => {
    item.style.transform = '';
  });
});
