export type QueryParamType = {
  offset?: number;
  limit?: number;
};

export type NamedAPIResourceType = {
  name: string;
  url: string;
};

export type NamedAPIResourceListType = {
  count: number;
  next?: string;
  previous?: string;
  results: NamedAPIResourceType[];
};

export type PokemonAbilityType = {
  id: number;
  name: string;
  generation: NamedAPIResourceType;
  is_main_series: boolean;
  names: {
    name: string;
    language: NamedAPIResourceType;
  }[];
  effect_entries: {
    effect: string;
    short_effect: string;
    language: NamedAPIResourceType;
  }[];
  flavor_text_entries: {
    flavor_text: string;
    language: NamedAPIResourceType;
    version_group: NamedAPIResourceType;
  }[];
};

export type PokemonCharacteristicsType = {
  id: number;
  highest_stat: NamedAPIResourceType;
  gene_modulo: number;
  descriptions: {
    description: string;
    language: NamedAPIResourceType;
  }[];
  possible_values: number[];
};

export type PokemonEggGroupType = {
  id: number;
  name: string;
  names: {
    name: string;
    language: NamedAPIResourceType;
  }[];
};

export type PokemonGenderType = {
  id: number;
  name: string;
  pokemon_species_details: {
    pokemon_species: NamedAPIResourceType;
    rate: number;
  }[];
  required_for_evolution: NamedAPIResourceType[];
};

export type PokemonGrowthRateType = {
  id: number;
  name: string;
  levels: {
    level: number;
    experience: number;
  }[];
};

export type PokemonNatureType = {
  id: number;
  name: string;
  decreased_stat: {
    name: string;
    url: string;
  };
  increased_stat: {
    name: string;
    url: string;
  };
  hates_flavor: {
    name: string;
    url: string;
  };
  likes_flavor: {
    name: string;
    url: string;
  };
  names: {
    name: string;
    language: NamedAPIResourceType;
  }[];
};
