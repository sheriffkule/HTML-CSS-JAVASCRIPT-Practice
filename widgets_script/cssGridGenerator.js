// Changing colors on input type range track
document.querySelectorAll('input[type="range"]').forEach((input) => {
  const updateTrack = () => {
    const val = ((input.value - input.min) / (input.max - input.min)) * 100;
    input.style.backgroundImage = `linear-gradient(to right, var(--success), var(--primary) ${val}%,
      var(--light) ${val}%)`;
  };
  input.addEventListener('input', updateTrack);
  updateTrack();
});
