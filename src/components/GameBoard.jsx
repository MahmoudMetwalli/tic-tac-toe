const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ handleSquareClick, gameTurns }) {
  let gameBoard = initialGameBoard;

  for (const turn of gameTurns) {
    const { square, currentPlayer } = turn;
    gameBoard[square.row][square.col] = currentPlayer;
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, symbolIndex) => (
              <li key={symbolIndex}>
                <button
                  onClick={() => handleSquareClick(rowIndex, symbolIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
