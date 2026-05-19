import { Board } from "../types";

export const updateCell = (board: Board, row: number, col: number, value: number | null): Board =>
    board.map((boardRow, rowIndex) =>
      boardRow.map((cell, colIndex) => {
        if (rowIndex !== row || colIndex !== col || cell.fixed) {
          return cell;
        }
  
        return {
          ...cell,
          value
        };
      })
    );