let body = document.querySelector('body');
body.addEventListener('click', function (event) {
  let spark = document.createElement('div');
  spark.classList.add('spark');
  body.appendChild(spark);

  spark.style.top = `${event.clientY - body.offsetTop}px`;
  spark.style.left = `${event.clientX - body.offsetLeft}px`;
  spark.style.filter = `hue-rotate(${Math.random() * 360}deg)`;

  for (let i = 0; i <= 7; i++) {
    let span = document.createElement('span');
    span.style.transform = `rotate(${i * 45}deg)`;
    spark.appendChild(span)
  }

  setTimeout(function () {
    spark.remove();
  }, 1000);
});
