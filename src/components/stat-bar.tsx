import { StyleSheet, View } from 'react-native';

import { ThemedText } from './themed-text';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type StatBarProps = {
  label: string;
  value: number;
  maxValue?: number;
  color?: string;
};

export function StatBar({ label, value, maxValue = 255, color = '#4CAF50' }: StatBarProps) {
  const theme = useTheme();
  const percent = Math.min((value / maxValue) * 100, 100);

  return (
    <View style={styles.row}>
      <ThemedText themeColor="textSecondary" style={styles.label}>
        {label}
      </ThemedText>
      <ThemedText style={styles.value}>{value}</ThemedText>
      <View style={[styles.barBg, { backgroundColor: theme.backgroundElement }]}>
        <View style={[styles.barFill, { width: `${percent}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  label: {
    width: 50,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  value: {
    width: 32,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
  },
  barBg: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
});
