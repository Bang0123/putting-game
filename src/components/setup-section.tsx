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
    <Row>
      <Col>
        <Row className="mb-3">
          <PlayerInput onPlayerAdd={onPlayerAdd} />
        </Row>
        <Row className="mb-4">
          <MaxRoundsInput onMaxRoundsAdd={onMaxRoundsSet} />
        </Row>
      </Col>
    </Row>
  );
};

export default SetupSection;
