import { fireEvent, render, screen } from '@testing-library/react-native';

import { levels } from '../../constants';
import { LevelPicker } from './LevelPicker';

describe('LevelPicker', () => {
  it('renders every configured level as an accessible tab', () => {
    render(
      <LevelPicker selectedLevelId="4x4-easy" onSelectLevel={jest.fn()} />
    );

    levels.forEach((level) => {
      expect(
        screen.getByLabelText(
          `${level.size} x ${level.size} ${level.difficulty} level`
        )
      ).toBeOnTheScreen();
    });
  });

  it('marks the selected level and calls back with the pressed level', () => {
    const onSelectLevel = jest.fn();

    render(
      <LevelPicker selectedLevelId="6x6-hard" onSelectLevel={onSelectLevel} />
    );

    expect(screen.getByLabelText('6 x 6 hard level')).toBeSelected();

    fireEvent.press(screen.getByLabelText('9 x 9 medium level'));

    expect(onSelectLevel).toHaveBeenCalledWith(
      expect.objectContaining({ id: '9x9-medium' })
    );
  });
});
