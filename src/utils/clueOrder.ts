import { BoardSize } from "../types";

export const clueOrder = (size: BoardSize, seed: number): number[] =>
    Array.from({ length: size * size }, (_value, index) => index).sort((left, right) => {
      const leftRank = (left * 37 + seed * 17) % (size * size + 7);
      const rightRank = (right * 37 + seed * 17) % (size * size + 7);
      return leftRank - rightRank || left - right;
    });