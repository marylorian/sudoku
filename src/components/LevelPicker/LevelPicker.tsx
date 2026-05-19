import { Pressable, Text, View } from 'react-native';

import styles from './styles';
import { Level } from '../../types';
import { levels } from '../../constants';

type Props = {
  selectedLevelId: string;
  onSelectLevel: (level: Level) => void;
};

const titleForLevel = (level: Level): string => `${level.size} x ${level.size}`;

export function LevelPicker({ selectedLevelId, onSelectLevel }: Props) {
  return (
    <View accessibilityRole="tablist" style={styles.wrapper}>
      {levels.map((level) => {
        const selected = level.id === selectedLevelId;

        return (
          <Pressable
            accessibilityLabel={`${titleForLevel(level)} ${level.difficulty} level`}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            key={level.id}
            onPress={() => onSelectLevel(level)}
            style={[styles.levelButton, selected && styles.selectedLevel]}
            testID={`level-${level.id}`}
          >
            <Text style={[styles.levelTitle, selected && styles.selectedText]}>
              {titleForLevel(level)}
            </Text>
            <Text style={[styles.levelMeta, selected && styles.selectedText]}>
              {level.difficulty}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
