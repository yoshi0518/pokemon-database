import useSWR, { useSWRConfig } from 'swr';

import { middleDedupingInterval } from '@/config';

import { pokemonKey } from './key';
import { readPokemonList } from '../functions/readPokemonList';


/** ポケモン一覧を取得 */
export const useReadPokemonList = (page: string, size: string) => {
  const {
    data: pokemonList,
    error,
    isLoading,
  } = useSWR(pokemonKey.listFilter(JSON.stringify({ page, size })), () => readPokemonList(page, size), {
    dedupingInterval: middleDedupingInterval,
  });

  const { mutate } = useSWRConfig();
  const update = () => mutate(pokemonKey.listFilter(JSON.stringify({ page, size })));

  return { pokemonList, error, isLoading, update };
};
