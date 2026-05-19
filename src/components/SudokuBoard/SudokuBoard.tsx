import { Pressable, Text, View } from 'react-native';

import { Board, BoardSize, Cell } from '../../types';
import { getBoxShape } from '../../utils/getBoxShape';
import styles from './styles';

type Props = {
  board: Board;
  size: BoardSize;
  selectedCell: { row: number; col: number } | null;
  onSelectCell: (cell: Cell) => void;
};

export function SudokuBoard({
  board,
  size,
  selectedCell,
  onSelectCell
}: Props) {
  const shape = getBoxShape(size);

  return (
    <View
      accessibilityLabel={`${size} by ${size} sudoku board`}
      style={styles.board}
      testID="sudoku-board"
    >
      {board.map((row) => (
        <View key={`row-${row[0]?.row ?? 0}`} style={styles.row}>
          {row.map((cell) => {
            const selected =
              selectedCell?.row === cell.row && selectedCell.col === cell.col;
            const editable = !cell.fixed;
            const rightBoxEdge =
              (cell.col + 1) % shape.cols === 0 && cell.col < size - 1;
            const bottomBoxEdge =
              (cell.row + 1) % shape.rows === 0 && cell.row < size - 1;

            return (
              <Pressable
                accessibilityLabel={`Row ${cell.row + 1}, column ${cell.col + 1}, ${
                  cell.value ? `value ${cell.value}` : 'empty'
                }`}
                accessibilityRole="button"
                accessibilityState={{ disabled: !editable, selected }}
                disabled={!editable}
                key={`${cell.row}-${cell.col}`}
                onPress={() => onSelectCell(cell)}
                style={[
                  styles.cell,
                  { width: `${100 / size}%`, aspectRatio: 1 },
                  cell.fixed && styles.fixedCell,
                  selected && styles.selectedCell,
                  rightBoxEdge && styles.rightBoxEdge,
                  bottomBoxEdge && styles.bottomBoxEdge
                ]}
                testID={`cell-${cell.row}-${cell.col}`}
              >
                <Text style={[styles.cellText, cell.fixed && styles.fixedText]}>
                  {cell.value ?? ''}
                </Text>
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}
