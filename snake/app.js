document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')

    const width = 10
    let currentIndex = 0 //first div in the grid
    let appleIndex = 0 //first div in the grid
    let currentSnake = [2, 1, 0] //body of the snake(2 is HEAD, 0 being TAIL)
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0

    //to start and restart 
    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        randomApple()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 1000
        currentSnake = [2, 1, 0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)
    }

    //function that handles all outcomes of the snake 
    function moveOutcomes() {
        //snake hitting border and hitting self
        if (
            (currentSnake[0] + width >= (width * width) && direction === width) || //snakes hits bottom border
            (currentSnake[0] % width === width - 1 && direction === 1) || //snake hits right border
            (currentSnake[0] % width === 0 && direction === -1) || //snake hits left border
            (currentSnake[0] - width < 0 && direction === -width) ||//snake hits top border
            squares[currentSnake[0] + direction].classList.contains('snake')
        ) {
            return clearInterval(interval)
        }
        const tail = currentSnake.pop()
        squares[tail].classList.remove('snake') //removes class of snake from the tail
        currentSnake.unshift(currentSnake[0] + direction) //gives direction to head of the array 


        //snake gets apple
        if (squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple')
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            randomApple()
            score++
            scoreDisplay.textConent = score
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutcomes, intervalTime)
        }
        squares[currentSnake[0]].classList.add('snake')

    }

    //generate new apple once currentApple is eaten
    function randomApple() {
        do {
            appleIndex = Math.floor(Math.random() * squares.length)
        } while (squares[appleIndex].classList.contains('snake')) //so apple doesnt appear on the snake
        squares[appleIndex].classList.add('apple')

    }


    //assign functions to keycodes
    function control(e) {
        console.log("key pressed: ", e.keyCode)
        squares[currentIndex].classList.remove('snake')

        if (e.keyCode === 39) {
            direction = 1 // right arrow will move snake right
        } else if (e.keyCode === 38) {
            direction = -width //up arrow snake will go back 10 divs appearing to go up
        } else if (e.keyCode === 37) {
            direction = - 1 // left arrow go left one div
        } else if (e.keyCode === 40) {
            direction = +width //down arrow snake will go foward 10divs appearing to go down
        }
    }

    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame)









})