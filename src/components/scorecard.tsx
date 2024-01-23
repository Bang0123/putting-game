import React, { useState, useEffect } from "react";
import PlayerInput from "./player-input";
import DistanceSelector from "./distance-selector";
import MaxRoundsInput from "./max-rounds-input";

interface Player {
  id: string;
  name: string;
  distance: number;
  score: number;
  round: number;
  roundhits: number[];
}

const Scorecard: React.FC = () => {
  const playersStorageKey = "discGolfPlayers";
  const [players, setPlayers] = useState<Player[]>(
    JSON.parse(localStorage.getItem(playersStorageKey) || "[]") as Player[]
  );
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [maxRounds, setMaxRounds] = useState(5);
  const [currentRound, setCurrentRound] = useState(0);
  const [isGameRunning, setIsGameRunning] = useState(false);

  useEffect(() => {
    // Save players to local storage whenever players are updated
    localStorage.setItem(playersStorageKey, JSON.stringify(players));
  }, [players]);

  const handlePlayerAdd = (playerName: string) => {
    if (players.length <= 10) {
      setPlayers([
        ...players,
        {
          id: crypto.randomUUID(),
          name: playerName,
          distance: 10,
          score: 0,
          round: 1,
          roundhits: [],
        },
      ]);
    }
  };

  const handleMaxRoundsSet = (num: number) => {
    setMaxRounds(num);
  };

  const handlePlayerRemove = (player: Player) => {
    setPlayers(players.filter((x) => x.id !== player.id));
  };

  const handleScoreUpdate = (newScore: number) => {
    const updatedPlayers = [...players];
    updatedPlayers[currentPlayerIndex].score +=
      updatedPlayers[currentPlayerIndex].distance * newScore;
    updatedPlayers[currentPlayerIndex].distance = 5 + newScore;
    updatedPlayers[currentPlayerIndex].roundhits.push(newScore);
    updatedPlayers[currentPlayerIndex].round =
      updatedPlayers[currentPlayerIndex].roundhits.length;
    setPlayers(updatedPlayers);

    let lowestRound = Math.min.apply(
      null,
      players.map((x) => x.round)
    );
    const nextPlayerIndex = players.indexOf(
      players.find((p) => p.round === lowestRound) as Player
    );
    setCurrentPlayerIndex(nextPlayerIndex);
    setCurrentRound(lowestRound);

    if (players.every((x) => x.round === maxRounds)) {
      stopGame();
    }
  };

  const handlePlayerSelect = (selectedPlayer: Player) => {
    setCurrentPlayerIndex(players.indexOf(selectedPlayer));
  };

  const startGame = () => {
    localStorage.setItem(playersStorageKey, JSON.stringify(players));
    setIsGameRunning(true);
    setCurrentPlayerIndex(0);
    setCurrentRound(0);
    setMaxRounds(maxRounds);
    const resetPlayers = players.map((player) => ({
      ...player,
      distance: 10,
      score: 0,
      round: 1,
      roundhits: [],
    }));
    setPlayers(resetPlayers);
  };

  const stopGame = () => {
    setIsGameRunning(false);
    localStorage.setItem(playersStorageKey, JSON.stringify(players));
    setPlayers(players);
  };

  return (
    <div>
      <h1>Disc Golf Putting game</h1>
      {isGameRunning && (
        <div>
          <button type="button" className="btn btn-warning" onClick={stopGame}>
            End Game
          </button>
        </div>
      )}
      {!isGameRunning && (
        <div>
          <PlayerInput onPlayerAdd={handlePlayerAdd} />
          <MaxRoundsInput onMaxRoundsAdd={handleMaxRoundsSet} />
        </div>
      )}
      <div>
        <h2>Players</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th>
              {!isGameRunning && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={index} onClick={() => handlePlayerSelect(player)}>
                <td
                  style={
                    isGameRunning && index === currentPlayerIndex
                      ? { fontWeight: "bold" }
                      : {}
                  }
                >
                  {player.name}
                </td>
                <td>{player.score}</td>
                {!isGameRunning && (
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handlePlayerRemove(player)}
                    >
                      Remove
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!isGameRunning && (
        <div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => startGame()}
          >
            Start game
          </button>
        </div>
      )}
      {isGameRunning &&
        currentRound < maxRounds &&
        players.length > 0 &&
        players[currentPlayerIndex] && (
          <div>
            <h3>Playing {maxRounds} rounds</h3>
            <p>Current Round: {currentRound}</p>
            <p>Current Player: {players[currentPlayerIndex].name}</p>
            <p>Current Distance: {players[currentPlayerIndex].distance}</p>
            <p>Current Score: {players[currentPlayerIndex].score}</p>
            <DistanceSelector
              score={players[currentPlayerIndex].score}
              onScoreUpdate={handleScoreUpdate}
            />
          </div>
        )}
      {isGameRunning && currentRound === maxRounds && (
        <div>
          <p>Game Over!</p>
          <button type="button" className="btn btn-primary" onClick={stopGame}>
            End Game
          </button>
        </div>
      )}
    </div>
  );
};

export default Scorecard;
