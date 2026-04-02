import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ActivityIndicator, SectionList, StyleSheet, View } from 'react-native';

import { PokemonCard } from '@/components/pokemon-card';
import { SearchInput } from '@/components/search-input';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TypeColors } from '@/constants/pokemon-types';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { type PokemonEntry, usePokemonData } from '@/hooks/use-pokemon-data';

const NUM_COLUMNS = 3;

function chunk(arr: PokemonEntry[], size: number): PokemonEntry[][] {
  const rows: PokemonEntry[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    rows.push(arr.slice(i, i + size));
  }
  return rows;
}

export default function HomeScreen() {
  const { sections, isLoading, error } = usePokemonData();
  const [query, setQuery] = useState('');
  const router = useRouter();

  const filteredSections = useMemo(() => {
    const base = query.trim()
      ? sections
          .map((section) => ({
            ...section,
            data: section.data.filter((p) =>
              p.name.includes(query.toLowerCase()),
            ),
          }))
          .filter((s) => s.data.length > 0)
      : sections;

    return base.map((section) => ({
      typeName: section.typeName,
      data: chunk(section.data, NUM_COLUMNS),
    }));
  }, [sections, query]);

  if (isLoading) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator size="large" />
        <ThemedText
          themeColor="textSecondary"
          style={{ marginTop: Spacing.three }}
        >
          Loading Pokémon...
        </ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText>Error: {error}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <SectionList
        sections={filteredSections}
        keyExtractor={(item) => item.map((p) => p.id).join('-')}
        contentContainerStyle={styles.list}
        stickySectionHeadersEnabled
        ListHeaderComponent={
          <View style={styles.searchWrapper}>
            <SearchInput value={query} onChangeText={setQuery} />
          </View>
        }
        renderSectionHeader={({ section }) => (
          <ThemedView style={styles.sectionHeader}>
            <View
              style={[
                styles.typeDot,
                { backgroundColor: TypeColors[section.typeName] ?? '#888' },
              ]}
            />
            <ThemedText style={styles.sectionTitle}>
              {section.typeName}
            </ThemedText>
          </ThemedView>
        )}
        renderItem={({ item: row }) => (
          <View style={styles.row}>
            {row.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                onPress={() => router.push(`/pokemon/${pokemon.id}`)}
              />
            ))}
            {/* Fill remaining space if row is incomplete */}
            {row.length < NUM_COLUMNS &&
              Array.from({ length: NUM_COLUMNS - row.length }).map((_, i) => (
                <View key={`spacer-${i}`} style={styles.spacer} />
              ))}
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        SectionSeparatorComponent={() => (
          <View style={styles.sectionSeparator} />
        )}
      />
    </ThemedView>
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
  list: {
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.six,
    maxWidth: MaxContentWidth,
    width: '100%',
    alignSelf: 'center',
  },
  searchWrapper: {
    paddingVertical: Spacing.three,
    gap: Spacing.two,
  },
  storybookLink: {
    backgroundColor: '#ff4785',
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: 8,
    alignItems: 'center',
  },
  storybookLinkText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.one,
  },
  typeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  spacer: {
    flex: 1,
  },
  separator: {
    height: Spacing.two,
  },
  sectionSeparator: {
    height: Spacing.two,
  },
});
