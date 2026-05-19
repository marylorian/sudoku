import { Board, Level } from "../types";
import { clueOrder } from "./clueOrder";
import { createSolution } from "./createSolution";

const offsetByDifficulty = {
    easy: 1,
    medium: 2,
    hard: 3
};

export const createBoard = (level: Level): Board => {
    const solution = createSolution(level.size);
    const visible = new Set(clueOrder(level.size, offsetByDifficulty[level.difficulty]).slice(0, level.givens));

    return solution.map((rowValues, row) =>
        rowValues.map((solutionValue, col) => {
            const index = row * level.size + col;
            const fixed = visible.has(index);

            return {
                row,
                col,
                value: fixed ? solutionValue : null,
                solution: solutionValue,
                fixed
            };
        })
    );
};