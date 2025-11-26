import React, { useEffect, useState } from "react";
import { Col, Container, Row, ThemeProvider } from "react-bootstrap";
import { Player, PuttingGame, RoundScore } from "./lib";
import GameHeader from "./components/game-header";
import GameControls from "./components/game-controls";
import SetupSection from "./components/setup-section";
import PlayersList from "./components/players-list";
import StartGameSection from "./components/start-game-section";
import ActiveGameSection from "./components/active-game-section";
import GameOverSection from "./components/game-over-section";

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
      updatedPlayers.map((x) => x.round)
    );

    const nextPlayerIndex = updatedPlayers.indexOf(
      updatedPlayers.find((p) => p.round === lowestRound) as Player
    );
    setCurrentPlayerIndex(nextPlayerIndex);
    setCurrentRound(lowestRound + 1);
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
        updatedPlayers.map((x) => x.round)
      );

      const nextPlayerIndex = updatedPlayers.indexOf(
        updatedPlayers.find((p) => p.round === lowestRound) as Player
      );
      setCurrentPlayerIndex(nextPlayerIndex);
      setCurrentRound(lowestRound + 1);
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
            <GameHeader 
              game={game} 
              isDarkMode={isDarkMode} 
              onToggleTheme={toggleTheme} 
            />
            
            <Row className="mb-3">
              <Col>
                <Row>
                  {isGameRunning && (
                    <GameControls
                      currentPlayerHasScores={game.players[currentPlayerIndex].roundscores.length > 0}
                      onEndGame={stopGame}
                      onRevert={handleRevertClicked}
                    />
                  )}
                  {!isGameRunning && (
                    <SetupSection
                      onPlayerAdd={handlePlayerAdd}
                      onMaxRoundsSet={handleMaxRoundsSet}
                    />
                  )}
                </Row>
                
                <PlayersList
                  players={game.players}
                  maxRounds={maxRounds}
                  isGameRunning={isGameRunning}
                  currentPlayerIndex={currentPlayerIndex}
                  onPlayerSelect={handlePlayerSelect}
                  onPlayerRemove={handlePlayerRemove}
                />
                
                {!isGameRunning && (
                  <StartGameSection
                    onStartGame={startGame}
                    showError={displayNoPlayersError}
                  />
                )}
                
                {isGameRunning &&
                  currentRound <= maxRounds &&
                  game.players.length > 0 &&
                  game.players[currentPlayerIndex] &&
                  !game.players.every((x) => x.round >= maxRounds) && (
                    <ActiveGameSection
                      currentPlayer={game.players[currentPlayerIndex]}
                      maxRounds={maxRounds}
                      onScoreUpdate={handleScoreUpdate}
                    />
                  )}
                
                {isGameRunning && game.players.every((x) => x.round >= maxRounds) && (
                  <GameOverSection onEndGame={stopGame} />
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
