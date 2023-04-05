const container = document.querySelector('.container');

let xPosition = 0;
let yPosition = 0;
let lerp = 0.01;

function update() {
    xPosition += (targetX - xPosition) * lerp;
    yPosition += (targetY - yPosition) * lerp;

    container.style.backgroundPosition = `${xPosition}px ${yPosition}px`;


    requestAnimationFrame(update);
}

let targetX = 0;
let targetY = 0;

document.addEventListener('mousemove', (e) => {
    targetX = e.pageX;
    targetY = e.pageY;
});

update();