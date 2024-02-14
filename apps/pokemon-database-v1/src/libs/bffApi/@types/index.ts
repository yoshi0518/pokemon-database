export type PokemonListType = {
  count: number;
  maxPage: number;
  page: number;
  size: number;
  data: {
    id: number;
    name: string;
    fileName: string;
    types: string[];
    genus: string;
  }[];
};

export type PokemonDetailType = {
  id: number;
  name: string;
  fileName: string;
  types: string[];
  genus: string;
  flavorText: string;
  height: number;
  weight: number;
  stats: {
    [key: string]: number;
  };
};
