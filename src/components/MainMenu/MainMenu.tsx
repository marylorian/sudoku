import { Pressable, Text, View } from 'react-native';

import type { Level } from '../../types';
import styles from './styles';

type Props = {
  primaryLevel: Level;
  shouldContinue: boolean;
  onPrimaryAction: () => void;
  onChooseLevel: () => void;
};

export function MainMenu({
  primaryLevel,
  shouldContinue,
  onPrimaryAction,
  onChooseLevel
}: Props) {
  return (
    <View style={styles.wrapper} testID="main-menu">
      <View style={styles.hero}>
        <Text accessibilityRole="header" style={styles.title}>
          Sudoku Levels
        </Text>
        <Text style={styles.subtitle}>
          {shouldContinue ? 'In progress' : 'Next up'}: {primaryLevel.size} x{' '}
          {primaryLevel.size}, {primaryLevel.difficulty} difficulty
        </Text>
      </View>

      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          onPress={onPrimaryAction}
          style={styles.primaryButton}
          testID="start-next-level"
        >
          <Text style={styles.primaryButtonText}>
            {shouldContinue ? 'Continue' : "Let's go"}
          </Text>
          {shouldContinue ? (
            <Text style={styles.primaryButtonMeta}>
              {primaryLevel.size} x {primaryLevel.size},{' '}
              {primaryLevel.difficulty}
            </Text>
          ) : null}
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={onChooseLevel}
          style={styles.secondaryButton}
          testID="choose-level-button"
        >
          <Text style={styles.secondaryButtonText}>Choose a level</Text>
        </Pressable>
      </View>
    </View>
  );
}
