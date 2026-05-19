export type BoardSize = 4 | 6 | 9;
export type Difficulty = 'easy' | 'medium' | 'hard';

export type Level = {
  id: string;
  size: BoardSize;
  difficulty: Difficulty;
  givens: number;
};

export type Cell = {
  row: number;
  col: number;
  value: number | null;
  solution: number;
  fixed: boolean;
};

export type Board = Cell[][];

export type BoxShape = {
  rows: number;
  cols: number;
};

export type GameResult = 'won' | 'lost';
