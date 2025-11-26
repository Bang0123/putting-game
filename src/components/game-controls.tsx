import React from "react";
import { Col, Button } from "react-bootstrap";
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
    <Col xs={12}>
      <div style={{
        backgroundColor: 'var(--secondary-bg)',
        padding: '1.25rem',
        borderRadius: '12px',
        marginBottom: '1.5rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        gap: '0.75rem'
      }}>
        <Button 
          variant="warning" 
          onClick={onEndGame}
          style={{ 
            fontWeight: '600',
            flex: 1,
            padding: '0.625rem 1rem',
            borderRadius: '8px',
            fontSize: '1rem'
          }}
        >
          🛑 End Game
        </Button>
        <Button
          variant="warning"
          onClick={onRevert}
          disabled={!currentPlayerHasScores}
          title="Undo last score"
          style={{
            fontWeight: '600',
            flex: 1,
            padding: '0.625rem 1rem',
            borderRadius: '8px',
            fontSize: '1rem'
          }}
        >
          <FontAwesomeIcon icon={faRotateLeft} style={{ marginRight: '0.5rem' }} />
          Undo
        </Button>
      </div>
    </Col>
  );
};

export default GameControls;
