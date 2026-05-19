import { levels } from '../constants';
import { getLevelById } from './getLevelById';

describe('getLevelById', () => {
  it('returns a configured level by id', () => {
    expect(getLevelById('6x6-medium')).toEqual({
      id: '6x6-medium',
      size: 6,
      difficulty: 'medium',
      givens: 18
    });
  });

  it('finds every exported level', () => {
    levels.forEach((level) => {
      expect(getLevelById(level.id)).toBe(level);
    });
  });

  it('throws for unknown ids', () => {
    expect(() => getLevelById('not-a-level')).toThrow(
      'Unknown level: not-a-level'
    );
  });
});
