document.addEventListener('click', function (event) {
  for (let j = 0; j < 3; j++) {
    setTimeout(() => {
      let i = document.createElement('i');
      i.setAttribute('class', 'pulse');
      document.body.appendChild(i);
      i.style.top = event.pageY + 'px';
      i.style.left = event.pageX + 'px';

      // remove <i> after 1s
      setTimeout(() => {
        document.body.removeChild(i);
      }, 1000);
    }, j * 200);
  }
});
