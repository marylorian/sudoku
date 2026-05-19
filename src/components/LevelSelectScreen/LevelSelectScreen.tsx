import { Pressable, Text, View } from 'react-native';

import { LevelPicker } from '../LevelPicker';
import type { Level } from '../../types';
import styles from './styles';

type Props = {
  selectedLevelId: string;
  onBack: () => void;
  onSelectLevel: (level: Level) => void;
};

export function LevelSelectScreen({
  selectedLevelId,
  onBack,
  onSelectLevel
}: Props) {
  return (
    <View style={styles.wrapper} testID="level-select-screen">
      <View style={styles.header}>
        <Text accessibilityRole="header" style={styles.title}>
          Choose from existing levels
        </Text>
        <Text style={styles.subtitle}>
          Pick any available board size and difficulty.
        </Text>
      </View>

      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          onPress={onBack}
          style={styles.secondaryButton}
          testID="back-to-menu-button"
        >
          <Text style={styles.secondaryButtonText}>Main menu</Text>
        </Pressable>
      </View>

      <LevelPicker
        selectedLevelId={selectedLevelId}
        onSelectLevel={onSelectLevel}
      />
    </View>
  );
}
