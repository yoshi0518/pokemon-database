export const pokemonKey = {
  base: ['pokemon'] as const,
  listAll: () => [...pokemonKey.base, 'list'] as const,
  listFilter: (filters: string) => [...pokemonKey.listAll(), { filters }] as const,
  detail: (id: string) => [...pokemonKey.base, 'detail', id] as const,
} as const;
