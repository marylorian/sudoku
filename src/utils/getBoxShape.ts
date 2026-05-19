import { BoardSize, BoxShape } from "../types";

const boxShapes: Record<BoardSize, BoxShape> = {
    4: { rows: 2, cols: 2 },
    6: { rows: 2, cols: 3 },
    9: { rows: 3, cols: 3 }
};

export const getBoxShape = (size: BoardSize): BoxShape => boxShapes[size];