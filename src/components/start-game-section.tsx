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
            <Alert variant="danger" style={{ borderRadius: '8px', fontWeight: '500' }}>
              ⚠️ No players added!
              <br />
              Please add a player to begin.
            </Alert>
          </Row>
        )}
      </Col>
    </Row>
  );
};

export default StartGameSection;
