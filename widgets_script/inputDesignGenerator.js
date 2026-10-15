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
});
