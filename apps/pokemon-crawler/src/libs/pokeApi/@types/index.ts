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
  move_battle_style_preferences: {
    high_hp_preference: number;
    low_hp_preference: number;
    move_battle_style: NamedAPIResourceType;
  }[];
  names: {
    name: string;
    language: NamedAPIResourceType;
  }[];
};

export type PokemonPokeathlonStatType = {
  id: number;
  name: string;
  names: {
    name: string;
    language: NamedAPIResourceType;
  }[];
  affecting_natures: {
    decrease: {
      max_change: number;
      nature: NamedAPIResourceType;
    }[];
    increase: {
      max_change: number;
      nature: NamedAPIResourceType;
    }[];
  };
};

export type PokemonColorType = {
  id: number;
  name: string;
  names: {
    name: string;
    language: NamedAPIResourceType;
  }[];
};

export type PokemonFormType = {
  id: number;
  name: string;
  form_name: string;
  form_names: {
    name: string;
    language: NamedAPIResourceType;
  }[];
  form_order: number;
  is_battle_only: boolean;
  is_default: boolean;
  is_mega: boolean;
  order: number;
  version_group: NamedAPIResourceType;
};

export type PokemonHabitatType = {
  id: number;
  name: string;
  names: {
    name: string;
    language: NamedAPIResourceType;
  }[];
};

export type PokemonShapeType = {
  id: number;
  name: string;
  names: {
    name: string;
    language: NamedAPIResourceType;
  }[];
  awesome_names: {
    awesome_name: string;
    language: NamedAPIResourceType;
  }[];
};

export type PokemonStatType = {
  id: number;
  name: string;
  move_damage_class: NamedAPIResourceType;
  is_battle_only: boolean;
  game_index: number;
  affecting_moves: {
    decrease: {
      change: number;
      move: NamedAPIResourceType;
    }[];
    increase: {
      change: number;
      move: NamedAPIResourceType;
    }[];
  };
  affecting_natures: {
    decrease: NamedAPIResourceType[];
    increase: NamedAPIResourceType[];
  };
  names: {
    name: string;
    language: NamedAPIResourceType;
  }[];
  characteristics: { url: string }[];
};

export type PokemonTypeType = {
  id: number;
  name: string;
  generation: NamedAPIResourceType;
  move_damage_class: NamedAPIResourceType;
  damage_relations: {
    double_damage_from: NamedAPIResourceType[];
    double_damage_to: NamedAPIResourceType[];
    half_damage_from: NamedAPIResourceType[];
    half_damage_to: NamedAPIResourceType[];
    no_damage_from: NamedAPIResourceType[];
    no_damage_to: NamedAPIResourceType[];
  };
  game_indices: {
    game_index: number;
    generation: NamedAPIResourceType;
  }[];
  moves: NamedAPIResourceType[];
  names: {
    name: string;
    language: NamedAPIResourceType;
  }[];
};
