import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

interface MaxRoundInputProps {
  onMaxRoundsAdd: (num: number) => void;
}

const MaxRoundsInput: React.FC<MaxRoundInputProps> = ({ onMaxRoundsAdd }) => {
  const [roundsInput, setRoundsInput] = useState("5");

  const handleIt = () => {
    const parsed = parseInt(roundsInput, 10);
    const numToSet = isNaN(parsed) ? 5 : parsed;
    onMaxRoundsAdd(numToSet);
    setRoundsInput(numToSet.toString());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleIt();
    }
  };

  return (
    <div>
      <label style={{ 
        display: 'block', 
        marginBottom: '0.5rem', 
        fontWeight: '600',
        fontSize: '0.95rem',
        color: 'var(--text-color)'
      }}>
        🔢 Max Rounds
      </label>
      <Row className="g-2">
        <Col xs={12} sm={7}>
          <Form.Control
            type="number"
            placeholder="Max rounds"
            value={roundsInput}
            onChange={(e) => setRoundsInput(e.target.value)}
            onKeyPress={handleKeyPress}
            min="1"
            max="20"
            style={{
              borderRadius: '8px',
              padding: '0.625rem 1rem',
              fontSize: '1rem',
              border: '2px solid var(--bs-border-color)'
            }}
          />
        </Col>
        <Col xs={12} sm={5}>
          <Button 
            variant="primary" 
            type="button" 
            onClick={handleIt}
            style={{
              width: '100%',
              borderRadius: '8px',
              fontWeight: '600',
              padding: '0.625rem 1.5rem',
              whiteSpace: 'nowrap'
            }}
          >
            Set Rounds
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default MaxRoundsInput;
