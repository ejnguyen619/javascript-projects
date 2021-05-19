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
};

// Add mark on board
const turn = (squareId, player) => {
    origBoard[squareId] = player;
    document.getElementById(squareId).innerHTML = player;
    let gameWon = checkWin(origBoard, player);
    if(gameWon) gameOver(gameWon);
};

// Human player turn
const turnClick = square => {
    turn(square.target.id, humanPlayer);
};

startGame();