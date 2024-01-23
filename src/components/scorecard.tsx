import React, { useState, useEffect } from "react";
import PlayerInput from "./player-input";
import DistanceSelector from "./distance-selector";

interface Player {
  name: string;
  distance: number;
  score: number;
}

const Scorecard: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentRound, setCurrentRound] = useState(0);
  const [isGameRunning, setIsGameRunning] = useState(false);

  useEffect(() => {
    // Load players from local storage on component mount
    const storedPlayers = JSON.parse(
      localStorage.getItem("discGolfPlayers") || "[]"
    ) as Player[];
    setPlayers(storedPlayers);
  }, []);

  useEffect(() => {
    // Save players to local storage whenever players are updated
    localStorage.setItem("discGolfPlayers", JSON.stringify(players));
  }, [players]);

  const handlePlayerAdd = (playerName: string) => {
    if (players.length <= 10) {
      setPlayers([...players, { name: playerName, distance: 10, score: 0 }]);
    }
  };

  const handleScoreUpdate = (newScore: number) => {
    // Update the score for the current player
    const updatedPlayers = [...players];
    updatedPlayers[currentPlayerIndex].score +=
      (updatedPlayers[currentPlayerIndex].distance * newScore);
    updatedPlayers[currentPlayerIndex].distance = 5 + newScore;
    setPlayers(updatedPlayers);

    // Move to the next player
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    setCurrentPlayerIndex(nextPlayerIndex);

    // If all players have completed their turn, move to the next round
    if (nextPlayerIndex === 0) {
      setCurrentRound(currentRound + 1);
    }
  };

  const handlePlayerSelect = (selectedPlayer: Player) => {
    setCurrentPlayerIndex(players.indexOf(selectedPlayer));
  };

  const startGame = () => {
    localStorage.setItem("discGolfPlayers", JSON.stringify(players));
    setIsGameRunning(true);
    setCurrentPlayerIndex(0);
    setCurrentRound(0);
    // Reset scores for all players to 0
    const resetPlayers = players.map((player) => ({ ...player, score: 0 }));
    setPlayers(resetPlayers);
  };

  const stopGame = () => {
    setIsGameRunning(false);
    localStorage.setItem("discGolfPlayers", JSON.stringify(players));
    setPlayers(players);
  };

  return (
    <div>
      <h1>Disc Golf Putting game</h1>
      {isGameRunning && (
        <div>
          <button onClick={stopGame}>End Game</button>
        </div>
      )}
      {!isGameRunning && <PlayerInput onPlayerAdd={handlePlayerAdd} />}
      <div>
        <h2>Players</h2>
        <ul>
          {players.map((player, index) => (
            <li key={index} onClick={() => handlePlayerSelect(player)}>
              {player.name} - {player.score}
            </li>
          ))}
        </ul>
      </div>
      {!isGameRunning && (
        <div>
          <button onClick={() => startGame()}>Start game</button>
        </div>
      )}
      {isGameRunning &&
        currentRound < 5 &&
        players.length > 0 &&
        players[currentPlayerIndex] && (
          <div>
            <p>Current Round: {currentRound + 1}</p>
            <p>Current Player: {players[currentPlayerIndex].name}</p>
            <p>Current Distance: {players[currentPlayerIndex].distance}</p>
            <p>Current Score: {players[currentPlayerIndex].score}</p>
            <DistanceSelector
              score={players[currentPlayerIndex].score}
              onScoreUpdate={handleScoreUpdate}
            />
          </div>
        )}
      {isGameRunning && currentRound === 5 && (
        <div>
          <p>Game Over!</p>
          <button onClick={stopGame}>Restart Game</button>
        </div>
      )}
    </div>
  );
};

export default Scorecard;
