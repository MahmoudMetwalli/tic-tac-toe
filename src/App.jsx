import { useState } from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";

function App() {
  const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState([]);

  function handleSquareClick(rowIndex, symbolIndex) {
    setActivePlayer((prevActivePlayer) => {
      return prevActivePlayer === "X" ? "O" : "X";
    });
    setGameTurns((prevGameTurns) => {
      let currentPlayer = "X";
      if (prevGameTurns.length > 0 && prevGameTurns[0].currentPlayer === "X") {
        currentPlayer = "O";
      }
      const updatedGameTurns = [
        { square: { row: rowIndex, col: symbolIndex }, currentPlayer },
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
          activePlayerSymbol={activePlayer}
        />
      </div>
    </main>
  );
}

export default App;
