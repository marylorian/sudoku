import { fireEvent, render, screen } from '@testing-library/react-native';

import { getLevelById } from '../../utils/getLevelById';
import { MainMenu } from './MainMenu';

describe('MainMenu', () => {
  it('renders the next level and primary actions', () => {
    render(
      <MainMenu
        nextLevel={getLevelById('4x4-medium')}
        onChooseLevel={jest.fn()}
        onStartNextLevel={jest.fn()}
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
    const onStartNextLevel = jest.fn();
    const onChooseLevel = jest.fn();

    render(
      <MainMenu
        nextLevel={getLevelById('4x4-medium')}
        onChooseLevel={onChooseLevel}
        onStartNextLevel={onStartNextLevel}
      />
    );

    fireEvent.press(screen.getByText("Let's go"));
    fireEvent.press(screen.getByText('Choose a level'));

    expect(onStartNextLevel).toHaveBeenCalledTimes(1);
    expect(onChooseLevel).toHaveBeenCalledTimes(1);
  });
});
