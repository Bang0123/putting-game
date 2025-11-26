import React from "react";
import { Row, Col, Button } from "react-bootstrap";

interface GameOverSectionProps {
  onEndGame: () => void;
}

const GameOverSection: React.FC<GameOverSectionProps> = ({ onEndGame }) => {
  return (
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
          onClick={onEndGame}
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
  );
};

export default GameOverSection;
