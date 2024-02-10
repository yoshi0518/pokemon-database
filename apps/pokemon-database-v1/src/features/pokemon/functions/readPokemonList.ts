import { bffApiClient } from '@/libs/bffApi';

/** ポケモン一覧を取得 */
export const readPokemonList = async () => {
  const { body } = await bffApiClient.api.pokemon.get();
  return body;
};
