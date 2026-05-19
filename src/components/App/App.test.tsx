import { fireEvent, render, screen } from '@testing-library/react-native';

import { createBoard } from '../../utils/createBoard';
import { getLevelById } from '../../utils/getLevelById';
import { App } from './App';

describe('App', () => {
  it('renders the default level and game controls', () => {
    render(<App />);

    expect(
      screen.getByRole('header', { name: 'Sudoku Levels' })
    ).toBeOnTheScreen();
    expect(screen.getByText('4 x 4 board, easy difficulty')).toBeOnTheScreen();
    expect(screen.getByLabelText('4 by 4 sudoku board')).toBeOnTheScreen();
    expect(screen.getByLabelText('Number pad')).toBeOnTheScreen();
  });

  it('changes levels from the picker', () => {
    render(<App />);

    fireEvent.press(screen.getByLabelText('9 x 9 hard level'));

    expect(screen.getByText('9 x 9 board, hard difficulty')).toBeOnTheScreen();
    expect(screen.getByLabelText('9 by 9 sudoku board')).toBeOnTheScreen();
  });

  it('enters a number into a selected editable cell', () => {
    const editableCell = createBoard(getLevelById('4x4-easy'))
      .flat()
      .find((cell) => !cell.fixed);

    expect(editableCell).toBeDefined();

    render(<App />);

    fireEvent.press(
      screen.getByTestId(`cell-${editableCell!.row}-${editableCell!.col}`)
    );
    fireEvent.press(screen.getByLabelText(`Enter ${editableCell!.solution}`));

    expect(
      screen.getByLabelText(
        `Row ${editableCell!.row + 1}, column ${editableCell!.col + 1}, value ${editableCell!.solution}`
      )
    ).toBeOnTheScreen();
  });
});
