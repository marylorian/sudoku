import { useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { GameResultModal } from '../GameResultModal';
import { LevelSelectScreen } from '../LevelSelectScreen';
import { MainMenu } from '../MainMenu';
import { NumberPad } from '../NumberPad';
import { SudokuBoard } from '../SudokuBoard';
import styles from './styles';
import { levels } from '../../constants';
import { Board, Cell, GameResult, InProgressLevel, Level } from '../../types';
import { createBoard } from '../../utils/createBoard';
import { isBoardComplete } from '../../utils/isBoardComplete';
import { updateCell } from '../../utils/updateCell';
import { getLevelById } from '../../utils/getLevelById';
import {
  loadProgressState,
  saveProgressState
} from '../../utils/progressStorage';

const initialLevel = getLevelById('4x4-easy');

type Screen = 'menu' | 'levelSelect' | 'game';

const getNextLevelToSee = (
  seenLevelIds: Set<string>,
  finishedLevelIds: Set<string>
): Level =>
  levels.find((item) => !seenLevelIds.has(item.id)) ??
  levels.find((item) => !finishedLevelIds.has(item.id)) ??
  levels[0]!;

const getLevelAfter = (level: Level): Level | null => {
  const nextIndex = levels.findIndex((item) => item.id === level.id) + 1;
  return levels[nextIndex] ?? null;
};

export function App() {
  const userInteractedRef = useRef(false);
  const [screen, setScreen] = useState<Screen>('menu');
  const [level, setLevel] = useState<Level>(initialLevel);
  const [board, setBoard] = useState<Board>(() => createBoard(initialLevel));
  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [finishedLevelIds, setFinishedLevelIds] = useState<Set<string>>(
    () => new Set()
  );
  const [seenLevelIds, setSeenLevelIds] = useState<Set<string>>(
    () => new Set()
  );
  const [inProgressLevel, setInProgressLevel] =
    useState<InProgressLevel | null>(null);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [loadedProgress, setLoadedProgress] = useState(false);

  const complete = useMemo(() => isBoardComplete(board), [board]);
  const nextLevelToSee = useMemo(
    () => getNextLevelToSee(seenLevelIds, finishedLevelIds),
    [finishedLevelIds, seenLevelIds]
  );
  const continueLevel = useMemo(() => {
    if (!inProgressLevel || finishedLevelIds.has(inProgressLevel.levelId)) {
      return null;
    }

    try {
      return getLevelById(inProgressLevel.levelId);
    } catch {
      return null;
    }
  }, [finishedLevelIds, inProgressLevel]);
  const primaryMenuLevel = continueLevel ?? nextLevelToSee;
  const nextSequentialLevel = useMemo(() => getLevelAfter(level), [level]);
  const emptyCells = useMemo(
    () => board.flat().filter((cell) => cell.value === null).length,
    [board]
  );

  useEffect(() => {
    let active = true;

    void loadProgressState().then((progressState) => {
      if (!active) {
        return;
      }

      if (!userInteractedRef.current) {
        const nextFinishedLevelIds = new Set(progressState.finishedLevelIds);
        setFinishedLevelIds(nextFinishedLevelIds);
        setSeenLevelIds(new Set(progressState.seenLevelIds));

        if (
          progressState.inProgress &&
          !nextFinishedLevelIds.has(progressState.inProgress.levelId)
        ) {
          setInProgressLevel(progressState.inProgress);
        }
      }

      setLoadedProgress(true);
    });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!loadedProgress) {
      return;
    }

    void saveProgressState({
      finishedLevelIds: Array.from(finishedLevelIds),
      seenLevelIds: Array.from(seenLevelIds),
      inProgress: inProgressLevel
    });
  }, [finishedLevelIds, inProgressLevel, loadedProgress, seenLevelIds]);

  useEffect(() => {
    if (screen !== 'game' || gameResult) {
      return;
    }

    if (complete) {
      setFinishedLevelIds((currentLevelIds) => {
        const nextLevelIds = new Set(currentLevelIds);
        nextLevelIds.add(level.id);
        return nextLevelIds;
      });
      setInProgressLevel(null);
      setGameResult('won');
      return;
    }

    if (emptyCells === 0) {
      setGameResult('lost');
    }
  }, [complete, emptyCells, gameResult, level.id, screen]);

  const startLevel = (nextLevel: Level, nextBoard = createBoard(nextLevel)) => {
    userInteractedRef.current = true;
    setLevel(nextLevel);
    setBoard(nextBoard);
    setSelectedCell(null);
    setGameResult(null);
    setShowResetConfirm(false);
    setSeenLevelIds((currentLevelIds) => {
      const nextLevelIds = new Set(currentLevelIds);
      nextLevelIds.add(nextLevel.id);
      return nextLevelIds;
    });
    setInProgressLevel({
      levelId: nextLevel.id,
      board: nextBoard
    });
    setScreen('game');
  };

  const selectLevel = (nextLevel: Level) => {
    startLevel(nextLevel);
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

    setBoard((currentBoard) => {
      const nextBoard = updateCell(
        currentBoard,
        selectedCell.row,
        selectedCell.col,
        value
      );

      setInProgressLevel({
        levelId: level.id,
        board: nextBoard
      });

      return nextBoard;
    });
  };

  const retryLevel = () => {
    startLevel(level);
  };

  const resetBoard = () => {
    const nextBoard = createBoard(level);
    setBoard(nextBoard);
    setInProgressLevel({
      levelId: level.id,
      board: nextBoard
    });
    setSelectedCell(null);
    setShowResetConfirm(false);
  };

  const startPrimaryMenuLevel = () => {
    if (continueLevel && inProgressLevel) {
      startLevel(continueLevel, inProgressLevel.board);
      return;
    }

    startLevel(nextLevelToSee);
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
            primaryLevel={primaryMenuLevel}
            shouldContinue={Boolean(continueLevel)}
            onChooseLevel={() => setScreen('levelSelect')}
            onPrimaryAction={startPrimaryMenuLevel}
          />
        ) : screen === 'levelSelect' ? (
          <LevelSelectScreen
            selectedLevelId={level.id}
            onBack={openMainMenu}
            onSelectLevel={selectLevel}
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
                accessibilityLabel="Go to main menu"
                accessibilityRole="button"
                onPress={openMainMenu}
                style={styles.iconButton}
                testID="game-main-menu-button"
              >
                <Text style={styles.iconButtonText}>←</Text>
              </Pressable>
              <Pressable
                accessibilityLabel="Reset board"
                accessibilityRole="button"
                onPress={() => setShowResetConfirm(true)}
                style={styles.iconButton}
                testID="reset-board-button"
              >
                <Text style={styles.iconButtonText}>↻</Text>
              </Pressable>
            </View>

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
                style={[styles.secondaryButton, styles.confirmButton]}
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
