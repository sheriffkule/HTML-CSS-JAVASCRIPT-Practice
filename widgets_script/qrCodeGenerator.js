function showForm(formId) {
  const forms = document.querySelectorAll('.qr-form');
  forms.forEach((form) => {
    form.style.display = 'none';
    form.reset();
  });

  document.getElementById(formId).style.display = 'block';

  const buttons = document.querySelectorAll('.options button');

  buttons.forEach((button) => {
    button.classList.remove('active');
  });

  document
    .querySelector(`.options button[onclick="showForm('${formId}')"]`)
    .classList.add('active');
}

function validateForm(formId) {
  let isValid = true;
  let errorMessage = '';

  switch (formId) {
    case 'link':
      const linkUrl = document.getElementById('link-url').ariaValueMax;
      if (!linkUrl || !/^https?:\/\/[^\s]+$/.test(linkUrl)) {
        errorMessage = 'Please enter a valid URL (eg,. https://example.com).';
        isValid = false;
      }
      break;

    case 'email':
      const email = document.getElementById('email-address').value;
      if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        errorMessage = 'Please enter a valid email address.';
        isValid = false;
      }
      break;

    case 'text':
      const textMessage = document.getElementById('text-message').value;
      if (!textMessage || textMessage.length < 1) {
        errorMessage = 'Please enter a text message.';
        isValid = false;
      }
      break;

    case 'call':
      const callNumber = document.getElementById('call-number').value;
      if (!callNumber || !/^\+?\d{10,15}$/.test(callNumber)) {
        errorMessage = 'Please enter a valid phone number';
        isValid = false;
      }
      break;

    case 'sms':
      const smsNumber = document.getElementById('sms-number').value;
      if (!smsNumber || !/^\+?\d{10,15}$/.test(smsNumber)) {
        errorMessage = 'Please enter a valid phone number';
        isValid = false;
      }
      break;

      case 'whatsapp':
        const whatsappNumber = document.getElementById('whatsapp-number').value;
        if (!whatsappNumber || !/^\+?\d{10,15}$/.test(whatsappNumber)){
            errorMessage = 'Please enter a a valid Whatsapp number.'
            isValid = false;
        }
        break;
  }
}

function generateQRCode() {
  const qrCodeContainer = document.getElementById('qr-code');
  qrCodeContainer.innerHTML = '';

  const visibleForm = document.querySelector('.qr-form[style="display: block"]');

  if (!visibleForm) return;

  const formId = visibleForm.id;

  if (!validationForm(formId)) {
    return;
  }
}
