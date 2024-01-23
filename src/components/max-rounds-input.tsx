import React, { useState } from "react";

interface MaxRoundInputProps {
  onMaxRoundsAdd: (num: number) => void;
}

const MaxRoundsInput: React.FC<MaxRoundInputProps> = ({ onMaxRoundsAdd }) => {
  const [roundsInput, setRoundsInput] = useState(5);

  const handleIt = () => {
    onMaxRoundsAdd(roundsInput);
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Max rounds"
        value={roundsInput}
        onChange={(e) => setRoundsInput(+e.target.value)}
      />
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleIt}
      >
        Set Max Rounds
      </button>
    </div>
  );
};

export default MaxRoundsInput;
