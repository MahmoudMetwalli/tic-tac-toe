import { useState } from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";

function App() {
  const [activePlayer, setActivePlayer] = useState("X");

  function handleSquareClick() {
    setActivePlayer((prevActivePlayer) => {
      return prevActivePlayer === "X" ? "O" : "X";
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
