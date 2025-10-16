import { useState } from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import WINNING_COMBINATIONS from "./constants/winningCombinations.js";

function deriveActivePlayer(gameTurns) {
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
}
function computeDerivedValues(gameTurns) {
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = computeWinner(gameBoard);
  return { activePlayer, gameBoard };
}
function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const { activePlayer, gameBoard } = computeDerivedValues(gameTurns);

  function handleSquareClick(rowIndex, symbolIndex) {
    setGameTurns((prevGameTurns) => {
      const currentPlayer = deriveActivePlayer(prevGameTurns);
      const updatedGameTurns = [
        { square: { row: rowIndex, col: symbolIndex }, currentPlayer },
        ...prevGameTurns,
      ];
      return updatedGameTurns;
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            activePlayer={activePlayer}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            activePlayer={activePlayer}
          />
        </ol>
        <GameBoard
          handleSquareClick={handleSquareClick}
          gameBoard={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
