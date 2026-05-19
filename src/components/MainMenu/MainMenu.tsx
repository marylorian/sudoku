import { Pressable, Text, View } from 'react-native';

import type { Level } from '../../types';
import styles from './styles';

type Props = {
  nextLevel: Level;
  onStartNextLevel: () => void;
  onChooseLevel: () => void;
};

export function MainMenu({
  nextLevel,
  onStartNextLevel,
  onChooseLevel
}: Props) {
  return (
    <View style={styles.wrapper} testID="main-menu">
      <View style={styles.hero}>
        <Text accessibilityRole="header" style={styles.title}>
          Sudoku Levels
        </Text>
        <Text style={styles.subtitle}>
          Next up: {nextLevel.size} x {nextLevel.size}, {nextLevel.difficulty}{' '}
          difficulty
        </Text>
      </View>

      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          onPress={onStartNextLevel}
          style={styles.primaryButton}
          testID="start-next-level"
        >
          <Text style={styles.primaryButtonText}>Let's go</Text>
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
