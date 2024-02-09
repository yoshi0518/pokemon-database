import { PokemonNamedListType } from '../@types';

export type Methods = {
  get: {
    status: 200;
    resBody: PokemonNamedListType<{
      name: string;
      url: string;
    }>;
  };
};
