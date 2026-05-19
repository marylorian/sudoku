import { getBoxShape } from './getBoxShape';

describe('getBoxShape', () => {
  it('returns the expected region shapes for every board size', () => {
    expect(getBoxShape(4)).toEqual({ rows: 2, cols: 2 });
    expect(getBoxShape(6)).toEqual({ rows: 2, cols: 3 });
    expect(getBoxShape(9)).toEqual({ rows: 3, cols: 3 });
  });
});
