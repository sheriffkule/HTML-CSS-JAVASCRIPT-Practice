document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.getElementById('slider-container')
    const slider = document.getElementById('slider')
    const prevBtn = document.getElementById('prev-btn')
    const nextBtn = document.getElementById('next-btn')
    const progressBar = document.getElementById('progress-bar')
    const currentSlideElement = document.getElementById('current-slide')
    const totalSlidesElement = document.getElementById('total-slides')
    const dotsContainer = document.getElementById('slider-dots')

    let currentSlide = 0;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;
})