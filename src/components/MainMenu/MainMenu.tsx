import { Pressable, Text, View } from 'react-native';

import { LevelPicker } from '../LevelPicker';
import type { Level } from '../../types';
import styles from './styles';

type Props = {
  nextLevel: Level;
  selectedLevelId: string;
  showLevelPicker: boolean;
  onStartNextLevel: () => void;
  onToggleLevelPicker: () => void;
  onSelectLevel: (level: Level) => void;
};

export function MainMenu({
  nextLevel,
  selectedLevelId,
  showLevelPicker,
  onStartNextLevel,
  onToggleLevelPicker,
  onSelectLevel
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
          onPress={onToggleLevelPicker}
          style={styles.secondaryButton}
          testID="choose-level-button"
        >
          <Text style={styles.secondaryButtonText}>Choose a level</Text>
        </Pressable>
      </View>

      {showLevelPicker ? (
        <View style={styles.levelSection} testID="main-menu-levels">
          <Text style={styles.sectionTitle}>Choose from existing levels</Text>
          <LevelPicker
            selectedLevelId={selectedLevelId}
            onSelectLevel={onSelectLevel}
          />
        </View>
      ) : null}
    </View>
  );
}
