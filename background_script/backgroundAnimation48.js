let snowContainer = document.querySelector('.snow-container');

function createSnowFlake(){
    let snowflake = document.createElement('div');

    snowflake.classList.add('snowFlake');
    snowflake.textContent = '❄';
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.top = Math.random() * 100 + 'vh';
    snowflake.style.fontSize = `${Math.random() * 12 + 10}px`;
    snowflake.style.opacity = Math.random();
    snowflake.style.animationDuration = `${Math.random() * 12 + 18}s`;
    snowContainer.appendChild(snowflake);

    setTimeout(() => {
        snowflake.remove();
    }, 5000);
}
setInterval(createSnowFlake, 50);