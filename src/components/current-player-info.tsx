import React from "react";
import { Col, Row } from "react-bootstrap";
import { Player } from "../lib/Player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRuler } from "@fortawesome/free-solid-svg-icons";

interface CurrentPlayerInfoProps {
  player: Player;
}

const CurrentPlayerInfo: React.FC<CurrentPlayerInfoProps> = ({ player }) => {
  return (
    <div>
      <Row className="mb-2">
        <Col>
          <h4>
            Player:{" "}
            <span style={{ fontWeight: "bold" }}>{player.name}</span>
          </h4>
        </Col>
        <Col>
          <h4>
            Round:{" "}
            <span style={{ fontWeight: "bold" }}>{player.round + 1}</span>
          </h4>
        </Col>
      </Row>
      <Row className="mb-2">
        <h4>
          <FontAwesomeIcon icon={faRuler} />{" "}Distance:{" "}
          <span style={{ fontWeight: "bold" }}>{player.distance}</span>
        </h4>
      </Row>
    </div>
  );
};

export default CurrentPlayerInfo;
