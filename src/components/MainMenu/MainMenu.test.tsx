import { fireEvent, render, screen } from '@testing-library/react-native';

import { getLevelById } from '../../utils/getLevelById';
import { MainMenu } from './MainMenu';

describe('MainMenu', () => {
  it('renders the next level and primary actions', () => {
    render(
      <MainMenu
        primaryLevel={getLevelById('4x4-medium')}
        shouldContinue={false}
        onChooseLevel={jest.fn()}
        onPrimaryAction={jest.fn()}
      />
    );

    expect(
      screen.getByRole('header', { name: 'Sudoku Levels' })
    ).toBeOnTheScreen();
    expect(
      screen.getByText('Next up: 4 x 4, medium difficulty')
    ).toBeOnTheScreen();
    expect(screen.getByText("Let's go")).toBeOnTheScreen();
    expect(screen.getByText('Choose a level')).toBeOnTheScreen();
  });

  it('starts the next level and opens level selection', () => {
    const onPrimaryAction = jest.fn();
    const onChooseLevel = jest.fn();

    render(
      <MainMenu
        primaryLevel={getLevelById('4x4-medium')}
        shouldContinue={false}
        onChooseLevel={onChooseLevel}
        onPrimaryAction={onPrimaryAction}
      />
    );

    fireEvent.press(screen.getByText("Let's go"));
    fireEvent.press(screen.getByText('Choose a level'));

    expect(onPrimaryAction).toHaveBeenCalledTimes(1);
    expect(onChooseLevel).toHaveBeenCalledTimes(1);
  });

  it('shows continue with level info for in-progress levels', () => {
    render(
      <MainMenu
        primaryLevel={getLevelById('6x6-hard')}
        shouldContinue
        onChooseLevel={jest.fn()}
        onPrimaryAction={jest.fn()}
      />
    );

    expect(screen.getByText('Continue')).toBeOnTheScreen();
    expect(screen.getByText('6 x 6, hard')).toBeOnTheScreen();
    expect(screen.queryByText("Let's go")).toBeNull();
  });
});
