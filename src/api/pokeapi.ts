const BASE_URL = 'https://pokeapi.co/api/v2';

// --- Types ---

export type NamedResource = {
  name: string;
  url: string;
};

export type TypeListResponse = {
  count: number;
  results: NamedResource[];
};

export type TypeDetailResponse = {
  id: number;
  name: string;
  pokemon: { pokemon: NamedResource; slot: number }[];
};

export type PokemonStat = {
  base_stat: number;
  stat: NamedResource;
};

export type PokemonAbility = {
  ability: NamedResource;
  is_hidden: boolean;
};

export type PokemonType = {
  slot: number;
  type: NamedResource;
};

export type PokemonDetailResponse = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  types: PokemonType[];
  sprites: {
    other?: {
      'official-artwork'?: {
        front_default: string | null;
      };
    };
  };
};

// --- Helpers ---

export function parseIdFromUrl(url: string): number {
  const parts = url.replace(/\/$/, '').split('/');
  return Number(parts[parts.length - 1]);
}

export function getPokemonImageUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

// --- API ---

export async function fetchTypes(): Promise<TypeListResponse> {
  const res = await fetch(`${BASE_URL}/type`);
  return res.json();
}

export async function fetchTypeDetail(name: string): Promise<TypeDetailResponse> {
  const res = await fetch(`${BASE_URL}/type/${name}`);
  return res.json();
}

export async function fetchPokemon(id: number): Promise<PokemonDetailResponse> {
  const res = await fetch(`${BASE_URL}/pokemon/${id}`);
  return res.json();
}
