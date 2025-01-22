document.addEventListener('DOMContentLoaded', function () {
  const btn = document.querySelector('.btn');
  const sendIcon = document.querySelector('.send');
  const links = document.querySelector('.links');

  links.style.display = 'none';
  const closedDimensions = {
    width: btn.offsetWidth,
    height: btn.offsetHeight,
  };

  links.style.display = 'block';
  const openedDimensions = {
    width: btn.offsetWidth,
    height: btn.offsetHeight,
  };

  gsap.set(links, { autoAlpha: 0 });
  gsap.set(sendIcon, { autoAlpha: 1 });
  btn.style.width = `${closedDimensions.width}px`;
  btn.style.height = `${closedDimensions.height}px`;

  let isOpen = false;

  const toggleMenu = () => {
    const timelineSettings = isOpen
      ? { btnSize: closedDimensions, alpha1: 0, alpha2: 1, scaleValue: 1, marginTop: 0 }
      : {
          btnSize: openedDimensions,
          alpha1: 1,
          alpha2: 0,
          scaleValue: 0,
          marginTop: -btn.offsetHeight / 6,
        };

    const tl = gsap.timeline();
    tl.to(btn, {
      duration: 0.25,
      width: `${timelineSettings.btnSize.width}px`,
      height: `${timelineSettings.btnSize.height}px`,
      ease: 'elastic.out',
    })
      .to(
        sendIcon,
        {
          duration: 0.125,
          autoAlpha: timelineSettings.alpha2,
          scale: timelineSettings.scaleValue,
          marginTop: timelineSettings.marginTop,
        },
        0
      )
      .to(
        links,
        {
          duration: 0.25,
          autoAlpha: timelineSettings.alpha1,
          delay: isOpen ? -0.2 : 0.125,
        },
        0
      );

      isOpen = !isOpen;
  };

  btn.addEventListener('click', toggleMenu);
  links.querySelectorAll('.link a').forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        if(isOpen) toggleMenu();
    })
  })
});