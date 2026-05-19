import { fireEvent, render, screen } from '@testing-library/react-native';

import { getLevelById } from '../../utils/getLevelById';
import { MainMenu } from './MainMenu';

describe('MainMenu', () => {
  it('renders the next level and primary actions', () => {
    render(
      <MainMenu
        nextLevel={getLevelById('4x4-medium')}
        selectedLevelId="4x4-easy"
        showLevelPicker={false}
        onSelectLevel={jest.fn()}
        onStartNextLevel={jest.fn()}
        onToggleLevelPicker={jest.fn()}
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

  it('starts the next level and toggles the picker', () => {
    const onStartNextLevel = jest.fn();
    const onToggleLevelPicker = jest.fn();

    render(
      <MainMenu
        nextLevel={getLevelById('4x4-medium')}
        selectedLevelId="4x4-easy"
        showLevelPicker={false}
        onSelectLevel={jest.fn()}
        onStartNextLevel={onStartNextLevel}
        onToggleLevelPicker={onToggleLevelPicker}
      />
    );

    fireEvent.press(screen.getByText("Let's go"));
    fireEvent.press(screen.getByText('Choose a level'));

    expect(onStartNextLevel).toHaveBeenCalledTimes(1);
    expect(onToggleLevelPicker).toHaveBeenCalledTimes(1);
  });

  it('shows existing levels when requested', () => {
    const onSelectLevel = jest.fn();

    render(
      <MainMenu
        nextLevel={getLevelById('4x4-medium')}
        selectedLevelId="4x4-easy"
        showLevelPicker
        onSelectLevel={onSelectLevel}
        onStartNextLevel={jest.fn()}
        onToggleLevelPicker={jest.fn()}
      />
    );

    fireEvent.press(screen.getByLabelText('9 x 9 hard level'));

    expect(screen.getByTestId('main-menu-levels')).toBeOnTheScreen();
    expect(onSelectLevel).toHaveBeenCalledWith(
      expect.objectContaining({ id: '9x9-hard' })
    );
  });
});
