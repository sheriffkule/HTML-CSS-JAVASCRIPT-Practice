document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const buttonText = document.getElementById('buttonText');
  const buttonWidth = document.getElementById('buttonWidth');
  const buttonHeight = document.getElementById('buttonHeight');
  const bgColor = document.getElementById('bgColor');
  const textColor = document.getElementById('textColor');
  const borderColor = document.getElementById('borderColor');
  const borderRadius = document.getElementById('borderRadius');
  const borderWidth = document.getElementById('borderWidth');
  const addShadow = document.getElementById('addShadow');
  const hoverEffect = document.getElementById('hoverEffect');
  const pulseAnimation = document.getElementById('pulseAnimation');
  const addIcon = document.getElementById('addIcon');
  const iconSelect = document.getElementById('iconSelect');
  const generatedButton = document.getElementById('generatedButton');
  const htmlCode = document.getElementById('htmlCode');
  const cssCode = document.getElementById('cssCode');
  const jsCode = document.getElementById('jsCode');
  const codeTabs = document.querySelectorAll('.code-tab');
  const copyBtn = document.getElementById('copyBtn');
  const toast = document.getElementById('toast');

  // Update button preview when any input changes
  const inputs = document.querySelectorAll('input, select');
  inputs.forEach((input) => {
    input.addEventListener('input', updateButton);
  });

  addIcon.addEventListener('change', function () {
    iconSelect.style.display = this.checked ? 'block' : 'none';
    updateButton();
  });

  // Code tab switching
  codeTabs.forEach((tab) => {
    tab.addEventListener('click', function () {
      codeTabs.forEach((t) => t.classList.remove('active'));
      this.classList.add('active');

      document.querySelectorAll('.code-content pre').forEach((pre) => {
        pre.style.display = 'none';
      });

      if (this.textContent === 'HTML') {
        htmlCode.style.display = 'block';
      } else if (this.textContent === 'CSS') {
        cssCode.style.display = 'block';
      } else if (this.textContent === 'JavaScript') {
        jsCode.style.display = 'block';
      }
    });
  });

  // Copy code to clipboard
  copyBtn.addEventListener('click', function () {
    let codeToCopy;
    if (document.querySelector('.code-tab.active').textContent === 'HTML') {
      codeToCopy = htmlCode.querySelector('code').textContent;
    } else if (document.querySelector('code-tab.active').textContent === 'CSS') {
      codeToCopy = cssCode.querySelector('code').textContent;
    } else {
      codeToCopy = jsCode.querySelector('code').textContent;
    }

    navigator.clipboard.writeText(codeToCopy).then(() => {
      showToast();
    });
  });

  // Update button and code
  function updateButton() {
    const text = buttonText.value;
    const width = buttonWidth.value;
    const height = buttonHeight.value;
    const bg = bgColor.value;
    const textCol = textColor.value;
    const borderCol = borderColor.value;
    const radius = borderRadius.value;
    const bWidth = borderWidth.value;
    const shadow = addShadow.checked;
    const hover = hoverEffect.checked;
    const pulse = pulseAnimation.checked;
    const icon = addIcon.checked;
    const iconClass = iconSelect.value;

    // Apply styles to button
    generatedButton.textContent = text;
    generatedButton.style.width = `${width}px`;
    generatedButton.style.height = `${height}px`;
    generatedButton.style.backgroundColor = bg;
    generatedButton.style.color = textCol;
    generatedButton.style.border = `${bWidth}px solid ${borderCol}`;
    generatedButton.style.borderRadius = `${radius}px`;
    generatedButton.fontSize = `${Math.min(16, height / 3)}px`;

    // Reset hover effects
    generatedButton.style.transform = '';
    generatedButton.style.filter = '';

    // Add shadow if checked
    if (shadow) {
      generatedButton.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    } else {
      generatedButton.style.boxShadow = 'none';
    }

    // Add icon if checked
    if (icon) {
      generatedButton.innerHTML = `<i class="fas ${iconClass}"></i> ${text}`;
    }

    pulse ? generatedButton.classList.add('pulse') : generatedButton.classList.remove('pulse');
  }
});
