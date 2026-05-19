import { clueOrder } from './clueOrder';

describe('clueOrder', () => {
  it('returns a deterministic permutation of every board index', () => {
    const order = clueOrder(4, 1);

    expect(order).toHaveLength(16);
    expect(new Set(order).size).toBe(16);
    expect([...order].sort((left, right) => left - right)).toEqual(
      Array.from({ length: 16 }, (_value, index) => index)
    );
    expect(clueOrder(4, 1)).toEqual(order);
  });

  it('supports larger boards', () => {
    const order = clueOrder(9, 3);

    expect(order).toHaveLength(81);
    expect(new Set(order).size).toBe(81);
  });
});
