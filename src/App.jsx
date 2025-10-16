import { useState } from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";

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

function computeDerivedValues(gameTurns) {
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);

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
