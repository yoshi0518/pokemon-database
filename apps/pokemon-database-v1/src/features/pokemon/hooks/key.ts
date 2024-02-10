export const pokemonKey = {
  base: ['pokemon'] as const,
  listAll: () => [...pokemonKey.base, 'list'] as const,
  listFilter: (filters: string) => [...pokemonKey.listAll(), { filters }] as const,
  detail: (id: number) => [...pokemonKey.base, 'detail', id] as const,
} as const;
