import type { PokemonCharacteristicsType } from '../../@types';

export type Methods = {
  get: {
    status: 200;
    resBody: PokemonCharacteristicsType;
  };
};
