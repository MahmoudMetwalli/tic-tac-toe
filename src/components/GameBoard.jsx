import { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ handleSquareClick, activePlayerSymbol }) {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  function handleSelectSquare(rowIndex, symbolIndex) {
    setGameBoard((prevGameBoard) => {
      const updatedGameBoard = [
        ...prevGameBoard.map((innerRows) => [...innerRows]),
      ];
      updatedGameBoard[rowIndex][symbolIndex] = activePlayerSymbol;
      return updatedGameBoard;
    });
    handleSquareClick();
  }
  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, symbolIndex) => (
              <li key={symbolIndex}>
                <button
                  onClick={() => handleSelectSquare(rowIndex, symbolIndex)}
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
