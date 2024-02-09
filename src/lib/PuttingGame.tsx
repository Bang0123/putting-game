import { Player } from "./Player";

export interface PuttingGame {
  id: string;
  players: Player[];
  round: number;
  maxRounds: number;
}
