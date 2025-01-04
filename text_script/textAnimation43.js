function createSpark() {
    let spark = document.createElement('div');
    spark.classList.add('spark');

    let randomX = Math.random() * window.innerWidth;
    let randomY = Math.random() * window.innerHeight;
    spark.style.top = `${randomY}px`;
    spark.style.left = `${randomX}px`;
    spark.style.transform = 'scale('+ Math.random() * 4;
    spark.style.filter = 'hue-rotate(' + Math.random() * 360 + 'deg)';

    for(let i = 0; i <= 7; i++) {
        let span = document.createElement('span');
        span.style.transform = 'rotate('+ (i * 45) + 'deg)';
        spark.appendChild(span);
    }

    document.body.appendChild(spark);

    setTimeout(function() {
        spark.remove()
    }, 2000);
}

setInterval(createSpark, 200);