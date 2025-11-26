import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

interface PlayerInputProps {
  onPlayerAdd: (playerName: string) => void;
}

const PlayerInput: React.FC<PlayerInputProps> = ({ onPlayerAdd }) => {
  const [playerName, setPlayerName] = useState("");

  const handleAddPlayer = () => {
    if (playerName.trim() !== "") {
      onPlayerAdd(playerName.trim());
      setPlayerName("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddPlayer();
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
        👤 Player Name
      </label>
      <Row className="g-2">
        <Col xs={12} sm={7}>
          <Form.Control
            type="text"
            placeholder="Enter player name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyPress={handleKeyPress}
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
            onClick={handleAddPlayer}
            disabled={playerName.trim() === ""}
            style={{
              width: '100%',
              borderRadius: '8px',
              fontWeight: '600',
              padding: '0.625rem 1.5rem',
              whiteSpace: 'nowrap'
            }}
          >
            Add Player
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default PlayerInput;
