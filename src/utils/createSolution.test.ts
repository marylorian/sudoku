import { getBoxShape } from './getBoxShape';
import { createSolution } from './createSolution';
import type { BoardSize } from '../types';

const sizes: BoardSize[] = [4, 6, 9];

const expectedValues = (size: BoardSize) =>
  Array.from({ length: size }, (_value, index) => index + 1);

describe('createSolution', () => {
  it.each(sizes)('creates a solved %sx%s board', (size) => {
    const solution = createSolution(size);
    const values = expectedValues(size);

    expect(solution).toHaveLength(size);
    expect(solution.every((row) => row.length === size)).toBe(true);

    solution.forEach((row) => {
      expect([...row].sort((left, right) => left - right)).toEqual(values);
    });

    for (let col = 0; col < size; col += 1) {
      const column = solution.map((row) => row[col]!);
      expect(column.sort((left, right) => left - right)).toEqual(values);
    }
  });

  it.each(sizes)('creates valid box regions for %sx%s', (size) => {
    const solution = createSolution(size);
    const shape = getBoxShape(size);
    const values = expectedValues(size);

    for (let row = 0; row < size; row += shape.rows) {
      for (let col = 0; col < size; col += shape.cols) {
        const box = solution
          .slice(row, row + shape.rows)
          .flatMap((boxRow) => boxRow.slice(col, col + shape.cols))
          .sort((left, right) => left - right);

        expect(box).toEqual(values);
      }
    }
  });
});
