import { getLevelById } from './getLevelById';
import { createBoard } from './createBoard';
import { updateCell } from './updateCell';

describe('updateCell', () => {
  it('updates editable cells', () => {
    const board = createBoard(getLevelById('4x4-easy'));
    const editableCell = board.flat().find((cell) => !cell.fixed);

    expect(editableCell).toBeDefined();

    const updated = updateCell(
      board,
      editableCell!.row,
      editableCell!.col,
      editableCell!.solution
    );

    expect(updated[editableCell!.row]![editableCell!.col]!.value).toBe(
      editableCell!.solution
    );
    expect(updated).not.toBe(board);
  });

  it('does not update fixed cells', () => {
    const board = createBoard(getLevelById('4x4-easy'));
    const fixedCell = board.flat().find((cell) => cell.fixed);

    expect(fixedCell).toBeDefined();

    const updated = updateCell(board, fixedCell!.row, fixedCell!.col, null);

    expect(updated[fixedCell!.row]![fixedCell!.col]!.value).toBe(
      fixedCell!.value
    );
  });
});
