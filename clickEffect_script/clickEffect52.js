/**@type {IntersectionObserver} */

document.querySelectorAll('.faq-question').forEach((question) => {
  question.addEventListener('click', () => {
    const item = question.parentNode;
    const isActive = item.classList.contains('active');

    document.querySelectorAll('.faq-item').forEach((otherItem) => {
      otherItem.classList.remove('active');
    });

    if (!isActive) {
      item.classList.add('active');
    }
  });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    })
}, observerOptions)

document.querySelectorAll('.faq-item').forEach(item => {
    observer.observe(item)
    item.style.animationPlayState = 'paused'
})

document.getElementById('year').textContent = new Date().getFullYear()