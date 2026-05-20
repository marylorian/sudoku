import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { LevelPicker } from '../LevelPicker';
import { difficulties, levels } from '../../constants';
import type { Difficulty, Level } from '../../types';
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
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty | null>(null);
  const filteredLevels = selectedDifficulty
    ? levels.filter((level) => level.difficulty === selectedDifficulty)
    : [];

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
          accessibilityLabel="Go to main menu"
          accessibilityRole="button"
          onPress={onBack}
          style={styles.iconButton}
          testID="back-to-menu-button"
        >
          <Text style={styles.iconButtonText}>←</Text>
        </Pressable>
      </View>

      <View style={styles.difficultySection}>
        <Text style={styles.sectionTitle}>Choose difficulty</Text>
        <View style={styles.difficultyOptions}>
          {difficulties.map((difficulty) => {
            const selected = difficulty === selectedDifficulty;

            return (
              <Pressable
                accessibilityLabel={`${difficulty} difficulty`}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                key={difficulty}
                onPress={() => setSelectedDifficulty(difficulty)}
                style={[
                  styles.difficultyButton,
                  selected && styles.selectedDifficultyButton
                ]}
                testID={`difficulty-${difficulty}`}
              >
                <Text
                  style={[
                    styles.difficultyButtonText,
                    selected && styles.selectedDifficultyButtonText
                  ]}
                >
                  {difficulty}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {selectedDifficulty ? (
        <View style={styles.levelSection} testID="filtered-levels">
          <Text style={styles.sectionTitle}>Choose level</Text>
          <LevelPicker
            levels={filteredLevels}
            selectedLevelId={selectedLevelId}
            onSelectLevel={onSelectLevel}
          />
        </View>
      ) : null}
    </View>
  );
}
