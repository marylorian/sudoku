import { useEffect, useMemo, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { GameResultModal } from '../GameResultModal';
import { LevelPicker } from '../LevelPicker';
import { MainMenu } from '../MainMenu';
import { NumberPad } from '../NumberPad';
import { SudokuBoard } from '../SudokuBoard';
import styles from './styles';
import { levels } from '../../constants';
import { Board, Cell, GameResult, Level } from '../../types';
import { createBoard } from '../../utils/createBoard';
import { isBoardComplete } from '../../utils/isBoardComplete';
import { updateCell } from '../../utils/updateCell';
import { getLevelById } from '../../utils/getLevelById';

const initialLevel = getLevelById('4x4-easy');

type Screen = 'menu' | 'game';

const getNextUnsolvedLevel = (solvedLevelIds: Set<string>): Level =>
  levels.find((item) => !solvedLevelIds.has(item.id)) ?? levels[0]!;

const getLevelAfter = (level: Level): Level | null => {
  const nextIndex = levels.findIndex((item) => item.id === level.id) + 1;
  return levels[nextIndex] ?? null;
};

export function App() {
  const [screen, setScreen] = useState<Screen>('menu');
  const [level, setLevel] = useState<Level>(initialLevel);
  const [board, setBoard] = useState<Board>(() => createBoard(initialLevel));
  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [showMenuLevelPicker, setShowMenuLevelPicker] = useState(false);
  const [solvedLevelIds, setSolvedLevelIds] = useState<Set<string>>(
    () => new Set()
  );
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const complete = useMemo(() => isBoardComplete(board), [board]);
  const nextUnsolvedLevel = useMemo(
    () => getNextUnsolvedLevel(solvedLevelIds),
    [solvedLevelIds]
  );
  const nextSequentialLevel = useMemo(() => getLevelAfter(level), [level]);
  const emptyCells = useMemo(
    () => board.flat().filter((cell) => cell.value === null).length,
    [board]
  );

  useEffect(() => {
    if (screen !== 'game' || gameResult) {
      return;
    }

    if (complete) {
      setSolvedLevelIds((currentLevelIds) => {
        const nextLevelIds = new Set(currentLevelIds);
        nextLevelIds.add(level.id);
        return nextLevelIds;
      });
      setGameResult('won');
      return;
    }

    if (emptyCells === 0) {
      setGameResult('lost');
    }
  }, [complete, emptyCells, gameResult, level.id, screen]);

  const startLevel = (nextLevel: Level) => {
    setLevel(nextLevel);
    setBoard(createBoard(nextLevel));
    setSelectedCell(null);
    setGameResult(null);
    setShowResetConfirm(false);
    setScreen('game');
  };

  const selectLevel = (nextLevel: Level) => {
    startLevel(nextLevel);
    setShowMenuLevelPicker(false);
  };

  const openMainMenu = () => {
    setScreen('menu');
    setGameResult(null);
    setShowResetConfirm(false);
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

  const retryLevel = () => {
    startLevel(level);
  };

  const resetBoard = () => {
    setBoard(createBoard(level));
    setSelectedCell(null);
    setShowResetConfirm(false);
  };

  const startNextUnsolvedLevel = () => {
    startLevel(nextUnsolvedLevel);
  };

  const startNextSequentialLevel = () => {
    if (nextSequentialLevel) {
      startLevel(nextSequentialLevel);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container}>
        {screen === 'menu' ? (
          <MainMenu
            nextLevel={nextUnsolvedLevel}
            selectedLevelId={level.id}
            showLevelPicker={showMenuLevelPicker}
            onSelectLevel={selectLevel}
            onStartNextLevel={startNextUnsolvedLevel}
            onToggleLevelPicker={() =>
              setShowMenuLevelPicker((currentValue) => !currentValue)
            }
          />
        ) : (
          <>
            <View style={styles.header}>
              <Text accessibilityRole="header" style={styles.title}>
                Sudoku Levels
              </Text>
              <Text style={styles.subtitle}>
                {level.size} x {level.size} board, {level.difficulty} difficulty
              </Text>
            </View>

            <View style={styles.gameActions}>
              <Pressable
                accessibilityRole="button"
                onPress={openMainMenu}
                style={styles.secondaryButton}
                testID="game-main-menu-button"
              >
                <Text style={styles.secondaryButtonText}>Main menu</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                onPress={() => setShowResetConfirm(true)}
                style={styles.secondaryButton}
                testID="reset-board-button"
              >
                <Text style={styles.secondaryButtonText}>Reset board</Text>
              </Pressable>
            </View>

            <LevelPicker
              selectedLevelId={level.id}
              onSelectLevel={selectLevel}
            />

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
          </>
        )}
      </ScrollView>
      <GameResultModal
        hasNextLevel={Boolean(nextSequentialLevel)}
        level={level}
        result={gameResult}
        onMainMenu={openMainMenu}
        onNextLevel={startNextSequentialLevel}
        onRetry={retryLevel}
      />
      {showResetConfirm ? (
        <View
          accessibilityLabel="Reset board confirmation"
          accessibilityRole="alert"
          style={styles.confirmOverlay}
          testID="reset-confirmation"
        >
          <View style={styles.confirmDialog}>
            <Text accessibilityRole="header" style={styles.confirmTitle}>
              Reset board?
            </Text>
            <Text style={styles.confirmMessage}>
              This will clear every number you added and keep the original
              puzzle clues.
            </Text>
            <View style={styles.confirmActions}>
              <Pressable
                accessibilityRole="button"
                onPress={resetBoard}
                style={styles.dangerButton}
                testID="confirm-reset-button"
              >
                <Text style={styles.dangerButtonText}>Reset</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                onPress={() => setShowResetConfirm(false)}
                style={styles.secondaryButton}
                testID="cancel-reset-button"
              >
                <Text style={styles.secondaryButtonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
}
