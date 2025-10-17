import WINNING_COMBINATIONS from "./winningCombinations";

export function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].currentPlayer === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  let gameBoard = initialGameBoard;

  for (const turn of gameTurns) {
    const { square, currentPlayer } = turn;
    gameBoard[square.row][square.col] = currentPlayer;
  }
  return gameBoard;
}

function computeWinner(gameBoard) {
  for (const comination of WINNING_COMBINATIONS) {
    const firstSymbol = gameBoard[comination[0].row][comination[0].column];
    const secondSymbol = gameBoard[comination[1].row][comination[1].column];
    const thirdSymbol = gameBoard[comination[2].row][comination[2].column];

    if (
      firstSymbol &&
      firstSymbol === secondSymbol &&
      firstSymbol === thirdSymbol
    ) {
      return firstSymbol;
    }
  }
  return null;
}

export function computeDerivedValues(gameTurns) {
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = computeWinner(gameBoard);
  const hadDraw = gameTurns.length === 9 && !winner;
  return { activePlayer, gameBoard, winner, hadDraw };
}
