import React from "react";
import { Row, Col } from "react-bootstrap";
import { PuttingGame } from "../lib";
import Instructions from "./instructions";
import ExportButton from "./export-button";
import ThemeToggle from "./theme-toggle";

interface GameHeaderProps {
  game: PuttingGame;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({ game, isDarkMode, onToggleTheme }) => {
  return (
    <Row className="mb-4 mt-4">
      <Col xs={12} className="d-flex align-items-center justify-content-between mb-3">
        <h1 style={{ 
          margin: 0,
          fontSize: "clamp(1.5rem, 4vw, 2rem)",
          fontWeight: "700"
        }}>
          🥏 DiscGolf Putting Game
        </h1>
        <div className="d-flex align-items-center" style={{ gap: "10px", flexShrink: 0 }}>
          <Instructions />
          <ExportButton game={game} />
          <ThemeToggle isDarkMode={isDarkMode} onToggle={onToggleTheme} />
        </div>
      </Col>
    </Row>
  );
};

export default GameHeader;
