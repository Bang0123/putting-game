import React, { ReactNode } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Player } from "../lib/Player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark as solidBookmark,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as outlinedBookmark } from "@fortawesome/free-regular-svg-icons";

interface PlayerCardProps {
  player: Player;
  isSelected: boolean;
  isGameRunning: boolean;
  children: ReactNode;
}

const CurrentPlayerInfo: React.FC<PlayerCardProps> = ({
  player,
  isSelected,
  isGameRunning,
  children,
}) => {
  return (
    <Card border={isSelected ? "primary" : "dark"} className="m-2">
      <Card.Body>
        <Card.Title>
          <Row>
            <Col>
              <p>
                <FontAwesomeIcon
                  icon={
                    isGameRunning
                      ? isSelected
                        ? solidBookmark
                        : outlinedBookmark
                      : faUser
                  }
                />{" "}
                <span style={isSelected ? { fontWeight: "bold" } : {}}>
                  {player.name}
                </span>
              </p>
            </Col>
            <Col style={{ display: "flex", justifyContent: "flex-end" }}>
              <p>
                <span style={isSelected ? { fontWeight: "bold" } : {}}>
                  {player.score}
                </span>
              </p>
            </Col>
          </Row>
        </Card.Title>
        {!isGameRunning && (
          <Card.Subtitle className="mb-1">{children}</Card.Subtitle>
        )}
        {/* <Row>
          <Col>5</Col>
          <Col>6</Col>
          <Col>7</Col>
          <Col>8</Col>
          <Col>9</Col>
          <Col>10</Col>
        </Row> */}
      </Card.Body>
    </Card>
  );
};

export default CurrentPlayerInfo;
