const rockButton = document.getElementById('rock');
const paperButton = document.getElementById('paper');
const scissorsButton = document.getElementById('scissors');
const resultDisplay = document.getElementById('result');

let playerScore = 0;
let computerScore = 0;
const playerScoreDisplay = document.getElementById('player-score');
const computerScoreDisplay = document.getElementById('computer-score');

let currentRound = 1;
const totalRounds = 5;
const roundDisplay = document.getElementById('round');

rockButton.addEventListener('click', () => playRound('rock'));
paperButton.addEventListener('click', () => playRound('paper'));
scissorsButton.addEventListener('click', () => playRound('scissors'));

function playRound(playerChoice) {
    if (currentRound <= totalRounds) {
        const choices = ['rock', 'paper', 'scissors'];
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];

       
        //determine the winner, update resultDisplay

        if (playerChoice === computerChoice) {
            resultDisplay.textContent = 'It\'s a draw!';

        } else if (
            (playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'paper' && computerChoice === 'rock') ||
            (playerChoice === 'scissors' && computerChoice === 'paper')
        ) {
            resultDisplay.textContent = 'You win!';
            playerScore++;
        } else {
            resultDisplay.textContent = 'Computer wins!';
            computerScore++;
        }

        //console.log("Player choice:", playerChoice);
        //console.log("Computer choice:", computerChoice);
         
        playerScoreDisplay.textContent = `Player Score: ${playerScore}`;
        computerScoreDisplay.textContent = `Computer Score: ${computerScore}`;

        roundDisplay.textContent = `Round ${currentRound} of ${totalRounds}`;
        currentRound++
    }
    if (currentRound > totalRounds) {
       
        concludeGame();
    }
    //console.log("Round result:", resultDisplay.textContent);
}


function concludeGame() {

    const gameContainer = document.getElementById('rps-game');

    const choices = document.getElementById('choices');
    const gameInfo = document.getElementById('game-info');
    const roundRes = document.getElementById('result');
    if (choices) {
        choices.style.display = 'none';
    }

    if (gameInfo) {
        gameInfo.style.display = 'none';
    }
    if (roundRes) {
        roundRes.style.display = 'none';
    }


    const gameConclusion = document.createElement('div');
    gameConclusion.setAttribute('id', 'game-conclusion');


    let finalMessage = '';
    if (playerScore > computerScore) {
        finalMessage = 'Congratulations, you win the game!';
    } else if (playerScore < computerScore) {
        finalMessage = 'Game over, the computer has won';

    } else {
        finalMessage = 'The game has ended, its a draw.';
    }

    gameConclusion.innerHTML = `
    <h2>Game Over</h2>
    <p>${finalMessage}</p>
    <p>Final Score - You: ${playerScore}  | Computer: ${computerScore}</p>
    <button id="restart-btn">Restart Game</button>
    `;

    gameContainer.appendChild(gameConclusion);
    document.getElementById('restart-btn').addEventListener('click', restartGame)
}

function restartGame() {
    playerScore = 0;
    computerScore = 0;
    currentRound = 1;

    playerScoreDisplay.textContent = 'Player Score: 0';
    computerScoreDisplay.textcontent = 'Computer Score: 0';
    roundDisplay.textContent = `Round: 1 of ${totalRounds}`;
    
    const choices = document.getElementById('choices');
    const gameInfo = document.getElementById('game-info');
    const roundRes = document.getElementById('result');

    if(choices) {
        choices.style.display = '';
    }

    if (gameInfo) {
        gameInfo.style.display = '';
    }

    if (roundRes){
        roundRes.style.display = '';
    }

    const gameConclusion = document.getElementById('game-conclusion');
    if (gameConclusion) {
        gameConclusion.remove();
    }

    document.getElementById('choices').style.display = '';
    resultDisplay.textContent = 'Choose your weapon!';

}



