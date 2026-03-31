import { useEffect, useState } from 'react';

import { fetchTypeDetail, fetchTypes, parseIdFromUrl } from '@/api/pokeapi';

export type PokemonEntry = {
  id: number;
  name: string;
};

export type TypeSection = {
  typeName: string;
  data: PokemonEntry[];
};

const EXCLUDED_TYPES = new Set(['shadow', 'stellar', 'unknown']);

export function usePokemonData() {
  const [sections, setSections] = useState<TypeSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const typeList = await fetchTypes();
        const validTypes = typeList.results.filter((t) => !EXCLUDED_TYPES.has(t.name));

        const details = await Promise.all(validTypes.map((t) => fetchTypeDetail(t.name)));

        if (cancelled) return;

        const result: TypeSection[] = details
          .map((detail) => ({
            typeName: detail.name,
            data: detail.pokemon
              .map((p) => ({
                id: parseIdFromUrl(p.pokemon.url),
                name: p.pokemon.name,
              }))
              .filter((p) => p.id <= 1025) // filter to main series pokemon
              .sort((a, b) => a.id - b.id),
          }))
          .filter((s) => s.data.length > 0)
          .sort((a, b) => a.typeName.localeCompare(b.typeName));

        setSections(result);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Failed to load pokemon data');
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { sections, isLoading, error };
}
