document.addEventListener('mousemove', parallax);

function parallax(event) {
  this.querySelectorAll('.object').forEach((layer) => {
    const speed = layer.getAttribute('data-value');
    const x = (event.clientX * speed) / -100;
    const y = (event.clientY * speed) / 100;

    layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
  });
}

function mess(event) {
  event.preventDefault();
  let name = document.getElementById('name');
  let email = document.getElementById('email');
  let phone = document.getElementById('phone');
  let message = document.getElementById('message');
  const success = document.getElementById('success');
  const fail = document.getElementById('fail');

  if (name.value === '' || email.value === '' || phone.value === '' || message.value === '') {
    fail.style.display = 'block';
  } else {
    setTimeout(() => {
      success.style.display = 'block';
      name.value = '';
      email.value = '';
      phone.value = '';
      message.value = '';
    }, 2000);
  }
  setTimeout(() => {
    fail.style.display = 'none';
    success.style.display = 'none';
  }, 4000);
}

document.getElementById('year').innerText = new Date().getFullYear();