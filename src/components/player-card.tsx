import React from "react";
import { Button, Card, Col, Row, Stack } from "react-bootstrap";
import { Player } from "../lib/Player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark as solidBookmark,
  faUser,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as outlinedBookmark } from "@fortawesome/free-regular-svg-icons";
import { ThrowStat } from "../lib/ThrowStat";

interface PlayerCardProps {
  player: Player;
  isSelected: boolean;
  isGameRunning: boolean;
  maxRounds: number;
  handleRemoval: (player: Player) => void;
}

const CurrentPlayerInfo: React.FC<PlayerCardProps> = ({
  player,
  isSelected,
  isGameRunning,
  maxRounds,
  handleRemoval,
}) => {
  const calculateStats = (num: number) =>
    player.roundscores
      .filter((x) => x.distance === num)
      .reduce(
        (a, b) => {
          const fuck: ThrowStat = {
            distance: num,
            hits: a.hits + b.hits,
            throws: a.throws + b.throws,
          };
          return fuck;
        },
        { distance: num, hits: 0, throws: 0 } as ThrowStat
      );

  const isDone = player.roundscores.length >= maxRounds && isGameRunning;
  const stats = [5, 6, 7, 8, 9, 10].map(calculateStats);

  return (
    <Card
      bg={isDone ? "secondary" : undefined}
      border={isSelected ? "primary" : "dark"}
      className="m-2"
    >
      <Card.Body>
        <Card.Title>
          <Stack direction="horizontal" gap={3}>
            {!isGameRunning && (
              <div className="p-2">
                <p>
                  <FontAwesomeIcon
                    icon={faTrash}
                    color="red"
                    onClick={() => handleRemoval(player)}
                  />
                </p>
              </div>
            )}
            <div className="p-2">
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
            </div>
            <div
              className="p-2 ms-auto"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <p>
                <span style={isSelected ? { fontWeight: "bold" } : {}}>
                  {player.score}
                </span>
              </p>
            </div>
          </Stack>
        </Card.Title>

        <Row className="mb-0">
          {player.roundscores.length !== 0 && stats.map((stat) => (
            <Col style={{ display: "flex", justifyContent: "center" }}>
              <div>
                <Row>
                  <p>
                    <strong>{stat.distance}</strong>
                  </p>
                </Row>
                {stat.throws > 0 && (
                  <div>
                    <Row>
                      <p>
                        {stat.hits}/{stat.throws}
                      </p>
                    </Row>
                    <Row>
                      <p>{Math.floor((stat.hits / stat.throws) * 100)}%</p>
                    </Row>
                  </div>
                )}
              </div>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CurrentPlayerInfo;
