import { Pressable, Text, View } from 'react-native';
import styles from './styles';

type Props = {
  max: number;
  onChoose: (value: number | null) => void;
};

export function NumberPad({ max, onChoose }: Props) {
  return (
    <View accessibilityLabel="Number pad" style={styles.wrapper} testID="number-pad">
      {Array.from({ length: max }, (_item, index) => {
        const value = index + 1;

        return (
          <Pressable
            accessibilityLabel={`Enter ${value}`}
            accessibilityRole="button"
            key={value}
            onPress={() => onChoose(value)}
            style={styles.key}
            testID={`number-${value}`}
          >
            <Text style={styles.keyText}>{value}</Text>
          </Pressable>
        );
      })}
      <Pressable
        accessibilityLabel="Clear selected cell"
        accessibilityRole="button"
        onPress={() => onChoose(null)}
        style={[styles.key, styles.clearKey]}
        testID="number-clear"
      >
        <Text style={[styles.keyText, styles.clearText]}>Clear</Text>
      </Pressable>
    </View>
  );
}
