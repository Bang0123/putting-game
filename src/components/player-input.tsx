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

  return (
    <Row>
      <Col>
        <Form>
          <Form.Group controlId="playerName">
            <Form.Control
              type="text"
              placeholder="Enter player name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Col>
      <Col>
        <Button variant="primary" type="button" onClick={handleAddPlayer}>
          Add Player
        </Button>
      </Col>
    </Row>
  );
};

export default PlayerInput;
