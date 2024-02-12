import { PokemonListType } from '@/libs/bffApi/@types';

export type Methods = {
  get: {
    query?: {
      offset?: string;
      limit?: string;
    };
    status: 200;
    resBody: PokemonListType[];
  };
};
