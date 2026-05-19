import { getLevelById } from './getLevelById';
import { createBoard } from './createBoard';
import { isBoardComplete } from './isBoardComplete';

describe('isBoardComplete', () => {
  it('returns false when a board still has unsolved cells', () => {
    expect(isBoardComplete(createBoard(getLevelById('4x4-easy')))).toBe(false);
  });

  it('returns true when every value matches the solution', () => {
    const completeBoard = createBoard(getLevelById('4x4-easy')).map((row) =>
      row.map((cell) => ({
        ...cell,
        value: cell.solution
      }))
    );

    expect(isBoardComplete(completeBoard)).toBe(true);
  });
});
