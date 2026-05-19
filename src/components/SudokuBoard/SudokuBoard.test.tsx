import { fireEvent, render, screen } from '@testing-library/react-native';

import { createBoard } from '../../utils/createBoard';
import { getLevelById } from '../../utils/getLevelById';
import { SudokuBoard } from './SudokuBoard';

describe('SudokuBoard', () => {
  it('renders a labelled board and every cell', () => {
    const board = createBoard(getLevelById('4x4-easy'));

    render(
      <SudokuBoard
        board={board}
        selectedCell={null}
        size={4}
        onSelectCell={jest.fn()}
      />
    );

    expect(screen.getByLabelText('4 by 4 sudoku board')).toBeOnTheScreen();

    for (let row = 0; row < 4; row += 1) {
      for (let col = 0; col < 4; col += 1) {
        expect(screen.getByTestId(`cell-${row}-${col}`)).toBeOnTheScreen();
      }
    }
  });

  it('calls onSelectCell for editable cells', () => {
    const board = createBoard(getLevelById('4x4-easy'));
    const editableCell = board.flat().find((cell) => !cell.fixed);
    const onSelectCell = jest.fn();

    expect(editableCell).toBeDefined();

    render(
      <SudokuBoard
        board={board}
        selectedCell={null}
        size={4}
        onSelectCell={onSelectCell}
      />
    );

    fireEvent.press(
      screen.getByTestId(`cell-${editableCell!.row}-${editableCell!.col}`)
    );

    expect(onSelectCell).toHaveBeenCalledWith(editableCell);
  });

  it('disables fixed cells', () => {
    const board = createBoard(getLevelById('4x4-easy'));
    const fixedCell = board.flat().find((cell) => cell.fixed);
    const onSelectCell = jest.fn();

    expect(fixedCell).toBeDefined();

    render(
      <SudokuBoard
        board={board}
        selectedCell={null}
        size={4}
        onSelectCell={onSelectCell}
      />
    );

    expect(
      screen.getByTestId(`cell-${fixedCell!.row}-${fixedCell!.col}`)
    ).toBeDisabled();
  });
});
