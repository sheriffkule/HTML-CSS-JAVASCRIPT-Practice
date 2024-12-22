let listItems = document.querySelectorAll('.list');
let indicator = document.querySelector('.indicator');

listItems.forEach((item, index) => {
  item.onclick = () => {
    listItems.forEach((el) => el.classList.remove('active'));
    item.classList.add('active');
    indicator.style.transform = `translateX(${index * 80}px)`;
    indicator.style.background = item.getAttribute('data-color');
    indicator.style.boxShadow = `0 0 35px ${item.getAttribute('data-color')}`;
  };
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.list')) {
    listItems.forEach((el) => el.classList.remove('active'));
    indicator.style.background = 'none';
    indicator.style.boxShadow = 'none';
  }
});

let currentIndex = -1;

const handleItemClick = (event) => {
  listItems.forEach((el) => el.classList.remove('active'));
  event.currentTarget.classList.add('active');
};

listItems.forEach((item, index) => {
  item.addEventListener('click', handleItemClick);
  item.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      handleItemClick(event);
    }
  });
});

const savedIndex = localStorage.getItem('activeIndex');
if (savedIndex !== null) {
  listItems[savedIndex].classList.add('active');
}

listItems.forEach((item, index) => {
  item.addEventListener('click', (event) => {
    localStorage.setItem('activeIndex', index);
    handleItemClick(event);
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowDown') {
    currentIndex = (currentIndex + 1) % listItems.length;
    listItems[currentIndex].click();
  } else if (event.key === 'ArrowUp') {
    currentIndex = (currentIndex - 1 + listItems.length) % listItems.length;
    listItems[currentIndex].click();
  }
});