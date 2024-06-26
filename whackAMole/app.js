const square = document.querySelectorAll('.square');
const mole = document.querySelectorAll('.mole');
const timeLeft = document.querySelector('#time-left');
let score = document.querySelector('#score');

let result = 0;
let currentTime = timeLeft.textContent;


function randomSquare() {
    square.forEach(className => {
        className.classList.remove('mole');
    })
    let randomPosition = square[Math.floor(Math.random() * 9)]
    randomPosition.classList.add('mole');


    //asign the id of the randomPosition to hitPosition to use later 

    hitPosition = randomPosition.id
}

square.forEach(id => {
    id.addEventListener('mouseup', () => {
        if (id.id === hitPosition) {
            result = result + 1
            score.textContent = result
        }
    })
})

function moveMole() {
    let timerId = null;
    timerId = setInterval(randomSquare, 1000);
}


function countDown() {
    currentTime--
    timeLeft.textContent = currentTime;

    if(currentTime === 0) {
        clearInterval(timerId);
        alert('GAME OVER.  Your score is ' + result)
    }
}

let timerId = setInterval(countDown, 1000);


moveMole();

/* need to have mole stop moving at the end of the game. 
reset button instead of browser refresh.
style better! 
animations when game is over? 
keep track of previous games and new alert when highscore is beat.

