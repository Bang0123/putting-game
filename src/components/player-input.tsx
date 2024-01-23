import React, { useState } from "react";

interface PlayerInputProps {
  onPlayerAdd: (playerName: string) => void;
}

const PlayerInput: React.FC<PlayerInputProps> = ({ onPlayerAdd }) => {
  const [playerName, setPlayerName] = useState("");

  const handleAddPlayer = () => {
    if (playerName.trim() !== "") {
      onPlayerAdd(playerName.trim());
      setPlayerName("");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter player name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleAddPlayer}
      >
        Add Player
      </button>
    </div>
  );
};

export default PlayerInput;
