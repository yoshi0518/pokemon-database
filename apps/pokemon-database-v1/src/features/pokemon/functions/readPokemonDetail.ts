import { bffApiClient } from '@/libs/bffApi';

/** ポケモン詳細を取得 */
export const readPokemonDetail = async (id: string) => {
  const { body } = await bffApiClient.api.pokemon._id(id).get();
  return body;
};
