import React from "react";
import { Card } from "react-bootstrap";
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

const PlayerCard: React.FC<PlayerCardProps> = ({
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
      style={{ cursor: isGameRunning ? "pointer" : "default" }}
    >
      <Card.Body style={{ padding: '1.25rem' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: player.roundscores.length !== 0 ? '1rem' : '0'
        }}>
          {!isGameRunning && (
            <FontAwesomeIcon
              icon={faTrash}
              style={{ 
                color: '#dc3545',
                cursor: 'pointer',
                fontSize: '1.1rem',
                marginRight: '1rem',
                transition: 'transform 0.2s'
              }}
              onClick={() => handleRemoval(player)}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
          )}
          <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <FontAwesomeIcon
              icon={
                isGameRunning
                  ? isSelected
                    ? solidBookmark
                    : outlinedBookmark
                  : faUser
              }
              style={{ 
                marginRight: '0.75rem',
                fontSize: '1.25rem',
                color: isSelected ? '#0d6efd' : undefined
              }}
            />
            <span style={{ 
              fontWeight: isSelected ? "700" : "600",
              fontSize: '1.125rem',
              color: 'var(--text-color)'
            }}>
              {player.name}
            </span>
          </div>
          <div style={{ 
            fontSize: '1.5rem',
            fontWeight: '700',
            color: isSelected ? '#0d6efd' : 'var(--text-color)',
            minWidth: '50px',
            textAlign: 'right'
          }}>
            {player.score}
          </div>
        </div>

        {player.roundscores.length !== 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '0.5rem',
            marginTop: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--bs-border-color)'
          }}>
            {stats.map((stat) => (
              <div 
                key={stat.distance} 
                style={{ 
                  textAlign: 'center',
                  padding: '0.5rem 0.25rem',
                  backgroundColor: stat.throws > 0 ? 'var(--secondary-bg)' : 'transparent',
                  borderRadius: '6px',
                  transition: 'background-color 0.2s'
                }}
              >
                <div style={{ 
                  fontSize: '0.875rem',
                  fontWeight: '700',
                  color: '#6c757d',
                  marginBottom: '0.25rem'
                }}>
                  {stat.distance}m
                </div>
                {stat.throws > 0 && (
                  <>
                    <div style={{ 
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: 'var(--text-color)',
                      marginBottom: '0.125rem'
                    }}>
                      {stat.hits}/{stat.throws}
                    </div>
                    <div style={{ 
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      color: stat.hits / stat.throws >= 0.6 ? '#198754' : stat.hits / stat.throws >= 0.4 ? '#ffc107' : '#dc3545'
                    }}>
                      {Math.floor((stat.hits / stat.throws) * 100)}%
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default PlayerCard;
