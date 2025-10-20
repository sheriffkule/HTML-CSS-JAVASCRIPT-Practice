const slices = document.querySelectorAll('.slice');

slices.forEach((slice) => {
  slice.addEventListener('mouseenter', () => {
    slices.forEach((s) => {
      s.classList.remove('active');
      slice.classList.add('active');
    });
  });
});
