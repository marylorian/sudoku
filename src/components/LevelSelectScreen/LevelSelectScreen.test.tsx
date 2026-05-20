import { fireEvent, render, screen } from '@testing-library/react-native';

import { LevelSelectScreen } from './LevelSelectScreen';

describe('LevelSelectScreen', () => {
  it('renders as a standalone level selection screen', () => {
    render(
      <LevelSelectScreen
        selectedLevelId="4x4-easy"
        onBack={jest.fn()}
        onSelectLevel={jest.fn()}
      />
    );

    expect(
      screen.getByRole('header', { name: 'Choose from existing levels' })
    ).toBeOnTheScreen();
    expect(screen.getByTestId('back-to-menu-button')).toBeOnTheScreen();
    expect(screen.getByLabelText('Go to main menu')).toBeOnTheScreen();
    expect(screen.queryByText('Main menu')).toBeNull();
    expect(screen.getByText('Choose difficulty')).toBeOnTheScreen();
    expect(screen.getByLabelText('easy difficulty')).toBeOnTheScreen();
    expect(screen.queryByTestId('filtered-levels')).toBeNull();
  });

  it('shows levels only after choosing a difficulty', () => {
    render(
      <LevelSelectScreen
        selectedLevelId="4x4-easy"
        onBack={jest.fn()}
        onSelectLevel={jest.fn()}
      />
    );

    fireEvent.press(screen.getByLabelText('hard difficulty'));

    expect(screen.getByTestId('filtered-levels')).toBeOnTheScreen();
    expect(screen.getByLabelText('4 x 4 hard level')).toBeOnTheScreen();
    expect(screen.getByLabelText('6 x 6 hard level')).toBeOnTheScreen();
    expect(screen.getByLabelText('9 x 9 hard level')).toBeOnTheScreen();
    expect(screen.queryByLabelText('4 x 4 easy level')).toBeNull();
  });

  it('goes back to menu and starts selected levels after difficulty selection', () => {
    const onBack = jest.fn();
    const onSelectLevel = jest.fn();

    render(
      <LevelSelectScreen
        selectedLevelId="4x4-easy"
        onBack={onBack}
        onSelectLevel={onSelectLevel}
      />
    );

    fireEvent.press(screen.getByTestId('back-to-menu-button'));
    fireEvent.press(screen.getByLabelText('hard difficulty'));
    fireEvent.press(screen.getByLabelText('9 x 9 hard level'));

    expect(onBack).toHaveBeenCalledTimes(1);
    expect(onSelectLevel).toHaveBeenCalledWith(
      expect.objectContaining({ id: '9x9-hard' })
    );
  });
});
