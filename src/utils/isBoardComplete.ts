import { Board } from '../types';

export const isBoardComplete = (board: Board): boolean =>
  board.every((row) => row.every((cell) => cell.value === cell.solution));
