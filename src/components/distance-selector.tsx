import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Row, Col, ButtonGroup, ToggleButton } from "react-bootstrap";

interface DistanceSelectorProps {
  onScoreUpdate: (newScore: number) => void;
  disabled: boolean;
}

const DistanceSelector: React.FC<DistanceSelectorProps> = ({
  onScoreUpdate,
  disabled
}) => {
  const [selectedScore, setSelectedScore] = useState<number | null>(null);

  const handleScoreChange = (value: number) => {
    setSelectedScore(value);
  };

  const handleAddScore = () => {
    if (selectedScore !== null) {
      onScoreUpdate(selectedScore);
      setSelectedScore(null);
    }
  };

  return (
    <Row>
      <Row className="mb-4">
        <ButtonGroup className="mb-2">
          {[0, 1, 2, 3, 4, 5].map((value, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant="outline-primary"
              size="lg"
              name="radio"
              value={value}
              disabled={disabled}
              checked={selectedScore === value}
              onChange={(e) => handleScoreChange(+e.currentTarget.value)}
            >
              {value}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </Row>
      <Row>
        <Col style={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            size="lg"
            variant="success"
            type="button"
            onClick={handleAddScore}
            disabled={selectedScore === null || disabled}
          >
            <FontAwesomeIcon color="white" icon={faCheck} />
          </Button>
        </Col>
      </Row>
    </Row>
  );
};

export default DistanceSelector;
