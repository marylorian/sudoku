import { levels } from '../constants';
import { createBoard } from './createBoard';

describe('createBoard', () => {
  it.each(levels)('creates cells for $id', (level) => {
    const board = createBoard(level);
    const cells = board.flat();
    const fixedCells = cells.filter((cell) => cell.fixed);

    expect(board).toHaveLength(level.size);
    expect(board.every((row) => row.length === level.size)).toBe(true);
    expect(fixedCells).toHaveLength(level.givens);

    cells.forEach((cell) => {
      expect(cell.row).toBeGreaterThanOrEqual(0);
      expect(cell.row).toBeLessThan(level.size);
      expect(cell.col).toBeGreaterThanOrEqual(0);
      expect(cell.col).toBeLessThan(level.size);
      expect(cell.solution).toBeGreaterThanOrEqual(1);
      expect(cell.solution).toBeLessThanOrEqual(level.size);
      expect(cell.value).toBe(cell.fixed ? cell.solution : null);
    });
  });
});
