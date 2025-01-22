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
  
  document.querySelector(`.options button[onclick="showForm('${formId}')"]`).classList.add('active');
}
