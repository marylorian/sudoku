import { Modal, Pressable, Text, View } from 'react-native';

import type { GameResult, Level } from '../../types';
import styles from './styles';

type Props = {
  result: GameResult | null;
  level: Level;
  hasNextLevel: boolean;
  onNextLevel: () => void;
  onRetry: () => void;
  onMainMenu: () => void;
};

export function GameResultModal({
  result,
  level,
  hasNextLevel,
  onNextLevel,
  onRetry,
  onMainMenu
}: Props) {
  const won = result === 'won';

  return (
    <Modal animationType="fade" transparent visible={result !== null}>
      <View
        accessibilityLabel={won ? 'Game won dialog' : 'Game lost dialog'}
        accessibilityRole="alert"
        style={styles.overlay}
        testID="game-result-modal"
      >
        <View style={styles.dialog}>
          <Text accessibilityRole="header" style={styles.title}>
            {won ? 'Congratulations!' : 'Not quite'}
          </Text>
          <Text style={styles.message}>
            {won
              ? `You solved the ${level.size} x ${level.size} ${level.difficulty} level.`
              : `The ${level.size} x ${level.size} ${level.difficulty} board is full, but something is off.`}
          </Text>

          <View style={styles.actions}>
            {won ? (
              <Pressable
                accessibilityRole="button"
                disabled={!hasNextLevel}
                onPress={onNextLevel}
                style={styles.primaryButton}
                testID="next-level-button"
              >
                <Text style={styles.primaryButtonText}>
                  {hasNextLevel ? 'Next level' : 'All levels solved'}
                </Text>
              </Pressable>
            ) : (
              <Pressable
                accessibilityLabel="Retry"
                accessibilityRole="button"
                onPress={onRetry}
                style={styles.primaryButton}
                testID="retry-button"
              >
                <Text style={styles.primaryButtonText}>↻ Retry</Text>
              </Pressable>
            )}

            <Pressable
              accessibilityRole="button"
              onPress={onMainMenu}
              style={styles.secondaryButton}
              testID="main-menu-button"
            >
              <Text style={styles.secondaryButtonText}>Go to main menu</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
