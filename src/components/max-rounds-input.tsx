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

  return (
    <Row>
      <Col>
        <Form>
          <Form.Group controlId="roundsInput">
            <Form.Control
              type="text"
              placeholder="Max rounds"
              value={roundsInput}
              onChange={(e) => setRoundsInput(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Col>
      <Col>
        <Button variant="primary" type="button" onClick={handleIt}>
          Set Max Rounds
        </Button>
      </Col>
    </Row>
  );
};

export default MaxRoundsInput;
