let origBoard;
const humanPlayer = 'O';
const aiPlayer = 'X';

// Three in a row vertical, horizontal, or diagonal
const winCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
];

const cells = document.querySelectorAll('.cell');

// Start board game
const startGame = () => {
    document.querySelector('.endgame').style.display = 'none';
    origBoard = Array.from(Array(9).keys());
    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.style.removeProperty('background-color');
        cell.addEventListener('click', turnClick, false);
    });
}

// Check if there is 3 in a row
const checkWin = (board, player) => {
    let plays = board.reduce((a, e, i) => 
		(e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for(let [index, win] of winCombos.entries()) {
        if(win.every(elem => plays.indexOf(elem) > -1)){
            gameWon = {index: index, player: player};
            break;
        }
    }
    return gameWon;
};

// Game over
const gameOver = gameWon => {
    for(let index of winCombos[gameWon.index]) {
        document.getElementById(index).style.backgroundColor =
            gameWon.player == humanPlayer ? 'blue' : 'red';
    }
    for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
	}
    declareWinner(gameWon.player == humanPlayer ? "You win!" : "You lose.");
};

// Add mark on board
const turn = (squareId, player) => {
    origBoard[squareId] = player;
    document.getElementById(squareId).innerHTML = player;
    let gameWon = checkWin(origBoard, player);
    if(gameWon) gameOver(gameWon);
};

// Return all empty squares
const emptySquares = () => {
    return origBoard.filter(s => typeof s == 'number');
};

// Basic ai
const bestSpot = () => {
    return emptySquares()[0];
};

// Declare winner of game
const declareWinner = who => {
    document.querySelector('.endgame').style.display = 'block';
    document.querySelector('.endgame .text').innerText = who;
};

// Check if all squares are filled
const checkTie = () => {
    if(emptySquares().length == 0) {
        for (var i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = 'green';
            cells[i].removeEventListener('click', turnClick, false);
        }
        declareWinner('Tie Game!');
        return true;
    }
};

// Turn progression
const turnClick = square => {
    if(typeof origBoard[square.target.id] === 'number') {
        turn(square.target.id, humanPlayer);
        if(!checkTie()) turn(bestSpot(), aiPlayer);   
    }
};

startGame();