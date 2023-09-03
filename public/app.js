const board = document.getElementById('board');
const result = document.getElementById('result');
const resetButton = document.getElementById('reset-button');

let currentPlayer = 'X';
let gameOver = false;

// Create the game board
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'btn';
    cell.dataset.index = i;
    cell.addEventListener('click', () => makeMove(i));
    board.appendChild(cell);
}

function makeMove(index) {
    if (!gameOver) {
        const cell = board.children[index];
        if (!cell.textContent) {
            cell.textContent = currentPlayer;
            checkWinner();
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            result.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function checkWinner() {
    const cells = Array.from(board.children);
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            result.textContent = `Player ${currentPlayer} wins!`;
            gameOver = true;
            resetButton.disabled = false;
            return;
        }
    }

    if (cells.every(cell => cell.textContent)) {
        result.textContent = "It's a draw!";
        gameOver = true;
        resetButton.disabled = false;
    }
}

resetButton.addEventListener('click', resetGame);

function resetGame() {
    const cells = Array.from(board.children);
    for (const cell of cells) {
        cell.textContent = '';
    }
    currentPlayer = 'X';
    gameOver = false;
    result.textContent = "Player X's turn";
    resetButton.disabled = true;
}

// Initial message
result.textContent = "Player X's turn";
