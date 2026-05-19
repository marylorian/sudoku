import { levels } from "../constants";
import { Level } from "../types";

export const getLevelById = (id: string): Level => {
    const level = levels.find((item) => item.id === id);
  
    if (!level) {
      throw new Error(`Unknown level: ${id}`);
    }
  
    return level;
  };