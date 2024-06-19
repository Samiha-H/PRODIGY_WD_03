const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (e) => {
    const clickedCell = e.target;
    const clickedCellIndex = clickedCell.getAttribute('data-index');

    if (gameState[clickedCellIndex] !== '' || !isGameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;

    checkForWinner();
};

const checkForWinner = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        const a = gameState[winCondition[0]];
        const b = gameState[winCondition[1]];
        const c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.innerText = `Player ${currentPlayer} has won!`;
        isGameActive = false;
        return;
    }

    if (!gameState.includes('')) {
        statusText.innerText = `Game is a draw!`;
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.innerText = `It's ${currentPlayer}'s turn`;
};

const resetGame = () => {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusText.innerText = `It's ${currentPlayer}'s turn`;
    isGameActive = true;
    cells.forEach(cell => cell.innerText = '');
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
