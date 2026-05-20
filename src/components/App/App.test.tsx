import {
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { createBoard } from '../../utils/createBoard';
import { getLevelById } from '../../utils/getLevelById';
import { App } from './App';

const mockedAsyncStorage = jest.mocked(AsyncStorage);

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedAsyncStorage.getItem.mockResolvedValue(null);
    mockedAsyncStorage.setItem.mockResolvedValue();
  });

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

  const renderApp = async () => {
    render(<App />);

    await waitFor(() => {
      expect(mockedAsyncStorage.setItem).toHaveBeenCalled();
    });
  };

  it('renders the main menu first', async () => {
    await renderApp();

    expect(screen.getByTestId('main-menu')).toBeOnTheScreen();
    expect(screen.getByText("Let's go")).toBeOnTheScreen();
    expect(screen.getByText('Choose a level')).toBeOnTheScreen();
  });

  it('starts the next unsolved level from the main menu', async () => {
    await renderApp();

    fireEvent.press(screen.getByText("Let's go"));

    expect(screen.getByText('4 x 4 board, easy difficulty')).toBeOnTheScreen();
    expect(screen.getByLabelText('4 by 4 sudoku board')).toBeOnTheScreen();
    expect(screen.getByLabelText('Number pad')).toBeOnTheScreen();
  });

  it('chooses levels from the level selection screen', async () => {
    await renderApp();

    fireEvent.press(screen.getByText('Choose a level'));

    expect(screen.getByTestId('level-select-screen')).toBeOnTheScreen();
    expect(
      screen.getByRole('header', { name: 'Choose from existing levels' })
    ).toBeOnTheScreen();

    fireEvent.press(screen.getByLabelText('hard difficulty'));
    fireEvent.press(screen.getByLabelText('9 x 9 hard level'));

    expect(screen.getByText('9 x 9 board, hard difficulty')).toBeOnTheScreen();
    expect(screen.getByLabelText('9 by 9 sudoku board')).toBeOnTheScreen();
  });

  it('returns from level selection to the main menu', async () => {
    await renderApp();

    fireEvent.press(screen.getByText('Choose a level'));
    fireEvent.press(screen.getByTestId('back-to-menu-button'));

    expect(screen.getByTestId('main-menu')).toBeOnTheScreen();
  });

  it('shows continue when the user returns to menu with an unfinished game', async () => {
    await renderApp();

    fireEvent.press(screen.getByText("Let's go"));
    expect(screen.getByLabelText('Go to main menu')).toBeOnTheScreen();
    fireEvent.press(screen.getByTestId('game-main-menu-button'));

    expect(screen.getByText('Continue')).toBeOnTheScreen();
    expect(screen.getByText('4 x 4, easy')).toBeOnTheScreen();
    expect(screen.queryByText("Let's go")).toBeNull();

    fireEvent.press(screen.getByText('Continue'));

    expect(screen.getByText('4 x 4 board, easy difficulty')).toBeOnTheScreen();
  });

  it('loads unfinished progress from device storage', async () => {
    const board = createBoard(getLevelById('6x6-hard'));
    mockedAsyncStorage.getItem.mockResolvedValue(
      JSON.stringify({
        finishedLevelIds: ['4x4-easy'],
        seenLevelIds: ['4x4-easy', '6x6-hard'],
        inProgress: {
          levelId: '6x6-hard',
          board
        }
      })
    );

    render(<App />);

    expect(await screen.findByText('Continue')).toBeOnTheScreen();
    expect(screen.getByText('6 x 6, hard')).toBeOnTheScreen();

    fireEvent.press(screen.getByText('Continue'));

    expect(screen.getByText('6 x 6 board, hard difficulty')).toBeOnTheScreen();
  });

  it('enters a number into a selected editable cell', async () => {
    const editableCell = createBoard(getLevelById('4x4-easy'))
      .flat()
      .find((cell) => !cell.fixed);

    expect(editableCell).toBeDefined();

    await renderApp();

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

  it('asks before resetting and keeps user numbers when cancelled', async () => {
    const editableCell = createBoard(getLevelById('4x4-easy'))
      .flat()
      .find((cell) => !cell.fixed);

    expect(editableCell).toBeDefined();

    await renderApp();

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

  it('clears user-added numbers after reset confirmation', async () => {
    const editableCell = createBoard(getLevelById('4x4-easy'))
      .flat()
      .find((cell) => !cell.fixed);

    expect(editableCell).toBeDefined();

    await renderApp();

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
    await renderApp();

    fireEvent.press(screen.getByText("Let's go"));
    fillEditableCells('4x4-easy', (solution) => solution);

    expect(await screen.findByText('Congratulations!')).toBeOnTheScreen();

    fireEvent.press(screen.getByTestId('next-level-button'));

    expect(
      screen.getByText('4 x 4 board, medium difficulty')
    ).toBeOnTheScreen();
  });

  it('shows a loss modal and retries the level', async () => {
    await renderApp();

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
    await renderApp();

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
