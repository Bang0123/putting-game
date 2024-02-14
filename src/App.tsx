import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, ThemeProvider } from "react-bootstrap";
import { Player, PuttingGame, RoundScore } from "./lib";
import CurrentPlayerInfo from "./components/current-player-info";
import DistanceSelector from "./components/distance-selector";
import MaxRoundsInput from "./components/max-rounds-input";
import PlayerInput from "./components/player-input";
import PlayerCard from "./components/player-card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";

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
  const [currentRound, setCurrentRound] = useState(1);
  const [isGameRunning, setIsGameRunning] = useState(false);

  useEffect(() => {
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
            round: 0,
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
    const player = updatedPlayers[currentPlayerIndex];

    if (player.roundscores.length >= maxRounds) {
      return;
    }

    player.roundscores.push({
      distance: player.distance,
      hits: newScore,
      throws: 5,
      round: player.roundscores.length + 1,
    } as RoundScore);

    player.round = player.roundscores.length;
    player.distance = 5 + newScore;
    player.score = player.roundscores.reduce((pv, cv) => {
      return pv + cv.distance * cv.hits;
    }, 0);

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

  const handleRevertClicked = () => {
    const updatedPlayers = [...game.players];
    const player = updatedPlayers[currentPlayerIndex];

    if (player.roundscores.length === 0) {
      return;
    }

    let removedRound = player.roundscores.pop();
    let didRemove = removedRound !== undefined;

    if (didRemove) {
      if (player.roundscores.length === 0) {
        player.distance = 10;
      } else {
        let newLast = player.roundscores[player.roundscores.length - 1];
        player.distance = 5 + newLast.hits;
      }

      player.round = player.roundscores.length;
      player.score = player.roundscores.reduce((pv, cv) => {
        return pv + cv.distance * cv.hits;
      }, 0);

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
    }
  };

  const handlePlayerSelect = (selectedPlayer: Player) => {
    setCurrentPlayerIndex(game.players.indexOf(selectedPlayer));
  };

  const startGame = () => {
    localStorage.setItem(gameStorageKey, JSON.stringify(game));
    setIsGameRunning(true);
    setCurrentPlayerIndex(0);
    setCurrentRound(1);
    setMaxRounds(maxRounds);
    const resetPlayers = game.players.map(
      (player) =>
        ({
          ...player,
          distance: 10,
          score: 0,
          round: 0,
          roundscores: [],
        } as Player)
    );
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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: "600px", minWidth: "300px" }}>
          <Container className="App" fluid>
            <Row className="mb-3 mt-3">
              <Col>
                <h1>DiscGolf Putting game</h1>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Row>
                  {isGameRunning && (
                    <div>
                      <Row className="mb-5">
                        <Col
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                          }}
                        >
                          <Button variant="warning" onClick={stopGame}>
                            End Game
                          </Button>
                        </Col>
                        <Col
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <Button
                            size="lg"
                            variant="warning"
                            type="button"
                            onClick={handleRevertClicked}
                            disabled={
                              game.players[currentPlayerIndex].roundscores
                                .length === 0
                            }
                          >
                            <FontAwesomeIcon
                              color="white"
                              icon={faRotateLeft}
                            />
                          </Button>
                        </Col>
                      </Row>
                    </div>
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
                  <Row className="mb-1">
                    <Col>
                      <h2>Players</h2>
                    </Col>
                    <Col
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <h2>
                        <span style={{ fontWeight: "bold" }}>{maxRounds}</span>{" "}
                        Rounds
                      </h2>
                    </Col>
                  </Row>
                  {game.players.map((player, index) => (
                    <Row
                      key={index}
                      className="mb-2"
                      onClick={() => handlePlayerSelect(player)}
                    >
                      <PlayerCard
                        isGameRunning={isGameRunning}
                        player={player}
                        isSelected={
                          isGameRunning && index === currentPlayerIndex
                        }
                        maxRounds={maxRounds}
                        handleRemoval={handlePlayerRemove}
                      />
                    </Row>
                  ))}
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
                        <Row>
                          <CurrentPlayerInfo
                            player={game.players[currentPlayerIndex]}
                            maxRounds={maxRounds}
                          />
                        </Row>
                        <Row>
                          <DistanceSelector
                            onScoreUpdate={handleScoreUpdate}
                            disabled={
                              game.players[currentPlayerIndex].roundscores
                                .length >= maxRounds
                            }
                          />
                        </Row>
                      </Col>
                    </Row>
                  )}
                {isGameRunning && currentRound === maxRounds && (
                  <Row className="mb-5">
                    <Col>
                      <h2>Game Over!</h2>
                      <Button variant="primary" onClick={stopGame}>
                        End Game
                      </Button>
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
