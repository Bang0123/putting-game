import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { PuttingGame } from "../lib";

interface ExportButtonProps {
  game: PuttingGame;
  disabled?: boolean;
}

const ExportButton: React.FC<ExportButtonProps> = ({ game, disabled = false }) => {
  const handleExport = () => {
    // Create export data with timestamp
    const exportData = {
      exportDate: new Date().toISOString(),
      gameId: game.id,
      maxRounds: game.maxRounds,
      players: game.players.map(player => ({
        name: player.name,
        finalScore: player.score,
        totalRounds: player.round,
        roundScores: player.roundscores.map(rs => ({
          round: rs.round,
          distance: rs.distance,
          hits: rs.hits,
          throws: rs.throws,
          percentage: Math.floor((rs.hits / rs.throws) * 100)
        })),
        statistics: {
          totalHits: player.roundscores.reduce((sum, rs) => sum + rs.hits, 0),
          totalThrows: player.roundscores.reduce((sum, rs) => sum + rs.throws, 0),
          averageAccuracy: player.roundscores.length > 0
            ? Math.floor((player.roundscores.reduce((sum, rs) => sum + (rs.hits / rs.throws), 0) / player.roundscores.length) * 100)
            : 0
        }
      }))
    };

    // Convert to JSON string with pretty formatting
    const jsonString = JSON.stringify(exportData, null, 2);
    
    // Create blob and download
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `putting-game-scores-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      variant="success"
      onClick={handleExport}
      disabled={disabled || game.players.length === 0}
      size="sm"
    >
      <FontAwesomeIcon icon={faDownload} /> Export Scores
    </Button>
  );
};

export default ExportButton;
