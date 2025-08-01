const alertTemplates = {
  success: {
    title: 'Success',
    message: 'Your action has been completed successfully!',
    icon: '&checkmark;',
  },
  info: {
    title: 'Information',
    message: 'This is an informational message for your attention.',
    icon: '&#x2139;',
  },
  warning: {
    title: 'Warning',
    message: 'This action requires your attention before proceeding.',
    icon: '&#x26A0;',
  },
  error: {
    title: 'Error',
    message: 'An error occurred while processing your request.',
    icon: '&#x274C;',
  },
};

function showAlert(type) {
  const template = alertTemplates[type];
  const alertContainer = document.getElementById('alert-container');

  if (!template || !alertContainer) {
    console.error('Invalid alert type or alert container not found.');
    return;
  }

  if (alertContainer.children.length >= 5) {
    alertContainer.removeChild(alertContainer.lastElementChild);
  }

  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.innerHTML = `
    <div class="alert-icon">${template.icon}</div>
    <div class="alert-content">
      <div class="alert-title">${template.title}</div>
      <div class="alert-message">${template.message}</div>
    </div>
    <button class="alert-close" onclick="this.parentElement.remove()">&#x2715;</button>
    <div class="alert-progress"></div>
  `;

  setTimeout(() => {
    if (alert.parentNode) {
      alert.style.opacity = '0';
      setTimeout(() => alert.remove(), 300);
    }
  }, 5000);

  alertContainer.prepend(alert);
}
