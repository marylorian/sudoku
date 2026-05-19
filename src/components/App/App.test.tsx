import { fireEvent, render, screen } from '@testing-library/react-native';

import { createBoard } from '../../utils/createBoard';
import { getLevelById } from '../../utils/getLevelById';
import { App } from './App';

describe('App', () => {
  const fillEditableCells = (
    levelId: string,
    valueForCell: (solution: number, size: number) => number
  ) => {
    const level = getLevelById(levelId);
    const editableCells = createBoard(level)
      .flat()
      .filter((cell) => !cell.fixed);

    editableCells.forEach((cell) => {
      fireEvent.press(screen.getByTestId(`cell-${cell.row}-${cell.col}`));
      fireEvent.press(
        screen.getByLabelText(
          `Enter ${valueForCell(cell.solution, level.size)}`
        )
      );
    });
  };

  it('renders the main menu first', () => {
    render(<App />);

    expect(screen.getByTestId('main-menu')).toBeOnTheScreen();
    expect(screen.getByText("Let's go")).toBeOnTheScreen();
    expect(screen.getByText('Choose a level')).toBeOnTheScreen();
  });

  it('starts the next unsolved level from the main menu', () => {
    render(<App />);

    fireEvent.press(screen.getByText("Let's go"));

    expect(screen.getByText('4 x 4 board, easy difficulty')).toBeOnTheScreen();
    expect(screen.getByLabelText('4 by 4 sudoku board')).toBeOnTheScreen();
    expect(screen.getByLabelText('Number pad')).toBeOnTheScreen();
  });

  it('chooses levels from the main menu level list', () => {
    render(<App />);

    fireEvent.press(screen.getByText('Choose a level'));
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

    fireEvent.press(screen.getByText("Let's go"));
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

  it('asks before resetting and keeps user numbers when cancelled', () => {
    const editableCell = createBoard(getLevelById('4x4-easy'))
      .flat()
      .find((cell) => !cell.fixed);

    expect(editableCell).toBeDefined();

    render(<App />);

    fireEvent.press(screen.getByText("Let's go"));
    fireEvent.press(
      screen.getByTestId(`cell-${editableCell!.row}-${editableCell!.col}`)
    );
    fireEvent.press(screen.getByLabelText(`Enter ${editableCell!.solution}`));
    fireEvent.press(screen.getByTestId('reset-board-button'));

    expect(screen.getByText('Reset board?')).toBeOnTheScreen();

    fireEvent.press(screen.getByTestId('cancel-reset-button'));

    expect(screen.queryByText('Reset board?')).toBeNull();
    expect(
      screen.getByLabelText(
        `Row ${editableCell!.row + 1}, column ${editableCell!.col + 1}, value ${editableCell!.solution}`
      )
    ).toBeOnTheScreen();
  });

  it('clears user-added numbers after reset confirmation', () => {
    const editableCell = createBoard(getLevelById('4x4-easy'))
      .flat()
      .find((cell) => !cell.fixed);

    expect(editableCell).toBeDefined();

    render(<App />);

    fireEvent.press(screen.getByText("Let's go"));
    fireEvent.press(
      screen.getByTestId(`cell-${editableCell!.row}-${editableCell!.col}`)
    );
    fireEvent.press(screen.getByLabelText(`Enter ${editableCell!.solution}`));
    fireEvent.press(screen.getByTestId('reset-board-button'));
    fireEvent.press(screen.getByTestId('confirm-reset-button'));

    expect(screen.queryByText('Reset board?')).toBeNull();
    expect(
      screen.getByLabelText(
        `Row ${editableCell!.row + 1}, column ${editableCell!.col + 1}, empty`
      )
    ).toBeOnTheScreen();
  });

  it('shows a win modal and advances to the next level', async () => {
    render(<App />);

    fireEvent.press(screen.getByText("Let's go"));
    fillEditableCells('4x4-easy', (solution) => solution);

    expect(await screen.findByText('Congratulations!')).toBeOnTheScreen();

    fireEvent.press(screen.getByTestId('next-level-button'));

    expect(
      screen.getByText('4 x 4 board, medium difficulty')
    ).toBeOnTheScreen();
  });

  it('shows a loss modal and retries the level', async () => {
    render(<App />);

    fireEvent.press(screen.getByText("Let's go"));
    fillEditableCells('4x4-easy', (solution, size) => (solution % size) + 1);

    expect(await screen.findByText('Not quite')).toBeOnTheScreen();

    fireEvent.press(screen.getByTestId('retry-button'));

    expect(screen.getByText('4 x 4 board, easy difficulty')).toBeOnTheScreen();
    expect(screen.getByTestId('completion-status')).toHaveTextContent(
      'In progress'
    );
  });

  it('returns to the main menu after solving and starts the next unsolved level', async () => {
    render(<App />);

    fireEvent.press(screen.getByText("Let's go"));
    fillEditableCells('4x4-easy', (solution) => solution);

    expect(await screen.findByText('Congratulations!')).toBeOnTheScreen();

    fireEvent.press(screen.getByTestId('main-menu-button'));

    expect(
      screen.getByText('Next up: 4 x 4, medium difficulty')
    ).toBeOnTheScreen();

    fireEvent.press(screen.getByText("Let's go"));

    expect(
      screen.getByText('4 x 4 board, medium difficulty')
    ).toBeOnTheScreen();
  });
});
