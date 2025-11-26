import React from "react";
import { Row, Col } from "react-bootstrap";
import { Player } from "../lib/Player";
import PlayerCard from "./player-card";

interface PlayersListProps {
  players: Player[];
  maxRounds: number;
  isGameRunning: boolean;
  currentPlayerIndex: number;
  onPlayerSelect: (player: Player) => void;
  onPlayerRemove: (player: Player) => void;
}

const PlayersList: React.FC<PlayersListProps> = ({
  players,
  maxRounds,
  isGameRunning,
  currentPlayerIndex,
  onPlayerSelect,
  onPlayerRemove
}) => {
  return (
    <Row className="mb-4">
      <Row className="mb-3" style={{
        padding: '0.75rem 1rem',
        backgroundColor: 'var(--secondary-bg)',
        borderRadius: '8px',
        marginLeft: '0.5rem',
        marginRight: '0.5rem'
      }}>
        <Col className="d-flex align-items-center">
          <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>👥 Players</h2>
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          <h2 style={{ margin: 0, fontSize: '1.5rem' }}>
            <span style={{ fontWeight: "bold", color: '#0d6efd' }}>{maxRounds}</span>{" "}
            <span style={{ fontWeight: '400' }}>Rounds</span>
          </h2>
        </Col>
      </Row>
      {players.map((player, index) => (
        <Row
          key={index}
          className="mb-2"
          onClick={() => onPlayerSelect(player)}
        >
          <PlayerCard
            isGameRunning={isGameRunning}
            player={player}
            isSelected={isGameRunning && index === currentPlayerIndex}
            maxRounds={maxRounds}
            handleRemoval={onPlayerRemove}
          />
        </Row>
      ))}
    </Row>
  );
};

export default PlayersList;
