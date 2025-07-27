// gsap.registerPlugin(SplitText);

document.addEventListener('DOMContentLoaded', () => {
  const profileImagesContainer = document.querySelector('.profile-images');
  const profileImages = document.querySelectorAll('.profile-images .img');
  const nameElements = document.querySelectorAll('.profile-names .name');
  const nameHeadings = document.querySelectorAll('.profile-names .name h1');

  nameHeadings.forEach((heading) => {
    const split = new SplitText(heading, { type: 'chars' });
    split.chars.forEach((char) => {
      char.classList.add('letter');
    });
  });

  const defaultLetters = nameElements[0].querySelectorAll('.letter');
  gsap.set(defaultLetters, { y: '100%' });

  if (window.innerWidth > 900) {
    profileImages.forEach((img, index) => {
      const correspondingName = nameElements[index + 1];
      const letters = correspondingName.querySelectorAll('.letter');

      gsap.set(letters, { y: '100%' });
      gsap.from(letters, {
        autoAlpha: 0,
      });


      img.addEventListener('mouseenter', () => {
        gsap.to(img, {
          width: 140,
          height: 140,
          duration: 0.5,
          ease: 'power4.out',
        });

        gsap.to(letters, {
          y: '-100%',
          ease: 'power4.out',
          duration: 0.75,
          stagger: {
            each: 0.025,
            from: 'center',
          },
          autoAlpha: 1,
        });
      });

      img.addEventListener('mouseleave', () => {
        gsap.to(img, {
          width: 70,
          height: 70,
          duration: 0.5,
          ease: 'power4.out',
        });

        gsap.to(letters, {
          y: '0%',
          ease: 'power4.out',
          duration: 0.75,
          stagger: {
            each: 0.025,
            from: 'center',
          },
          autoAlpha: 0,
        });
      });
    });

    profileImagesContainer.addEventListener('mouseenter', () => {
      gsap.to(defaultLetters, {
        y: '0%',
        ease: 'power4.out',
        duration: 0.75,
        stagger: {
          each: 0.025,
          from: 'center',
        },
      });
    });

    profileImagesContainer.addEventListener('mouseleave', () => {
      gsap.to(defaultLetters, {
        y: '100%',
        ease: 'power4.out',
        duration: 0.75,
        stagger: {
          each: 0.025,
          from: 'center',
        },
      });
    });
  }
});
