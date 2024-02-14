import { PokemonListType } from '@/libs/bffApi/@types';

export type Methods = {
  get: {
    query?: {
      page?: string;
      size?: string;
    };
    status: 200;
    resBody: PokemonListType;
  };
};
