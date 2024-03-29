/* still buggy.  not showing the correct winner */ 

let currentPlayer = 'X'; 
let gameBoard = ['', '', '', '', '', '', '', '', '']; 
let gameActive = true;

const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetGame, false);

const winConditions = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Left-to-right diagonal
    [2, 4, 6]  // Right-to-left diagonal
  ];


function handlePlayerTurn(clickedCellIndex) {
    //console.log('Handling player turn for cell index:', clickedCellIndex);
    if(gameBoard[clickedCellIndex] !== '' || !gameActive){
     return;   
    }
    gameBoard[clickedCellIndex] = currentPlayer;
    //console.log(`Cell ${clickedCellIndex + 1} set to ${currentPlayer}`);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    //console.log(`Current player switched to ${currentPlayer}`);
} 



cells.forEach(cell => {
    cell.addEventListener('click', cellClicked, false);
})


function cellClicked(clickedCellEvent) {
    //console.log('Before cell click - currentPlayer:', currentPlayer);
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.id.replace('cell-', '') ) -1;
   // console.log('Before cell click - gameBoard:', gameBoard);
    //console.log('cell clicked', clickedCellEvent.target.id);

    if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
        return;
     
    }

    handlePlayerTurn(clickedCellIndex);
    updateUI();
    checkForWinOrDraw();
   // console.log('After cell click - currentPlayer:', currentPlayer);
   // console.log('After cell click - gameBoard:', gameBoard);
}

function updateUI() {
    for (let i = 0; i<cells.length; i++) {
        cells[i].innerText = gameBoard[i];
    }
    console.log('After updating UI - currentPlayer:', currentPlayer);
    console.log('After updating UI - gameBoard:', gameBoard);
}


function checkForWinOrDraw() {
    //console.log('Before checking for win or draw - currentPlayer:', currentPlayer);
    //console.log('Before checking for win or draw - gameBoard:', gameBoard);


    let roundWon = false; 
    for (let i =0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
       //console.log(gameBoard[a], gameBoard[b], gameBoard[c]);
        if(gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            roundWon = true;
            //console.log('Winning condition found:', [a, b, c]);
            break;
        }
    }
    //console.log('After checking for win or draw - currentPlayer:', currentPlayer);
    //console.log('After checking for win or draw - gameBoard:', gameBoard);

    if(roundWon) {
        announceWinner(currentPlayer);
        gameActive = false;
        //console.log('After announcing winner - currentPlayer:', currentPlayer);
        return;
    }
    let roundDraw = !gameBoard.includes('');
    //console.log('Round Draw:', roundDraw);
    if(roundDraw) {
        announceDraw();
        gameActive = false;
        return;
    }
    //console.log('After checking for win or draw - currentPlayer:', currentPlayer);
    //console.log('After checking for win or draw - gameBoard:', gameBoard);
}

function announceWinner(player) {
    //console.log('Before announcing winner, currentPlayer:', currentPlayer);
    //console.log('Announcing winner:', currentPlayer); 
    const messageElement = document.getElementById('gameMessage');
    messageElement.innerText = `Player ${player} Wins!`;
    
    // Debug: Log the message element's text content
    //console.log('Message Element Text:', messageElement.innerText);
   
    if (gameActive) {
        currentPlayer = player === 'X' ? 'O' : 'X';
        //console.log(`Current player switched to ${currentPlayer}`);
    }

    gameActive = false; // Ensure the game is marked as inactive after a win
}  







function announceDraw() {
    //console.log('Announcing draw');
    const messageElement = document.getElementById('gameMessage');
    messageElement.innerText = 'Game Draw!';
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', '']; 
    gameActive = true; 
    currentPlayer = 'X'; 
    
    cells.forEach(cell => {
        cell.innerText = '';
    });
    document.getElementById('gameMessage').innerText = '';
  }











































































































