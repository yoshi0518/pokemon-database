import { bffApiClient } from '@/libs/bffApi';

/** ポケモン一覧を取得 */
export const readPokemonList = async (page: string, size: string) => {
  const { body } = await bffApiClient.api.pokemon.get({ query: { page, size } });
  return body;
};
