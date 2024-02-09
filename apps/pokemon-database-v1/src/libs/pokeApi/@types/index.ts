type NameType = Partial<{
  name: string;
  url: string;
}>;

export type PokemonNamedListType<T> = {
  count: number;
  next: string;
  previous: string;
  results: T[];
};

export type PokemonType = Partial<{
  id: number;
  name: string;
  order: number;
  height: number;
  weight: number;
  stats: {
    base_stat: number;
    effort: number;
    stat: NameType;
  }[];
  types: {
    slot: number;
    type: NameType;
  }[];
}>;

export type PokemonSpeciesType = Partial<{
  id: number;
  name: string;
  order: number;
  names: {
    name: string;
    language: NameType;
  }[];
  color: {
    name: string;
    url: string;
  };
  egg_groups: {
    name: string;
    url: string;
  }[];
  genera: {
    genus: string;
    language: NameType;
  }[];
  flavor_text_entries: {
    flavor_text: string;
    language: NameType;
    version: {
      name: string;
      url: string;
    };
  }[];
  varieties: {
    is_default: boolean;
    pokemon: {
      name: string;
      url: string;
    };
  }[];
}>;
