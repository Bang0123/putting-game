import React from "react";
import { Row, Col, Button, Alert } from "react-bootstrap";

interface StartGameSectionProps {
  onStartGame: () => void;
  showError: boolean;
}

const StartGameSection: React.FC<StartGameSectionProps> = ({ onStartGame, showError }) => {
  return (
    <Row className="mb-4">
      <Col>
        <Row className="mb-4">
          <Col className="d-flex justify-content-center">
            <Button 
              variant="primary" 
              size="lg"
              onClick={onStartGame}
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
        {showError && (
          <Row>
            <Col>
              <Alert 
                variant="danger" 
                className="d-flex align-items-center"
                style={{ 
                  borderRadius: '12px',
                  fontWeight: '500',
                  padding: '1rem 1.5rem',
                  border: '2px solid #dc3545',
                  backgroundColor: 'var(--secondary-bg)',
                  boxShadow: '0 2px 8px rgba(220, 53, 69, 0.2)'
                }}
              >
                <span style={{ fontSize: '1.5rem', marginRight: '1rem' }}>⚠️</span>
                <div>
                  <strong style={{ display: 'block', marginBottom: '0.25rem', fontSize: '1.1rem' }}>
                    No players added!
                  </strong>
                  <span style={{ fontSize: '0.95rem', opacity: 0.9 }}>
                    Please add at least one player to begin the game.
                  </span>
                </div>
              </Alert>
            </Col>
          </Row>
        )}
      </Col>
    </Row>
  );
};

export default StartGameSection;
