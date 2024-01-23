import React, { useState } from "react";

interface DistanceSelectorProps {
  score: number;
  onScoreUpdate: (newScore: number) => void;
}

const DistanceSelector: React.FC<DistanceSelectorProps> = ({
  score,
  onScoreUpdate,
}) => {
  const [selectedAttempt, setSelectedAttempt] = useState<number | null>(null);

  const handleAttemptChange = (value: number) => {
    setSelectedAttempt(value);
  };

  const handleRecordAttempt = () => {
    if (selectedAttempt !== null) {
      onScoreUpdate(selectedAttempt);
      setSelectedAttempt(null);
    }
  };

  return (
    <div>
      <div>
        {[0, 1, 2, 3, 4, 5].map((value) => (
          <label key={value}>
            <input
              type="radio"
              name="attempts"
              value={value}
              checked={selectedAttempt === value}
              onChange={() => handleAttemptChange(value)}
            />
            {value}
          </label>
        ))}
      </div>
      <br/>
      <button onClick={handleRecordAttempt} disabled={selectedAttempt === null}>
        OK
      </button>
    </div>
  );
};

export default DistanceSelector;
