import { BoardSize, Difficulty, Level } from '../types';

const givensBySize: Record<BoardSize, Record<Difficulty, number>> = {
  4: {
    easy: 10,
    medium: 8,
    hard: 6
  },
  6: {
    easy: 24,
    medium: 18,
    hard: 14
  },
  9: {
    easy: 42,
    medium: 34,
    hard: 27
  }
};

export const boardSizes: BoardSize[] = [4, 6, 9];
export const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];

export const levels: Level[] = boardSizes.flatMap((size) =>
  difficulties.map((difficulty) => ({
    id: `${size}x${size}-${difficulty}`,
    size,
    difficulty,
    givens: givensBySize[size][difficulty]
  }))
);
