import useSWR, { useSWRConfig } from 'swr';

import { middleDedupingInterval } from '@/config';

import { pokemonKey } from './key';
import { readPokemonList } from '../functions/readPokemonList';

/** ポケモン一覧を取得 */
export const useReadPokemonList = () => {
  const {
    data: pokemonList,
    error,
    isLoading,
  } = useSWR(pokemonKey.listAll(), readPokemonList, {
    dedupingInterval: middleDedupingInterval,
  });

  const { mutate } = useSWRConfig();
  const update = () => mutate(pokemonKey.listAll());

  return { pokemonList, error, isLoading, update };
};
