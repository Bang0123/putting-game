import { RoundScore } from "./RoundScore";

export interface Player {
  id: string;
  name: string;
  distance: number;
  score: number;
  round: number;
  roundhits: number[];
  roundscores: RoundScore[];
}
