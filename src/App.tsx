import React, { useEffect, useState } from "react";
import PlayerInput from "./components/player-input";
import DistanceSelector from "./components/distance-selector";
import MaxRoundsInput from "./components/max-rounds-input";
import {
  Button,
  Col,
  Container,
  Row,
  Table,
  ThemeProvider,
} from "react-bootstrap";
import { Player } from "./lib/Player";
import { PuttingGame } from "./lib/PuttingGame";
import CurrentPlayerInfo from "./components/current-player-info";

const App: React.FC = () => {
  const gameStorageKey = "discGolfPuttingGame";
  const initializeGame = () => {
    const savedItem = localStorage.getItem(gameStorageKey);
    if (savedItem != null) {
      return JSON.parse(savedItem || "") as PuttingGame;
    } else {
      const defaultGame: PuttingGame = {
        id: crypto.randomUUID(),
        players: [],
        round: 1,
        maxRounds: 5,
      };
      return defaultGame;
    }
  };

  const [game, setGame] = useState<PuttingGame>(initializeGame);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [maxRounds, setMaxRounds] = useState(5);
  const [currentRound, setCurrentRound] = useState(0);
  const [isGameRunning, setIsGameRunning] = useState(false);

  useEffect(() => {
    // Save game to local storage whenever game are updated
    localStorage.setItem(gameStorageKey, JSON.stringify(game));
  }, [game]);

  const handlePlayerAdd = (playerName: string) => {
    if (game.players.length <= 10) {
      setGame({
        ...game,
        players: [
          ...game.players,
          {
            id: crypto.randomUUID(),
            name: playerName,
            distance: 10,
            score: 0,
            round: 1,
            roundhits: [],
            roundscores: [],
          } as Player,
        ],
      });
    }
  };

  const handleMaxRoundsSet = (num: number) => {
    setMaxRounds(num);
  };

  const handlePlayerRemove = (player: Player) => {
    setGame({
      ...game,
      players: game.players.filter((x) => x.id !== player.id),
    });
  };

  const handleScoreUpdate = (newScore: number) => {
    const updatedPlayers = [...game.players];
    updatedPlayers[currentPlayerIndex].score +=
      updatedPlayers[currentPlayerIndex].distance * newScore;
    updatedPlayers[currentPlayerIndex].distance = 5 + newScore;
    updatedPlayers[currentPlayerIndex].roundhits.push(newScore);
    updatedPlayers[currentPlayerIndex].round =
      updatedPlayers[currentPlayerIndex].roundhits.length;
    setGame({ ...game, players: updatedPlayers });

    let lowestRound = Math.min.apply(
      null,
      game.players.map((x) => x.round)
    );
    const nextPlayerIndex = game.players.indexOf(
      game.players.find((p) => p.round === lowestRound) as Player
    );
    setCurrentPlayerIndex(nextPlayerIndex);
    setCurrentRound(lowestRound);

    if (game.players.every((x) => x.round === maxRounds)) {
      stopGame();
    }
  };

  const handlePlayerSelect = (selectedPlayer: Player) => {
    setCurrentPlayerIndex(game.players.indexOf(selectedPlayer));
  };

  const startGame = () => {
    localStorage.setItem(gameStorageKey, JSON.stringify(game));
    setIsGameRunning(true);
    setCurrentPlayerIndex(0);
    setCurrentRound(0);
    setMaxRounds(maxRounds);
    const resetPlayers = game.players.map((player) => ({
      ...player,
      distance: 10,
      score: 0,
      round: 1,
      roundhits: [],
    }));
    setGame({ ...game, players: resetPlayers });
  };

  const stopGame = () => {
    setIsGameRunning(false);
    localStorage.setItem(gameStorageKey, JSON.stringify(game));
    setGame({ ...game });
  };

  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      minBreakpoint="xxs"
    >
      <Container className="App" fluid>
        <Row className="mb-3 mt-3">
          <Col>
            <h1>Disc Golf Putting game</h1>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
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
                    {game.players.map((player, index) => (
                      <tr
                        key={index}
                        onClick={() => handlePlayerSelect(player)}
                      >
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
              game.players.length > 0 &&
              game.players[currentPlayerIndex] && (
                <Row>
                  <Col>
                    <CurrentPlayerInfo player={game.players[currentPlayerIndex]} maxRounds={maxRounds} currentRound={currentRound} />
                    <DistanceSelector
                      score={game.players[currentPlayerIndex].score}
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
          </Col>
        </Row>
      </Container>
    </ThemeProvider>
  );
};

export default App;
