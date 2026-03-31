import { Image } from 'expo-image';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';

import { fetchPokemon, getPokemonImageUrl, type PokemonDetailResponse } from '@/api/pokeapi';
import { StatBar } from '@/components/stat-bar';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TypeBadge } from '@/components/type-badge';
import { TypeColors } from '@/constants/pokemon-types';
import { MaxContentWidth, Spacing } from '@/constants/theme';

const STAT_LABELS: Record<string, string> = {
  hp: 'HP',
  attack: 'ATK',
  defense: 'DEF',
  'special-attack': 'SpAtk',
  'special-defense': 'SpDef',
  speed: 'SPD',
};

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatId(id: number): string {
  return `#${String(id).padStart(3, '0')}`;
}

export default function PokemonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<PokemonDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await fetchPokemon(Number(id));
        if (!cancelled) setPokemon(data);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (isLoading) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  if (error || !pokemon) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText>Error: {error ?? 'Not found'}</ThemedText>
      </ThemedView>
    );
  }

  const primaryType = pokemon.types[0]?.type.name;
  const statColor = TypeColors[primaryType] ?? '#4CAF50';

  return (
    <>
      <Stack.Screen options={{ title: capitalize(pokemon.name) }} />
      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll}>
          {/* Image */}
          <View style={styles.imageContainer}>
            <Image
              source={getPokemonImageUrl(pokemon.id)}
              style={styles.image}
              contentFit="contain"
              transition={300}
            />
          </View>

          {/* Name & ID */}
          <View style={styles.header}>
            <ThemedText style={styles.name}>{capitalize(pokemon.name)}</ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.id}>
              {formatId(pokemon.id)}
            </ThemedText>
          </View>

          {/* Types */}
          <View style={styles.typesRow}>
            {pokemon.types.map((t) => (
              <TypeBadge key={t.type.name} typeName={t.type.name} />
            ))}
          </View>

          {/* Physical Info */}
          <ThemedView type="backgroundElement" style={styles.infoCard}>
            <View style={styles.infoItem}>
              <ThemedText style={styles.infoValue}>{(pokemon.height / 10).toFixed(1)} m</ThemedText>
              <ThemedText themeColor="textSecondary" type="small">
                Height
              </ThemedText>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoItem}>
              <ThemedText style={styles.infoValue}>
                {(pokemon.weight / 10).toFixed(1)} kg
              </ThemedText>
              <ThemedText themeColor="textSecondary" type="small">
                Weight
              </ThemedText>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoItem}>
              <ThemedText style={styles.infoValue}>{pokemon.base_experience ?? '—'}</ThemedText>
              <ThemedText themeColor="textSecondary" type="small">
                Base Exp
              </ThemedText>
            </View>
          </ThemedView>

          {/* Stats */}
          <ThemedText style={styles.sectionLabel}>Base Stats</ThemedText>
          <ThemedView type="backgroundElement" style={styles.statsCard}>
            {pokemon.stats.map((s) => (
              <StatBar
                key={s.stat.name}
                label={STAT_LABELS[s.stat.name] ?? s.stat.name}
                value={s.base_stat}
                color={statColor}
              />
            ))}
          </ThemedView>

          {/* Abilities */}
          <ThemedText style={styles.sectionLabel}>Abilities</ThemedText>
          <ThemedView type="backgroundElement" style={styles.abilitiesCard}>
            {pokemon.abilities.map((a) => (
              <View key={a.ability.name} style={styles.abilityRow}>
                <ThemedText style={styles.abilityName}>{capitalize(a.ability.name)}</ThemedText>
                {a.is_hidden && (
                  <ThemedText themeColor="textSecondary" type="small">
                    Hidden
                  </ThemedText>
                )}
              </View>
            ))}
          </ThemedView>
        </ScrollView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scroll: {
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.six,
    maxWidth: MaxContentWidth,
    width: '100%',
    alignSelf: 'center',
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: Spacing.four,
  },
  image: {
    width: 240,
    height: 240,
  },
  header: {
    alignItems: 'center',
    gap: Spacing.one,
  },
  name: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
  },
  id: {
    fontSize: 18,
    fontWeight: '600',
  },
  typesRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginTop: Spacing.three,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: Spacing.four,
    marginTop: Spacing.four,
    width: '100%',
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.one,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: '#ccc',
    opacity: 0.3,
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginTop: Spacing.four,
    marginBottom: Spacing.two,
  },
  statsCard: {
    borderRadius: 16,
    padding: Spacing.four,
    width: '100%',
    gap: Spacing.three,
  },
  abilitiesCard: {
    borderRadius: 16,
    padding: Spacing.four,
    width: '100%',
    gap: Spacing.two,
  },
  abilityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  abilityName: {
    fontSize: 16,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
});
