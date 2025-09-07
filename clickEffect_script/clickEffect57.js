class Toast {
  constructor() {
    this.timeToHide = 3000;
    this.showCloseBtn = true;
    this.showProgress = true;
    this.autoClose = true;
  }

  createWrapper(position) {
    let wrapper = document.querySelector('.toasts-wrapper');
    if (!wrapper) {
      wrapper = document.createElement('div');
      wrapper.classList.add('toasts-wrapper');
      wrapper.classList.add(position);
    }
    return wrapper;
  }

  createToast(message, type) {
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.classList.add(type);

    let icon = '';
    if (type === 'success') {
      icon = 'fas fa-check-circle';
    } else if (type === 'info') {
      icon = 'fas fa-info-circle';
    } else if (type === 'warning') {
      icon = 'fas fa-exclamation-circle';
    } else {
      icon = 'fas fa-exclamation-triangle';
    }

    let html = `
      <div class="icon">
        <i class="${icon}"></i>
      </div>
      <div class="body">
        <p class="msg">${message}</p>
      </div>
    `;

    if (this.showCloseBtn) {
      html += `
        <div class="close">
          <i class="fas fa-times"></i>
        </div>
      `;
    }

    if (this.showProgress) {
      html += `
        <div class="progress">
          <div class="bar"></div>
        </div>
      `;
    }

    toast.innerHTML = html;

    return toast;
  }

  show(message, type, position) {
    const wrapper = this.createWrapper(position);
    const toast = this.createToast(message, type);
    wrapper.appendChild(toast);
    document.body.appendChild(wrapper);

    setTimeout(() => {
      toast.classList.add('show');
    }, 200);

    if (this.autoClose) {
      setTimeout(() => {
        this.removeToast(toast);
      }, this.timeToHide);
    }

    if (this.showProgress) {
      this.progressToast(toast);
    }

    if (this.showCloseBtn) {
      this.closeOnCross(toast);
    }
  }

  progressToast(toast) {
    const bar = toast.querySelector('.bar');
    let width = 0;
    const id = setInterval(() => {
      if (width > 100) {
        clearInterval(id);
      } else {
        width++;
        bar.style.width = width + '%';
      }
    }, this.timeToHide / 100);
  }

  removeToast(toast) {
    toast.classList.remove('show');

    setTimeout(() => {
      toast.remove();
      this.removeWrapper();
    }, 500);
  }

  removeWrapper() {
    const wrapper = document.querySelector('.toasts-wrapper');
    if (wrapper) {
      const toasts = wrapper.querySelectorAll('.toast');
      if (toasts.length === 0) {
        wrapper.remove();
      }
    }
  }

  closeOnCross(toast) {
    const cross = toast.querySelector('.close');
    cross.addEventListener('click', () => {
      this.removeToast(toast);
    });
  }
}

const toast = new Toast();

const btns = document.querySelectorAll('.btn');
const positionRadios = document.querySelectorAll('input[type="radio"][name="query"]');

function getSelectedPosition() {
  const checked = document.querySelector('input[type="radio"][name="query"]:checked');
  if (!checked) return 'top-left';
  switch (checked.id) {
    case 'top-left':
      return 'top-left';
    case 'top-right':
      return 'top-right';
    case 'bottom-left':
      return 'bottom-left';
    case 'bottom-right':
      return 'bottom-right';
    default:
      return 'top-left';
  }
}

btns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const type = e.target.dataset.type;
    const message = e.target.dataset.message;
    const position = getSelectedPosition();
    toast.show(message, type, position);
  });
});
