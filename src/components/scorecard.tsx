import React, { useState, useEffect } from "react";
import PlayerInput from "./player-input";
import DistanceSelector from "./distance-selector";
import MaxRoundsInput from "./max-rounds-input";
import { Button, Col, Row, Table } from "react-bootstrap";

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
    <Row>
      <Row>
        {isGameRunning && (
          <Row className="mb-5">
            <Col>
              <Button variant="warning" onClick={stopGame}>
                End Game
              </Button>
            </Col>
          </Row>
        )}
        {!isGameRunning && (
          <Row>
            <Col>
              <Row className="mb-3">
                <PlayerInput onPlayerAdd={handlePlayerAdd} />
              </Row>
              <Row className="mb-4">
                <MaxRoundsInput onMaxRoundsAdd={handleMaxRoundsSet} />
              </Row>
            </Col>
          </Row>
        )}
      </Row>
      <Row className="mb-4">
        <Col>
          <h2>Players</h2>
          <Table striped bordered hover>
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
                      <Button
                        variant="danger"
                        onClick={() => handlePlayerRemove(player)}
                      >
                        Remove
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      {!isGameRunning && (
        <Row className="mb-4">
          <Col>
            <Button variant="primary" onClick={() => startGame()}>
              Start game
            </Button>
          </Col>
        </Row>
      )}
      {isGameRunning &&
        currentRound < maxRounds &&
        players.length > 0 &&
        players[currentPlayerIndex] && (
          <Row>
            <Col>
              <Row>
                <h3>Playing {maxRounds} rounds</h3>
              </Row>
              <Row>
                <p>Current Round: {currentRound}</p>
              </Row>
              <Row>
                <p>Current Player: {players[currentPlayerIndex].name}</p>
              </Row>
              <Row>
                <p>Current Distance: {players[currentPlayerIndex].distance}</p>
              </Row>
              <Row>
                <p>Current Score: {players[currentPlayerIndex].score}</p>
              </Row>
              
              <DistanceSelector
                score={players[currentPlayerIndex].score}
                onScoreUpdate={handleScoreUpdate}
              />
            </Col>
          </Row>
        )}
      {isGameRunning && currentRound === maxRounds && (
        <Row className="mb-5">
          <Col>
            <p>Game Over!</p>
            <Button variant="primary" onClick={stopGame}>
              End Game
            </Button>
          </Col>
        </Row>
      )}
    </Row>
  );
};

export default Scorecard;
