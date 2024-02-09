import React, { useState } from "react";
import { Button, Row, Col, ButtonGroup, ToggleButton } from "react-bootstrap";

interface DistanceSelectorProps {
  score: number;
  onScoreUpdate: (newScore: number) => void;
}

const DistanceSelector: React.FC<DistanceSelectorProps> = ({
  score,
  onScoreUpdate,
}) => {
  const [selectedScore, setSelectedScore] = useState<number | null>(null);

  const handleScoreChange = (value: number) => {
    setSelectedScore(value);
  };

  const handleIt = () => {
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
              checked={selectedScore === value}
              onChange={(e) => handleScoreChange(+e.currentTarget.value)}
            >
              {value}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </Row>
      <Row>
        <Col>
          <Button
            size="lg"
            variant="success"
            type="button"
            onClick={handleIt}
            disabled={selectedScore === null}
          >
            OK
          </Button>
        </Col>
      </Row>
    </Row>
  );
};

export default DistanceSelector;
