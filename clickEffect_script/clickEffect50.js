document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');
  const customMenu = document.querySelector('.custom-menu');
  const contextDisabler = document.querySelector('.context-disabler');
  let mouseX = 0;
  let mouseY = 0;
  let posX = 0;
  let posY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateFollower() {
    posX += (mouseX - posX) / 6;
    posY += (mouseY - posY) / 6;

    follower.style.left = posX + 'px';
    follower.style.top = posY + 'px';

    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  document.addEventListener('click', (e) => {
    const clickEffect = document.createElement('div');
    clickEffect.className = 'click-effect';
    clickEffect.style.left = e.clientX + 'px';
    clickEffect.style.top = e.clientY + 'px';
    document.body.appendChild(clickEffect);

    setTimeout(() => {
      clickEffect.remove();
    }, 500);

    if (!customMenu.contains(e.target)) {
      closeMenu();
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    customMenu.style.left = e.clientX + 'px';
    customMenu.style.top = e.clientY + 'px';
    customMenu.classList.add('active');

    contextDisabler.style.display = 'block';
  });

  document.addEventListener('click', closeMenu);

  function closeMenu() {
    customMenu.classList.remove('active');
    contextDisabler.style.display = 'none';
  }

  document.querySelectorAll('.menu-item').forEach((item) => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      alert(`You clicked on ${item.textContent.trim()}`);
      closeMenu();
    });
  });

  const clickables = document.querySelectorAll('a, button, .menu-item');
  clickables.forEach((el) => {
    el.addEventListener('mouseover', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursor.style.backgroundColor = 'rgba(255, 77, 255, 0.7)';
      follower.style.borderColor = 'rgba(255, 166, 255, 0.8)';
      follower.style.transform = 'translate(-50%, -50%) scale(1.3)';
    });

    el.addEventListener('mouseover', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursor.style.backgroundColor = 'rgba(255, 77, 255, 0.7)';
      follower.style.borderColor = 'rgba(255, 166, 255, 0.8)';
      follower.style.transform = 'translate(-50%, -50%) scale(1.3)';
    });

    el.addEventListener('mouseout', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.backgroundColor = 'rgba(255, 166, 255, 0.7)';
      follower.style.borderColor = 'rgba(255, 77, 255, 0.6)';
      follower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });
});
