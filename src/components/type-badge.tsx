import { StyleSheet, View } from 'react-native';

import { ThemedText } from './themed-text';

import { TypeColors } from '@/constants/pokemon-types';
import { Spacing } from '@/constants/theme';

type TypeBadgeProps = {
  typeName: string;
};

export function TypeBadge({ typeName }: TypeBadgeProps) {
  const color = TypeColors[typeName] ?? '#888';

  return (
    <View style={[styles.badge, { backgroundColor: color }]}>
      <ThemedText style={styles.text}>{typeName}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: 12,
  },
  text: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
