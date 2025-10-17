export default function Log({ turns }) {
  const list = turns.map((turn) => (
    <li key={`${turn.square.row}, ${turn.square.col}`}>
      {turn.currentPlayer} Selected {turn.square.row}, {turn.square.col}
    </li>
  ));
  return <ol id="log">{list}</ol>;
}
