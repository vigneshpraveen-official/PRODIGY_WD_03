const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.message');
const resetButton = document.querySelector('.reset');
let currentPlayer = 'X';
let boardState = Array(9).fill(null);
let isGameActive = true;

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function handleClick(e) {
  const index = e.target.dataset.index;
  if (boardState[index] || !isGameActive) return;

  boardState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  checkWinner();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winPatterns.length; i++) {
    const [a, b, c] = winPatterns[i];
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    message.textContent = `Player ${currentPlayer} Wins!`;
    isGameActive = false;
  } else if (!boardState.includes(null)) {
    message.textContent = 'Draw!';
    isGameActive = false;
  }
}

function resetGame() {
  boardState.fill(null);
  cells.forEach(cell => cell.textContent = '');
  message.textContent = '';
  isGameActive = true;
  currentPlayer = 'X';
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
