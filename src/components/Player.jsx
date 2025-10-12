import { useState } from "react";

export default function Player({ initialName, symbol }) {
  const [name, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing((isEditing) => !isEditing);
  }

  function handleNameChange(event) {
    setPlayerName(event.target.value);
  }

  let playerName = <span className="player-name">{name}</span>;
  let btnCaption = "Edit";
  if (isEditing) {
    playerName = (
      <input type="text" required value={name} onChange={handleNameChange} />
    );
    btnCaption = "Save";
  }

  return (
    <li>
      <span className="player">
        {playerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{btnCaption}</button>
    </li>
  );
}
