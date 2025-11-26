import React from "react";
import { Row, Col } from "react-bootstrap";
import { Player } from "../lib/Player";
import CurrentPlayerInfo from "./current-player-info";
import DistanceSelector from "./distance-selector";

interface ActiveGameSectionProps {
  currentPlayer: Player;
  maxRounds: number;
  onScoreUpdate: (score: number) => void;
}

const ActiveGameSection: React.FC<ActiveGameSectionProps> = ({
  currentPlayer,
  maxRounds,
  onScoreUpdate
}) => {
  return (
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
              player={currentPlayer}
              maxRounds={maxRounds}
            />
          </Row>
          <Row>
            <DistanceSelector
              onScoreUpdate={onScoreUpdate}
              disabled={currentPlayer.roundscores.length >= maxRounds}
            />
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default ActiveGameSection;
