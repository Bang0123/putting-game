import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";

interface GameControlsProps {
  currentPlayerHasScores: boolean;
  onEndGame: () => void;
  onRevert: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({ 
  currentPlayerHasScores, 
  onEndGame, 
  onRevert 
}) => {
  return (
    <div style={{
      backgroundColor: 'var(--secondary-bg)',
      padding: '1.5rem',
      borderRadius: '12px',
      marginBottom: '2rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <Row>
        <Col xs={6} className="d-flex justify-content-start">
          <Button variant="warning" onClick={onEndGame} style={{ fontWeight: '600' }}>
            End Game
          </Button>
        </Col>
        <Col xs={6} className="d-flex justify-content-end">
          <Button
            size="lg"
            variant="warning"
            type="button"
            onClick={onRevert}
            disabled={!currentPlayerHasScores}
            title="Undo last score"
          >
            <FontAwesomeIcon color="white" icon={faRotateLeft} />
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default GameControls;
