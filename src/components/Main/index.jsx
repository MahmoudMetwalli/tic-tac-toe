import { useState } from "react";

import Player from "../Player";
import GameBoard from "../GameBoard";
import Log from "../Log";
import GameOver from "../GameOver";
import {
  computeDerivedValues,
  deriveActivePlayer,
} from "./helpers/derivingState";

function Main() {
  const [players, setPlayers] = useState({ X: "Player 1", O: "Player 2" });
  const [gameTurns, setGameTurns] = useState([]);

  const { activePlayer, gameBoard, winner, hadDraw } =
    computeDerivedValues(gameTurns);

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

  function handleRematch() {
    setGameTurns([]);
  }

  function handlePlayerRename(symbol, newName) {
    setPlayers((prevPlayers) => {
      return { ...prevPlayers, [symbol]: newName };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={players["X"]}
            symbol="X"
            activePlayer={activePlayer}
            onRename={handlePlayerRename}
          />
          <Player
            initialName={players["O"]}
            symbol="O"
            activePlayer={activePlayer}
            onRename={handlePlayerRename}
          />
        </ol>
        {(winner || hadDraw) && (
          <GameOver winner={players[winner]} onRematch={handleRematch} />
        )}
        <GameBoard onSquareClick={handleSquareClick} gameBoard={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default Main;
