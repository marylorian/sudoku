import { fireEvent, render, screen } from '@testing-library/react-native';

import { NumberPad } from './NumberPad';

describe('NumberPad', () => {
  it('renders one button per number plus clear', () => {
    render(<NumberPad max={6} onChoose={jest.fn()} />);

    for (let value = 1; value <= 6; value += 1) {
      expect(screen.getByLabelText(`Enter ${value}`)).toBeOnTheScreen();
    }

    expect(screen.getByLabelText('Clear selected cell')).toBeOnTheScreen();
  });

  it('calls onChoose with selected numbers and null for clear', () => {
    const onChoose = jest.fn();

    render(<NumberPad max={4} onChoose={onChoose} />);

    fireEvent.press(screen.getByLabelText('Enter 3'));
    fireEvent.press(screen.getByLabelText('Clear selected cell'));

    expect(onChoose).toHaveBeenNthCalledWith(1, 3);
    expect(onChoose).toHaveBeenNthCalledWith(2, null);
  });
});
