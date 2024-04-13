document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const player1Input = document.getElementById('player1');
    const player2Input = document.getElementById('player2');
    const symbolSelect = document.getElementById('symbol');
    const gameBoard = document.querySelector('.game-board');
    const msg = document.getElementById('msg');

    let currentPlayer;
    let boardState;
    let player1;
    let player2;

    startBtn.addEventListener('click', startGame);

    function startGame() {
        player1 = player1Input.value || 'Player 1';
        player2 = player2Input.value || 'Player 2';
        const symbol = symbolSelect.value;

        currentPlayer = 1;
        boardState = ['', '', '', '', '', '', '', '', ''];

        // Clear previous game board
        gameBoard.innerHTML = '';

        // Create cells for game board
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('game-cell');
            cell.dataset.index = i;
            cell.addEventListener('click', () => cellClicked(cell));
            gameBoard.appendChild(cell);
        }
        msg.classList.add('hide');
        showMessage(`${player1}'s turn`);
    }

    function cellClicked(cell) {
        const index = parseInt(cell.dataset.index);
        if (boardState[index] === '') {
            const symbol = currentPlayer === 1 ? 'X' : 'O';
            boardState[index] = symbol;
            cell.textContent = symbol;
            if (checkWinner(symbol)) {
                endGame(`${symbol === 'X' ? player1 : player2} wins!`);
            } else if (boardState.every(cell => cell !== '')) {
                endGame("It's a draw!");
            } else {
                currentPlayer = currentPlayer === 1 ? 2 : 1;
                showMessage(`${currentPlayer === 1 ? player1 : player2}'s turn`);
            }
        }
    }

    function checkWinner(symbol) {
        const winningPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        return winningPatterns.some(pattern => pattern.every(index => boardState[index] === symbol));
    }

    function endGame(message) {
        showMessage(message);
        setTimeout(() => {
            resetBoard();
            showMessage(`${player1}'s turn`);
        }, 2000);
    }

    function resetBoard() {
        boardState = ['', '', '', '', '', '', '', '', ''];
        const cells = document.querySelectorAll('.game-cell');
        cells.forEach(cell => cell.textContent = '');
    }

    function showMessage(message) {
        msg.textContent = message;
        msg.classList.remove('hide');
    }
});