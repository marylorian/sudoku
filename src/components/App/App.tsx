import { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { LevelPicker } from '../LevelPicker';
import { NumberPad } from '../NumberPad';
import { SudokuBoard } from '../SudokuBoard';
import styles from './styles';
import { Board, Cell, Level } from '../../types';
import { createBoard } from '../../utils/createBoard';
import { isBoardComplete } from '../../utils/isBoardComplete';
import { updateCell } from '../../utils/updateCell';
import { getLevelById } from '../../utils/getLevelById';

const initialLevel = getLevelById('4x4-easy');

export function App() {
  const [level, setLevel] = useState<Level>(initialLevel);
  const [board, setBoard] = useState<Board>(() => createBoard(initialLevel));
  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);

  const complete = useMemo(() => isBoardComplete(board), [board]);
  const emptyCells = useMemo(
    () => board.flat().filter((cell) => cell.value === null).length,
    [board]
  );

  const selectLevel = (nextLevel: Level) => {
    setLevel(nextLevel);
    setBoard(createBoard(nextLevel));
    setSelectedCell(null);
  };

  const selectCell = (cell: Cell) => {
    setSelectedCell({ row: cell.row, col: cell.col });
  };

  const chooseNumber = (value: number | null) => {
    if (!selectedCell) {
      return;
    }

    setBoard((currentBoard) =>
      updateCell(currentBoard, selectedCell.row, selectedCell.col, value)
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text accessibilityRole="header" style={styles.title}>
            Sudoku Levels
          </Text>
          <Text style={styles.subtitle}>
            {level.size} x {level.size} board, {level.difficulty} difficulty
          </Text>
        </View>

        <LevelPicker selectedLevelId={level.id} onSelectLevel={selectLevel} />

        <View style={styles.statusRow}>
          <Text
            accessibilityLabel={`${emptyCells} empty cells remaining`}
            style={styles.statusText}
            testID="empty-cells"
          >
            Empty: {emptyCells}
          </Text>
          <Text
            accessibilityLiveRegion="polite"
            style={styles.statusText}
            testID="completion-status"
          >
            {complete ? 'Solved' : 'In progress'}
          </Text>
        </View>

        <SudokuBoard
          board={board}
          selectedCell={selectedCell}
          size={level.size}
          onSelectCell={selectCell}
        />
        <NumberPad max={level.size} onChoose={chooseNumber} />
      </ScrollView>
    </SafeAreaView>
  );
}
