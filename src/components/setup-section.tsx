import React from "react";
import { Row, Col } from "react-bootstrap";
import PlayerInput from "./player-input";
import MaxRoundsInput from "./max-rounds-input";

interface SetupSectionProps {
  onPlayerAdd: (playerName: string) => void;
  onMaxRoundsSet: (rounds: number) => void;
}

const SetupSection: React.FC<SetupSectionProps> = ({ onPlayerAdd, onMaxRoundsSet }) => {
  return (
    <div style={{
      backgroundColor: 'var(--secondary-bg)',
      padding: '1.5rem',
      borderRadius: '12px',
      marginBottom: '1.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ 
        marginBottom: '1.25rem', 
        fontSize: '1.25rem', 
        fontWeight: '600',
        color: 'var(--text-color)'
      }}>
        ⚙️ Game Setup
      </h3>
      <Row>
        <Col>
          <Row className="mb-3">
            <PlayerInput onPlayerAdd={onPlayerAdd} />
          </Row>
          <Row>
            <MaxRoundsInput onMaxRoundsAdd={onMaxRoundsSet} />
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default SetupSection;
