import AsyncStorage from '@react-native-async-storage/async-storage';

import type { ProgressState } from '../types';

const progressStorageKey = 'sudoku-levels:progress';

export const emptyProgressState: ProgressState = {
  finishedLevelIds: [],
  seenLevelIds: [],
  inProgress: null
};

const normalizeStringList = (value: unknown): string[] =>
  Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string')
    : [];

export const loadProgressState = async (): Promise<ProgressState> => {
  const rawState = await AsyncStorage.getItem(progressStorageKey);

  if (!rawState) {
    return emptyProgressState;
  }

  try {
    const parsedState = JSON.parse(rawState) as Partial<ProgressState>;

    return {
      finishedLevelIds: normalizeStringList(parsedState.finishedLevelIds),
      seenLevelIds: normalizeStringList(parsedState.seenLevelIds),
      inProgress: parsedState.inProgress ?? null
    };
  } catch {
    return emptyProgressState;
  }
};

export const saveProgressState = async (
  progressState: ProgressState
): Promise<void> => {
  await AsyncStorage.setItem(progressStorageKey, JSON.stringify(progressState));
};
