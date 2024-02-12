import useSWR, { useSWRConfig } from 'swr';

import { middleDedupingInterval } from '@/config';

import { pokemonKey } from './key';
import { readPokemonDetail } from '../functions/readPokemonDetail';

/** ポケモン詳細を取得 */
export const useReadPokemonDetail = (id: string) => {
  const {
    data: pokemonDetail,
    error,
    isLoading,
  } = useSWR(pokemonKey.detail(id), () => readPokemonDetail(id), {
    dedupingInterval: middleDedupingInterval,
  });

  const { mutate } = useSWRConfig();
  const update = () => mutate(pokemonKey.detail(id));

  return { pokemonDetail, error, isLoading, update };
};
