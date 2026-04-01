import { Image } from 'expo-image';
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { getPokemonImageUrl } from '@/api/pokeapi';
import { Spacing } from '@/constants/theme';

type PokemonCardProps = {
  id: number;
  name: string;
  onPress: () => void;
};

function formatId(id: number): string {
  return `#${String(id).padStart(3, '0')}`;
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function PokemonCard({ id, name, onPress }: PokemonCardProps) {
  return (
    <Pressable onPress={onPress} style={styles.pressable}>
      {({ pressed }) => (
        <ThemedView
          type="backgroundElement"
          style={[styles.card, pressed && styles.pressed]}
        >
          <Image
            source={getPokemonImageUrl(id)}
            style={styles.image}
            contentFit="contain"
            // transition={200}
          />
          <ThemedText style={styles.name} numberOfLines={1}>
            {capitalize(name)}
          </ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.id}>
            {formatId(id)}
          </ThemedText>
        </ThemedView>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
  },
  card: {
    alignItems: 'center',
    padding: Spacing.three,
    borderRadius: 12,
    gap: Spacing.one,
  },
  pressed: {
    opacity: 0.7,
  },
  image: {
    width: 80,
    height: 80,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 20,
  },
  id: {
    fontSize: 12,
  },
});
