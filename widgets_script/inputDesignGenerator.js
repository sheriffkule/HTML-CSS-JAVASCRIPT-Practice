document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const inputType = document.getElementById('input-type');
  const inputLabel = document.getElementById('input-label');
  const placeholder = document.getElementById('placeholder');
  const required = document.getElementById('required');
  const disabled = document.getElementById('disabled');
  const addIcon = document.getElementById('icon');
  const borderRadius = document.getElementById('border-radius');
  const textColor = document.getElementById('text-color');
  const bgColor = document.getElementById('bg-color');
  const borderColor = document.getElementById('border-color');
  const focusColor = document.getElementById('focus-color');
  const resetBtn = document.getElementById('reset-btn');
  const generateBtn = document.getElementById('generate-btn');
  const previewInput = document.getElementById('preview-input');
  const previewForm = document.querySelector('.preview-form');
  const htmlCode = document.getElementById('html-code');
  const cssCode = document.getElementById('css-code');
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');
  const copyButtons = document.querySelectorAll('.copy-btn');
  const toast = document.getElementById('toast');

  // Sample options for select, radio, and checkbox inputs
  const sampleOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  // Initialize the app
  function init() {
    updatePreview();
    setupEventListeners();
  }

  // Set up event listeners
  function setupEventListeners() {
    // Input customization controls
    const controls = [
      inputType,
      inputLabel,
      placeholder,
      required,
      disabled,
      addIcon,
      borderRadius,
      textColor,
      bgColor,
      borderColor,
      focusColor,
    ];

    controls.forEach((control) => {
      if (!control) return;
      control.addEventListener('input', updatePreview);
      control.addEventListener('change', updatePreview);
    });

    if (resetBtn) resetBtn.addEventListener('click', resetControls);
    if (generateBtn) generateBtn.addEventListener('click', generateCode);

    tabs.forEach((tab) => {
      tab.addEventListener('click', switchTab);
    });

    copyButtons.forEach((button) => {
      if (button) button.addEventListener('click', copyToClipboard);
    });
  }

  // Update preview based on current settings
  function updatePreview() {
    const type = inputType.value;
    const labelText = escapeHtml(inputLabel.value || 'Label');
    const placeholderText = escapeHtml(placeholder.value || 'Enter text');
    const isRequired = required.checked;
    const isDisabled = disabled.checked;
    const hasIcon = addIcon.checked;
    const radius = borderRadius.value + 'px';
    const textColorVal = textColor.value;
    const bg = bgColor.value;
    const border = borderColor.value;
    const focus = focusColor.value;

    // Update preview input
    let inputHtml = '';
    let labelHtml = `<label for="preview-input">${labelText}</label>`;

    if (type === 'radio') {
      inputHtml = '<div class="radio-group">';
      sampleOptions.forEach((option, index) => {
        inputHtml += `
          <div class="radio-option">
            <input
              type="radio"
              id="radio-${index}"
              name="radio-group"
              ${isDisabled ? 'disabled' : ''}
              ${isRequired ? 'required' : ''} />
            <label for="radio-${index}">${escapeHtml(option.label)}</label>
          </div>
        `;
      });
      inputHtml += '</div>';
    } else if (type === 'checkbox') {
      inputHtml = '<div class="checkbox-group-preview">';
      sampleOptions.forEach((option, index) => {
        inputHtml += `
          <div class="checkbox-option">
            <input
              type="checkbox"
              id="checkbox-${index}"
              name="checkbox-group"
              ${isDisabled ? 'disabled' : ''}
              ${isRequired ? 'required' : ''} />
            <label for="checkbox-${index}">${escapeHtml(option.label)}</label>
          </div>
        `;
      });
      inputHtml += '</div>';
    } else if (type === 'select') {
      inputHtml = `
        <select
          name="select-group"
          id="preview-input"
          class="input-preview"
          ${isDisabled ? 'disabled' : ''}
          ${isRequired ? 'required' : ''}>
          <option value="" disabled selected>${placeholderText || 'Select an option'}</option>
          ${sampleOptions
            .map((option) => ` <option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option> `)
            .join('')}
        </select>
      `;
    } else if (type === 'textarea') {
      inputHtml = `
          <textarea
            id="preview-input"
            class="input-preview"
            placeholder="${placeholderText}"
            ${isDisabled ? 'disabled' : ''}
            ${isRequired ? 'required' : ''}
          ></textarea>
        `;
    } else {
      let inputElement = `
        <input
          type="${type}"
          id="preview-input"
          class="input-preview"
          placeholder="${placeholderText}"
          ${isDisabled ? 'disabled' : ''}
          ${isRequired ? 'required' : ''} />
      `;

      if (hasIcon) {
        const icon =
          type === 'password'
            ? 'fa-lock'
            : type === 'email'
              ? 'fa-envelope'
              : type === 'number'
                ? 'fa-hashtag'
                : type === 'tel'
                  ? 'fa-phone'
                  : type === 'date'
                    ? 'fa-calendar'
                    : type === 'time'
                      ? 'fa-clock'
                      : 'fa-user';
        inputElement = `
          <div class="input-icon">
            <i class="fas ${icon}"></i>
            ${inputElement}
          </div>
        `;
      }

      inputHtml = inputElement;
    }

    // Update the preview form
    previewForm.innerHTML = ` <div class="form-row">${labelHtml} ${inputHtml}</div> `;

    // Apply styles to the preview input
    const input =
      document.getElementById('preview-input') ||
      document.querySelector('.input-preview') ||
      document.querySelector('.radio-group input') ||
      document.querySelector('.checkbox-group-preview input');

    if (input) {
      const inputs = document.querySelectorAll(
        '.input-preview, .radio-group input, .checkbox-group-preview input, select.input-preview, textarea.input-preview',
      );

      inputs.forEach((inp) => {
        inp.style.borderRadius = radius;
        inp.style.color = textColorVal;
        inp.style.backgroundColor = bg;
        inp.style.borderColor = border;
      });

      if (type !== 'radio' && type !== 'checkbox') {
        const style = document.createElement('style');
        style.id = 'dynamic-styles';
        style.textContent = `
            .input-preview:focus { 
                border-color: ${focus} !important;
                box-shadow: 0 0 0 2px ${hexToRgba(focus, 0.2)} !important;
            }
        `;

        const oldStyle = document.getElementById('dynamic-styles');
        if (oldStyle) oldStyle.remove();

        document.head.appendChild(style);
      }
    }

    // Generate code preview
    generateCodePreview();
  }

  // Generate HTML and CSS code preview
  function generateCodePreview() {
    const type = inputType.value;
    const labelText = escapeHtml(inputLabel.value || 'Label');
    const placeholderText = escapeHtml(placeholder.value || 'Enter text');
    const isRequired = required.checked;
    const isDisabled = disabled.checked;
    const hasIcon = addIcon.checked;
    const radius = borderRadius.value + 'px';
    const textColorVal = textColor.value;
    const bg = bgColor.value;
    const border = borderColor.value;
    const focus = focusColor.value;

    // Generate HTML code
    let html = '';
    let css = '';

    if (type === 'radio') {
      html = `<div class="form-group">\n    <label>${labelText}</label>\n   <div class="radio-group">`;
      sampleOptions.forEach((option, index) => {
        html += `\n    <div class="radio-option">\n        <input type="radio" id="radio-${index}" name="radio-group" ${isDisabled ? 'disabled' : ''} ${isRequired ? 'required' : ''} />\n        <label for="radio-${index}">${option.label}</label>\n    </div>`;
      });
      html += `\n   </div>\n</div>`;

      css = `.radio-group {
display: flex;
gap: 15px;
margin-top: 8px;
}

.radio-option {
display: flex;
align-items: center;
gap: 5px;
}

.radio-option input[type="radio"] {
accent-color: ${focus};
width: 16px;
height: 16px;
}`;
    } else if (type === 'checkbox') {
      html = `<div class="form-group">\n    <label>${labelText}</label>\n   <div class="checkbox-group">`;
      sampleOptions.forEach((option, index) => {
        html += `\n    <div class="checkbox-option">\n        <input type="checkbox" id="checkbox-${index}" ${isDisabled ? 'disabled' : ''} ${isRequired ? 'required' : ''} />\n        <label for="checkbox-${index}">${option.label}</label>\n    </div>`;
      });
      html += `\n   </div>\n</div>`;

      css = `.checkbox-group {
display: flex;
gap: 15px;
margin-top: 8px;
}

.checkbox-option {
display: flex;
align-items: center;
gap: 5px;
}

.checkbox-option input[type="checkbox"] {
accent-color: ${focus};
width: 16px;
height: 16px;
}`;
    } else if (type === 'select') {
      html = `<div class="form-group">\n    <label for="custom-select">${labelText}</label>\n    <select id="custom-select" class="custom-input" ${isDisabled ? 'disabled' : ''} ${isRequired ? 'required' : ''}>\n        <option value="" disabled selected>${placeholderText || 'Select an option'}</option>`;
      sampleOptions.forEach((option) => {
        html += `\n        <option value="${option.value}">${option.label}</option>`;
      });
      html += `\n    </select>\n</div>`;

      css = `.custom-input {
width: 100%;
padding: 12px 15px;
border: 1px solid ${border};
border-radius: ${radius};
font-size: 1rem;
color: ${textColorVal};
background-color: ${bg};
transition: all 0.3s ease;
}

.custom-input:focus {
border-color: ${focus};
box-shadow: 0 0 0 2px ${hexToRgba(focus, 0.2)};
outline: none;
}`;
    } else if (type === 'textarea') {
      html = `<div class="form-group">\n    <label for="custom-textarea">${labelText}</label>\n    <textarea id="custom-textarea" class="custom-input" placeholder="${placeholderText}" ${isDisabled ? 'disabled' : ''} ${isRequired ? 'required' : ''}></textarea>\n</div>`;

      css = `.custom-input {
width: 100%;
padding: 12px 15px;
border: 1px solid ${border};
border-radius: ${radius};
font-size: 1rem;
color: ${textColorVal};
background-color: ${bg};
transition: all 0.3s ease;
min-height: 100px;
resize: vertical;
}

.custom-input:focus {
border-color: ${focus};
box-shadow: 0 0 0 2px ${hexToRgba(focus, 0.2)};
outline: none;
}`;
    } else {
      let inputHtml = '';
      let iconCss = '';

      if (hasIcon) {
        const icon =
          type === 'password'
            ? 'fa-lock'
            : type === 'email'
              ? 'fa-envelope'
              : type === 'number'
                ? 'fa-hashtag'
                : type === 'tel'
                  ? 'fa-phone'
                  : type === 'date'
                    ? 'fa-calendar'
                    : type === 'time'
                      ? 'fa-clock'
                      : 'fa-user';

        inputHtml = `<div class="input-icon">\n    <i class="fas ${icon}"></i>\n    <input type="${type}" id="custom-input" class="custom-input" placeholder="${placeholderText}" ${isDisabled ? 'disabled' : ''} ${isRequired ? 'required' : ''} />\n</div>`;

        iconCss = `.input-icon {
position: relative;
}

.input-icon i {
position: absolute;
top: 50%;
left: 10px;
transform: translateY(-50%);
color: #6c757d;
}

.input-icon .custom-input {
padding-left: 35px;
}`;
      } else {
        inputHtml = `<input type="${type}" id="custom-input" class="custom-input" placeholder="${placeholderText}" ${isDisabled ? 'disabled' : ''} ${isRequired ? 'required' : ''} />`;
      }

      html = `<div class="form-group">\n    <label for="custom-input">${labelText}</label>\n    ${inputHtml}\n</div>`;

      css = `.custom-input {
width: 100%;
padding: 12px 15px;
border: 1px solid ${border};
border-radius: ${radius};
font-size: 1rem;
color: ${textColorVal};
background-color: ${bg};
transition: all 0.3s ease;
}

.custom-input:focus {
border-color: ${focus};
box-shadow: 0 0 0 2px ${hexToRgba(focus, 0.2)};
outline: none;
}

${iconCss}`;
    }

    // Update code panels
    htmlCode.textContent = highlightSyntax(html, 'html');
    cssCode.textContent = highlightSyntax(css, 'css');
  }

  // Generate final code
  function generateCode() {
    generateCodePreview();
    const htmlTab = document.querySelector('.tab[data-tab="html"]');
    if (htmlTab) switchTab({ currentTarget: htmlTab });
    showToast('Code generated! Switch between tabs to view HTML/CSS.');
  }

  // Reset controls to default values
  function resetControls() {
    inputType.value = 'text';
    inputLabel.value = 'Username';
    placeholder.value = 'Enter your username';
    required.checked = true;
    disabled.checked = false;
    addIcon.checked = false;
    borderRadius.value = '8';
    textColor.value = '#1a1a2e';
    bgColor.value = '#ffffff';
    borderColor.value = '#ced4da';
    focusColor.value = '#4361ee';

    updatePreview();
    showToast('Controls reset to default values.');
  }

  // Switch between tabs
  function switchTab(e) {
    const tab = e.currentTarget;
    const tabId = tab.getAttribute('data-tab');

    // Update active tab
    tabs.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');

    // Update active content
    tabContents.forEach((content) => {
      content.classList.remove('active');
      if (content.id === `${tabId}-tab`) {
        content.classList.add('active');
      }
    });
  }

  // Copy code to clipboard
  function copyToClipboard(e) {
    const targetId = e.currentTarget.getAttribute('data-target');
    const codeElement = document.getElementById(targetId);
    const text = codeElement ? codeElement.textContent : '';

    if (!text) {
      showToast('Nothing to copy.');
      return;
    }

    if (!navigator.clipboard || !window.isSecureContext) {
      showToast('Clipboard access is unavailable on this page.');
      return;
    }

    navigator.clipboard
      .writeText(text)
      .then(() => {
        showToast('Code copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
        showToast('Failed to copy code.');
      });
  }

  function escapeHtml(value = '') {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Helper function to convert hex to rgba
  function hexToRgba(hex, alpha) {
    if (!hex || typeof hex !== 'string') {
      return `rgba(0, 0, 0, ${alpha})`;
    }

    const normalizedHex = hex.trim();
    const cleanedHex = normalizedHex.startsWith('#') ? normalizedHex.slice(1) : normalizedHex;
    if (!/^[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(cleanedHex)) {
      return `rgba(0, 0, 0, ${alpha})`;
    }

    const fullHex = cleanedHex.length === 3 ? cleanedHex.split('').map((char) => char + char).join('') : cleanedHex;
    const r = parseInt(fullHex.slice(0, 2), 16);
    const g = parseInt(fullHex.slice(2, 4), 16);
    const b = parseInt(fullHex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // Simple syntax highlighting function (basic)
  function highlightSyntax(code, type) {
    if (type === 'html') {
      return code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"(.*?)"/g, '&quot;<span class="code-value">"$1"</span>&quot;')
        .replace(
          /\b(class|id|for|type|placeholder|disabled|required)=/g,
          '<span class="code-attr">$1</span>=',
        )
        .replace(/\b(div|label|input|select|textarea|option)\b/g, '<span class="code-tag">&lt;$1&gt;</span>');
    } else if (type === 'css') {
      return code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/([^{}]+)(?={)/g, '<span class="selector">$1</span>')
        .replace(/([a-zA-Z-]+)(?=:)/g, '<span class="property">$1</span>:')
        .replace(/(:)(.*?)(?=;)/g, '$1<span class="value">$2</span>$3');
    }
    return code;
  }

  // Show toast notification
  function showToast(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // Initialize the app
  init();
});
