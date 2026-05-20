import AsyncStorage from '@react-native-async-storage/async-storage';

import { createBoard } from './createBoard';
import { getLevelById } from './getLevelById';
import {
  emptyProgressState,
  loadProgressState,
  saveProgressState
} from './progressStorage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn()
}));

const mockedAsyncStorage = jest.mocked(AsyncStorage);

describe('progressStorage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns empty progress when nothing has been stored', async () => {
    mockedAsyncStorage.getItem.mockResolvedValue(null);

    await expect(loadProgressState()).resolves.toEqual(emptyProgressState);
  });

  it('normalizes stored progress', async () => {
    const board = createBoard(getLevelById('4x4-easy'));
    mockedAsyncStorage.getItem.mockResolvedValue(
      JSON.stringify({
        finishedLevelIds: ['4x4-easy', 42],
        seenLevelIds: ['4x4-easy', '4x4-medium'],
        inProgress: {
          levelId: '4x4-medium',
          board
        }
      })
    );

    await expect(loadProgressState()).resolves.toEqual({
      finishedLevelIds: ['4x4-easy'],
      seenLevelIds: ['4x4-easy', '4x4-medium'],
      inProgress: {
        levelId: '4x4-medium',
        board
      }
    });
  });

  it('saves progress as JSON', async () => {
    mockedAsyncStorage.setItem.mockResolvedValue();

    await saveProgressState({
      finishedLevelIds: ['4x4-easy'],
      seenLevelIds: ['4x4-easy'],
      inProgress: null
    });

    expect(mockedAsyncStorage.setItem).toHaveBeenCalledWith(
      'sudoku-levels:progress',
      JSON.stringify({
        finishedLevelIds: ['4x4-easy'],
        seenLevelIds: ['4x4-easy'],
        inProgress: null
      })
    );
  });
});
