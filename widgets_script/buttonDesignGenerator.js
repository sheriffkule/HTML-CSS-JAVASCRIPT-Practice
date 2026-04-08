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
      } else if (this.textContent === 'JS') {
        jsCode.style.display = 'block';
      }
    });
  });

  // Copy code to clipboard
  copyBtn.addEventListener('click', function () {
    let codeToCopy;
    const activeTab = document.querySelector('.code-tab.active');
    if (activeTab && activeTab.textContent === 'HTML') {
      codeToCopy = htmlCode.querySelector('code').textContent;
    } else if (activeTab && activeTab.textContent === 'CSS') {
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
    // Get hover effect value (should be a string, not boolean)
    const hover = hoverEffect.value || (hoverEffect.checked ? 'grow' : '');
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
    } else {
      generatedButton.textContent = text;
    }

    pulse ? generatedButton.classList.add('pulse') : generatedButton.classList.remove('pulse');

    // Generate code
    generateCode(
      text,
      width,
      height,
      bg,
      textCol,
      borderCol,
      radius,
      bWidth,
      shadow,
      hover,
      pulse,
      icon,
      iconClass,
    );
  }

  function generateCode(
    text,
    width,
    height,
    bg,
    textCol,
    borderCol,
    radius,
    bWidth,
    shadow,
    hover,
    pulse,
    icon,
    iconClass,
  ) {
    // HTML Code
    let html = `<button class="custom-btn">${text}`;
    if (icon) html += ` <i class="fas ${iconClass}"></i>`;
    html += `</button>`;
    htmlCode.querySelector('code').textContent = html;

    // CSS Code
    let css = `.custom-btn {\n`;
    css += `    background: ${bg};\n`;
    css += `    color: ${textCol};\n`;
    css += `    border: ${bWidth}px solid ${borderCol};\n`;
    css += `    border-radius: ${radius}px;\n`;
    css += `    width: ${width}px;\n`;
    css += `    height: ${height}px;\n`;
    css += `    cursor: pointer;\n`;
    css += `    font-size: ${Math.min(16, height / 3)}px;\n`;
    css += `    transition: all 0.3s ease;\n`;

    if (shadow) css += `    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);\n`;

    if (pulse) css += `    animation: pulse 1.5s infinite;\n`;

    css += `}\n\n.custom-btn:hover {\n`;

    // Hover effects
    switch (hover) {
      case 'darken':
        css += `    background: ${darkenColor(bg, 20)};\n`;
        break;
      case 'lighten':
        css += `    background: ${lightenColor(bg, 20)};\n`;
        break;
      case 'grow':
        css += `    transform: scale(1.1);\n`;
        break;
      case 'shrink':
        css += `    transform: scale(0.9);\n`;
        break;
      case 'rotate':
        css += `    transform: rotate(5deg);\n`;
        break;
      default:
        // No additional hover effect
        break;
    }

    css += `}\n`;

    if (pulse) {
      css += `@keyframes pulse {\n`;
      css += `    0% { transform: scale(1); }\n`;
      css += `    50% { transform: scale(1.05); }\n`;
      css += `    100% { transform: scale(1); }\n`;
      css += `}\n`;
    }

    cssCode.querySelector('code').textContent = css;

    // JS Code (minimal for this example)
    let js = `// No JavaScript required for basic functionality\n`;
    js += `// For hover effects, include the CSS above`;
    const jsCodeBlock = jsCode.querySelector('code');
    if (jsCodeBlock) {
      jsCodeBlock.textContent = js;
    } else {
      jsCode.textContent = js;
    }
  }

  // Helper functions
  function darkenColor(color, percent) {
    // Simple darken function for hex colors
    // In a real app, use a proper color manipulation library
    return color;
  }

  function lightenColor(color, percent) {
    // Simple lighten function for hex colors
    // In a real app, use a proper color manipulation library
    return color;
  }

  function showToast() {
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // Initialize
  updateButton();

  // Update year in footer
  function updateYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('year');

    if (!yearElement) {
      console.error('Year element not found');
      return;
    }

    yearElement.setAttribute('datetime', currentYear.toString());
    yearElement.textContent = currentYear.toString();
  }
  updateYear();
});
