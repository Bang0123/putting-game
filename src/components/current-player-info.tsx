import React from "react";
import { Row } from "react-bootstrap";
import { Player } from "../lib/Player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRuler } from "@fortawesome/free-solid-svg-icons";

interface CurrentPlayerInfoProps {
  player: Player;
  maxRounds: number;
  currentRound: number;
}

const CurrentPlayerInfo: React.FC<CurrentPlayerInfoProps> = ({
  player,
  maxRounds,
  currentRound,
}) => {
  return (
    <div>
      <Row className="mb-1">
        <h3>
          Playing <span style={{ fontWeight: "bold" }}>{maxRounds}</span> rounds
        </h3>
      </Row>
      <Row className="mb-1">
        <p>
          Current Round:{" "}
          <span style={{ fontWeight: "bold" }}>{currentRound}</span>
        </p>
      </Row>
      <Row className="mb-1">
        <p>
          Current Player:{" "}
          <span style={{ fontWeight: "bold" }}>{player.name}</span>
        </p>
      </Row>
      <Row className="mb-1">
        <p>
          <FontAwesomeIcon icon={faRuler} /> Distance:{" "}
          <span style={{ fontWeight: "bold" }}>{player.distance}</span>
        </p>
      </Row>
    </div>
  );
};

export default CurrentPlayerInfo;
