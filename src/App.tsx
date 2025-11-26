import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Row,
  ThemeProvider,
} from "react-bootstrap";
import { Player, PuttingGame, RoundScore } from "./lib";
import CurrentPlayerInfo from "./components/current-player-info";
import DistanceSelector from "./components/distance-selector";
import MaxRoundsInput from "./components/max-rounds-input";
import PlayerInput from "./components/player-input";
import PlayerCard from "./components/player-card";
import ThemeToggle from "./components/theme-toggle";
import ExportButton from "./components/export-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import Instructions from "./components/instructions";

const App: React.FC = () => {
  const gameStorageKey = "discGolfPuttingGame";
  const themeStorageKey = "discGolfPuttingGameTheme";
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
  const [displayNoPlayersError, setDisplayNoPlayersError] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem(themeStorageKey);
    if (savedTheme) {
      return savedTheme === "dark";
    }
    // If no saved preference, use system preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem(gameStorageKey, JSON.stringify(game));
  }, [game]);

  useEffect(() => {
    const theme = isDarkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem(themeStorageKey, theme);
  }, [isDarkMode, themeStorageKey]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

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

  const showNoPlayersError = () => {
    setDisplayNoPlayersError(true);
    setTimeout(() => setDisplayNoPlayersError(false), 5000);
  };

  const startGame = () => {
    if (game.players.length === 0) {
      showNoPlayersError();
      return;
    }

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
      <div style={{ 
        display: "flex", 
        justifyContent: "center",
        backgroundColor: "var(--bg-color)",
        minHeight: "100vh"
      }}>
        <div style={{ maxWidth: "600px", minWidth: "300px" }}>
          <Container className="App" fluid>
            <Row className="mb-4 mt-4">
              <Col xs={12} md={6} className="d-flex align-items-center mb-3 mb-md-0">
                <h1 style={{ 
                  whiteSpace: "nowrap",
                  margin: 0,
                  fontSize: "clamp(1.5rem, 4vw, 2rem)",
                  fontWeight: "700"
                }}>
                  🥏 DiscGolf Putting Game
                </h1>
              </Col>
              <Col xs={12} md={6} className="d-flex justify-content-end align-items-center" style={{ gap: "10px" }}>
                <Instructions />
                <ExportButton game={game} />
                <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Row>
                  {isGameRunning && (
                    <div style={{
                      backgroundColor: 'var(--secondary-bg)',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      marginBottom: '2rem',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}>
                      <Row>
                        <Col xs={6} className="d-flex justify-content-start">
                          <Button variant="warning" onClick={stopGame} style={{ fontWeight: '600' }}>
                            End Game
                          </Button>
                        </Col>
                        <Col xs={6} className="d-flex justify-content-end">
                          <Button
                            size="lg"
                            variant="warning"
                            type="button"
                            onClick={handleRevertClicked}
                            disabled={
                              game.players[currentPlayerIndex].roundscores
                                .length === 0
                            }
                            title="Undo last score"
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
                  <Row className="mb-3" style={{
                    padding: '0.75rem 1rem',
                    backgroundColor: 'var(--secondary-bg)',
                    borderRadius: '8px',
                    marginLeft: '0.5rem',
                    marginRight: '0.5rem'
                  }}>
                    <Col className="d-flex align-items-center">
                      <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>👥 Players</h2>
                    </Col>
                    <Col className="d-flex justify-content-end align-items-center">
                      <h2 style={{ margin: 0, fontSize: '1.5rem' }}>
                        <span style={{ fontWeight: "bold", color: '#0d6efd' }}>{maxRounds}</span>{" "}
                        <span style={{ fontWeight: '400' }}>Rounds</span>
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
                      <Row className="mb-4">
                        <Col className="d-flex justify-content-center">
                          <Button 
                            variant="primary" 
                            size="lg"
                            onClick={() => startGame()}
                            style={{ 
                              fontWeight: '600',
                              padding: '0.75rem 2.5rem',
                              borderRadius: '8px',
                              fontSize: '1.125rem'
                            }}
                          >
                            🎮 Start Game
                          </Button>
                        </Col>
                      </Row>
                      {displayNoPlayersError && (
                        <Row>
                          <Alert variant="danger" style={{ borderRadius: '8px', fontWeight: '500' }}>
                            ⚠️ No players added!
                            <br />
                            Please add a player to begin.
                          </Alert>
                        </Row>
                      )}
                    </Col>
                  </Row>
                )}
                {isGameRunning &&
                  currentRound < maxRounds &&
                  game.players.length > 0 &&
                  game.players[currentPlayerIndex] && (
                    <Row>
                      <Col>
                        <div style={{
                          backgroundColor: 'var(--secondary-bg)',
                          padding: '1.5rem',
                          borderRadius: '12px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}>
                          <Row className="mb-3">
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
                        </div>
                      </Col>
                    </Row>
                  )}
                {isGameRunning && currentRound === maxRounds && (
                  <Row className="mb-5">
                    <Col className="text-center" style={{
                      padding: '3rem 1rem',
                      backgroundColor: 'var(--secondary-bg)',
                      borderRadius: '12px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}>
                      <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: '700' }}>
                        🏆 Game Over!
                      </h2>
                      <Button 
                        variant="primary" 
                        size="lg"
                        onClick={stopGame}
                        style={{
                          fontWeight: '600',
                          padding: '0.75rem 2.5rem',
                          borderRadius: '8px',
                          fontSize: '1.125rem'
                        }}
                      >
                        View Results
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
