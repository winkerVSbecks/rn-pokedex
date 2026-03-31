import { StyleSheet, TextInput } from 'react-native';

import { ThemedView } from './themed-view';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type SearchInputProps = {
  value: string;
  onChangeText: (text: string) => void;
};

export function SearchInput({ value, onChangeText }: SearchInputProps) {
  const theme = useTheme();

  return (
    <ThemedView type="backgroundElement" style={styles.container}>
      <TextInput
        style={[styles.input, { color: theme.text }]}
        placeholder="Search Pokémon..."
        placeholderTextColor={theme.textSecondary}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  input: {
    fontSize: 16,
    lineHeight: 24,
    padding: Spacing.one,
  },
});
