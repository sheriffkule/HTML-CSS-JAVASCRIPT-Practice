class Toast {
  constructor() {}

  createWrapper(position) {
    let wrapper = document.querySelector('.toasts-wrapper');
    if (!wrapper) {
      wrapper = document.createElement('div');
      wrapper.classList.add('toasts-wrapper');
      wrapper.classList.add('position');
    }
    return wrapper;
  }

  createToast(message, type) {
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.classList.add('type');

    toast.innerHTML = ` 
      <div class="icon">
        <i class="fas fa-check-circle"></i>
      </div>
      <div class="body">
        <p class="msg">${message}</p>
      </div>
      <div class="close">
        <i class="fas fa-times"></i>
      </div>
      <div class="progress">
        <div class="bar"></div>
      </div>`;

    return toast;
  }

  show(message, type, position) {
    const wrapper = this.createWrapper(position);
    const toast = this.createToast(message, type);
    wrapper.appendChild(toast);
    document.appendChild(wrapper);
  }
}
