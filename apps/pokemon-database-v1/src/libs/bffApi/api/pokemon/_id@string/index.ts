import { PokemonDetailType } from '@/libs/bffApi/@types';

export type Methods = {
  get: {
    status: 200;
    resBody: PokemonDetailType;
  };
};
