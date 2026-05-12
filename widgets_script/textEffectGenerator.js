document.addEventListener('DOMContentLoaded', function () {
  const textPreview = document.getElementById('text-preview');
  const textInput = document.getElementById('text-input');
  const fontFamily = document.getElementById('font-family');
  const fontSize = document.getElementById('font-size');
  const fontSizeValue = document.getElementById('font-size-value');
  const textColor = document.getElementById('text-color');
  const bgColor = document.getElementById('bg-color');
  const shadowColor = document.getElementById('shadow-color');
  const shadowHOffset = document.getElementById('shadow-h-offset');
  const shadowHOffsetValue = document.getElementById('shadow-h-offset-value');
  const shadowVOffset = document.getElementById('shadow-v-offset');
  const shadowVOffsetValue = document.getElementById('shadow-v-offset-value');
  const shadowBlur = document.getElementById('shadow-blur');
  const shadowBlurValue = document.getElementById('shadow-blur-value');
  const shadowOpacity = document.getElementById('shadow-opacity');
  const shadowOpacityValue = document.getElementById('shadow-opacity-value');
  const shadowMultiple = document.getElementById('shadow-multiple');
  const gradientType = document.getElementById('gradient-type');
  const gradientAngle = document.getElementById('gradient-angle');
  const gradientAngleValue = document.getElementById('gradient-angle-value');
  const outlineColor = document.getElementById('outline-color');
  const outlineWidth = document.getElementById('outline-width');
  const outlineWidthValue = document.getElementById('outline-width-value');
  const outlineStyle = document.getElementById('outline-style');
  const animationType = document.getElementById('animation-type');
  const animationDuration = document.getElementById('animation-duration');
  const animationDurationValue = document.getElementById('animation-duration-value');
  const animationIteration = document.getElementById('animation-iteration');
  const animationColor = document.getElementById('animation-color');
  const animationColorGroup = document.getElementById('animation-color-group');
  const adGradientColorBtn = document.getElementById('add-gradient-color');
  const removeGradientColorBtn = document.getElementById('remove-gradient-color');
  const copyCssBtn = document.getElementById('copy-css');
  const downloadImgBtn = document.getElementById('download-img');
  const cssOutput = document.getElementById('css-output');
  const tooltip = document.querySelector('.tooltip');
  const themeSwitch = document.getElementById('theme-switch');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  // Tab functionality
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');

      // Remove active class from all buttons and contents
      tabBtns.forEach((b) => b.classList.remove('active'));
      tabContents.forEach((c) => c.classList.remove('active'));

      // Add active class to clicked button and corresponding content
      btn.classList.add('active');
      document.getElementById(`${tabId}-tab`).classList.add('active');
    });
  });

  // Initialize gradient colors array
  let gradientColors = [
    { color: '#ff0000', stop: 0 },
    { color: '#ffff00', stop: 50 },
    { color: '#00ff00', stop: 100 },
  ];

  // Update gradient colors UI
  function updateGradientColorsUI() {
    const gradientColorsContainer = document.querySelector('.gradient-colors');
    gradientColorsContainer.innerHTML = '';

    gradientColors.forEach((colorObj, index) => {
      const colorDiv = document.createElement('div');
      colorDiv.className = 'gradient-color';

      const colorInput = document.createElement('input');
      colorInput.type = 'color';
      colorInput.id = `gradient-color-${index + 1}`;
      colorInput.value = colorObj.color;

      const stopInput = document.createElement('input');
      stopInput.type = 'range';
      stopInput.className = 'gradient-stop';
      stopInput.min = '0';
      stopInput.max = '100';
      stopInput.value = colorObj.stop;
    });
  }

  document.querySelectorAll('input[type="range"]').forEach((input) => {
    const updateTrack = () => {
      const val = ((input.value - input.min) / (input.max - input.min)) * 100;
      input.style.backgroundImage = `linear-gradient(to right, var(--primary), var(--success) ${val}%,
      var(--secondary) ${val}%)`;
    };
    input.addEventListener('input', updateTrack);
    updateTrack();
  });
});
