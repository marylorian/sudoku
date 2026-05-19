import { fireEvent, render, screen } from '@testing-library/react-native';

import { getLevelById } from '../../utils/getLevelById';
import { GameResultModal } from './GameResultModal';

describe('GameResultModal', () => {
  it('congratulates the user and offers the next level after a win', () => {
    const onNextLevel = jest.fn();
    const onMainMenu = jest.fn();

    render(
      <GameResultModal
        hasNextLevel
        level={getLevelById('4x4-easy')}
        result="won"
        onMainMenu={onMainMenu}
        onNextLevel={onNextLevel}
        onRetry={jest.fn()}
      />
    );

    expect(screen.getByText('Congratulations!')).toBeOnTheScreen();
    expect(screen.getByText('Next level')).toBeOnTheScreen();
    expect(screen.getByText('Go to main menu')).toBeOnTheScreen();

    fireEvent.press(screen.getByTestId('next-level-button'));
    fireEvent.press(screen.getByTestId('main-menu-button'));

    expect(onNextLevel).toHaveBeenCalledTimes(1);
    expect(onMainMenu).toHaveBeenCalledTimes(1);
  });

  it('offers retry and main menu after a loss', () => {
    const onRetry = jest.fn();
    const onMainMenu = jest.fn();

    render(
      <GameResultModal
        hasNextLevel
        level={getLevelById('4x4-easy')}
        result="lost"
        onMainMenu={onMainMenu}
        onNextLevel={jest.fn()}
        onRetry={onRetry}
      />
    );

    expect(screen.getByText('Not quite')).toBeOnTheScreen();
    expect(screen.getByText('↻ Retry')).toBeOnTheScreen();
    expect(screen.getByLabelText('Retry')).toBeOnTheScreen();
    expect(screen.getByText('Go to main menu')).toBeOnTheScreen();

    fireEvent.press(screen.getByTestId('retry-button'));
    fireEvent.press(screen.getByTestId('main-menu-button'));

    expect(onRetry).toHaveBeenCalledTimes(1);
    expect(onMainMenu).toHaveBeenCalledTimes(1);
  });

  it('disables the next-level action when there is no next level', () => {
    render(
      <GameResultModal
        hasNextLevel={false}
        level={getLevelById('9x9-hard')}
        result="won"
        onMainMenu={jest.fn()}
        onNextLevel={jest.fn()}
        onRetry={jest.fn()}
      />
    );

    expect(screen.getByTestId('next-level-button')).toBeDisabled();
    expect(screen.getByText('All levels solved')).toBeOnTheScreen();
  });
});
