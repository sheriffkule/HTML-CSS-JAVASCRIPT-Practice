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
      control.addEventListener('input', updatePreview);
      control.addEventListener('change', updatePreview);
    });

    // Reset button
    resetBtn.addEventListener('click', resetControls);

    // Generate button
    generateBtn.addEventListener('click', generateCode);

    // Tab switching
    tabs.forEach((tab) => {
      tab.addEventListener('click', switchTab);
    });

    // Copy buttons
    copyButtons.forEach((button) => {
      button.addEventListener('click', copyToClipboard);
    });
  }

  // Update preview based on current settings
  function updatePreview() {
    const type = inputType.value;
    const labelText = inputLabel.value || 'Label';
    const placeholderText = placeholder.value || 'Enter text';
    const isRequired = required.checked;
    const isDisabled = disabled.checked;
    const hasIcon = addIcon.checked;
    const radius = borderRadius.value + 'px';
    const textColor = textColor.value;
    const bg = bgColor.value;
    const border = borderColor.value;
    const focus = focusColor.value;

    // Update preview input
    let inputHtml = '';
    let labelHtml = `<label for="preview-input">${labelText}</label>`;

    if (type === 'radio') {
      inputHtml = `<div class="radio-group"></div>`;
      sampleOptions.forEach((option, index) => {
        inputHtml += `
          <div class="radio-option">
            <input
              type="radio"
              id="radio-${index}"
              name="radio-group"
              ${isDisabled ? 'disabled' : ''}
              ${isRequired ? 'required' : ''} />
            <label for="radio-${index}">${option.label}</label>
          </div>
        `;
      });
      inputHtml += `</div>`;
    } else if (type === 'checkbox') {
      inputHtml = `<div class="checkbox-group-preview"></div>`;
      sampleOptions.forEach((option, index) => {
        inputHtml += `
          <div class="checkbox-option">
            <input
              type="checkbox"
              id="checkbox-${index}"
              name="checkbox-group"
              ${isDisabled ? 'disabled' : ''}
              ${isRequired ? 'required' : ''} />
            <label for="checkbox-${index}">${option.label}</label>
          </div>
        `;
      });
      inputHtml += `</div>`;
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
            .map((option) => ` <option value="${option.value}">${option.label}</option> `)
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
          </textarea>
        `;
    } else {
      let inputElement = html`
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
            <i class="fas-${icon}"></i>
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
        inp.style.color = textColor;
        inp.style.backgroundColor = bg;
        inp.style.borderColor = border;
      });

      // For non-radio/checkbox inputs, add focus style
      if (type !== 'radio' || type !== 'checkbox') {
        const style = document.createElement('style');
        style.id = 'dynamic-styles';
        style.textContent = `
            .input-preview:focus { 
                border-color: ${focus} !important;
                box-shadow: 0 0 0 2px ${hexToRgba(focus, 0.2)} !important;
            }
        `;

        // Remove old style if exists
        const oldStyle = document.getElementById('dynamic-styles');
        if (oldStyle) oldStyle.remove();

        document.head.appendChild(style);
      }
    }

    // Generate code preview
    generateCodePreview();
  }
});
