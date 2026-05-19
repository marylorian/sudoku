import { BoardSize } from '../types';
import { getBoxShape } from './getBoxShape';

export const createSolution = (size: BoardSize): number[][] => {
  const shape = getBoxShape(size);

  return Array.from({ length: size }, (_rowValue, row) =>
    Array.from({ length: size }, (_colValue, col) => {
      const value =
        (row * shape.cols + Math.floor(row / shape.rows) + col) % size;
      return value + 1;
    })
  );
};
