import Player from "./components/player.jsx";

function App() {
  return (
    <div id="game-container">
      <ol>
        <Player initialName="Player 1" symbol="X" />
        <Player initialName="Player 2" symbol="O" />
      </ol>
    </div>
  );
}

export default App;
