import { RoundScore } from "./RoundScore";

export interface Player {
  id: string;
  name: string;
  distance: number;
  score: number;
  round: number;
  roundscores: RoundScore[];
}
