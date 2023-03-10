const gridDiv = document.querySelector('.grid');

for(i = 0; i < 100; i++){
    gridDiv.appendChild(document.createElement('div'))
}

document.addEventListener('DOMContentLoaded', () =>{
    const squares = document.querySelectorAll('.grid div');
    const scoreDisplay = document.querySelector('span');
    const startButton = document.querySelector('.start');

    const width = 10;
    let currentIndex = 0, 
        appleIndex = 0, 
        currentSnake = [2,1,0],
        direction = 1,
        score = 0,
        speed = 0.9,
        intervalTime = 0,
        interval = 0;


    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple');
        clearInterval(interval);
        score = 0;
        randomApple();
        direction = 1;
        scoreDisplay.innerText = score;
        intervalTime = 1000;
        currentSnake = [2, 1, 0];
        currentIndex = 0;
        currentSnake.forEach(index => squares[index].classList.add('snake'));
        interval = setInterval(moveOutcomes, intervalTime);
    }

    function moveOutcomes(){
        if((currentSnake[0] + width >= (width * width) && direction === width) ||
           (currentSnake[0] % width === width - 1 && direction === 1) ||
           (currentSnake[0] % width === 0 && direction === -1) ||
           (currentIndex[0] - width < 0 && direction === -width) ||
           squares[currentSnake[0] + direction].classList.contains('snake')){

            return clearInterval(interval);
        }

        const tail = currentSnake.pop();
        squares[tail].classList.remove('snake');
        currentSnake.unshift(currentSnake[0] + direction);

        if(squares[currentSnake[0]].classList.contains('apple')){
            squares[currentSnake[0]].classList.remove('apple');
            squares[tail].classList.add('snake');
            currentSnake.push(tail);
            randomApple()
            score++;
            scoreDisplay.textContent = score;
            clearInterval(interval);
            intervalTime = intervalTime * speed;
            interval = setInterval(moveOutcomes, intervalTime);
        }

        squares[currentSnake[0]].classList.add('snake');
    }

    function randomApple(){
        do{
            appleIndex = Math.floor(Math.random() * squares.length)
        } while(squares[appleIndex].classList.contains('snake'))
        squares[appleIndex].classList.add('apple');
    }

    function control(e) {
        squares[currentIndex].classList.remove('snake');

        if(e.keyCode === 39){
            direction = 1;
        }
        else if(e.keyCode === 38){
            direction = -width;
        }
        else if(e.keyCode === 37){
            direction = -1;
        }
        else if(e.keyCode === 40){
            direction = width; 
        }
    }

    document.addEventListener('keyup', control)
    startButton.addEventListener('click', startGame)
})