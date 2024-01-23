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
        <table>
          <tbody>
            <tr>
              {[0, 1, 2, 3, 4, 5].map((value) => (
                <td key={value}>
                  <div>
                    <input
                      className="btn-check"
                      type="radio"
                      name="options-base"
                      id={"attempts" + value}
                      autoComplete="off"
                      value={value}
                      checked={selectedAttempt === value}
                      onChange={() => handleAttemptChange(value)}
                    />
                    <label
                      className="btn"
                      htmlFor={"attempts" + value}
                    >
                      {value}
                    </label>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <br />
      <button
        type="button"
        className="btn btn-success"
        onClick={handleRecordAttempt}
        disabled={selectedAttempt === null}
      >
        OK
      </button>
    </div>
  );
};

export default DistanceSelector;
