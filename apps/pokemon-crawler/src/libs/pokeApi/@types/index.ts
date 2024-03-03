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

export type PokemonType = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  is_default: boolean;
  order: number;
  abilities: {
    ability: NamedAPIResourceType;
    is_hidden: boolean;
    slot: number;
  }[];
  cries: {
    latest: string;
    legacy: string;
  };
  game_indices: {
    game_index: number;
    version: NamedAPIResourceType;
  }[];
  held_items: {
    item: NamedAPIResourceType;
    version_details: {
      rarity: number;
      version: NamedAPIResourceType;
    }[];
  }[];
  moves: {
    move: NamedAPIResourceType;
    version_group_details: {
      level_learned_at: number;
      move_learn_method: NamedAPIResourceType;
      version_group: NamedAPIResourceType;
    }[];
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: NamedAPIResourceType;
  }[];
  types: {
    slot: number;
    type: NamedAPIResourceType;
  }[];
};

export type PokemonEncountersType = {
  location_area: NamedAPIResourceType;
  version_details: {
    encounter_details: {
      chance: number;
      condition_values: NamedAPIResourceType[];
      max_level: number;
      method: NamedAPIResourceType;
      min_level: number;
    }[];
    max_chance: number;
    version: NamedAPIResourceType;
  }[];
}[];

// export type PokemonSpeciesType = {};

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

export type PokemonSpeciesType = {
  id: number;
  name: string;
  order: number;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  hatch_counter: number;
  has_gender_differences: boolean;
  forms_switchable: boolean;
  growth_rate: NamedAPIResourceType;
  pokedex_numbers: {
    entry_number: number;
    pokedex: NamedAPIResourceType;
  };
  egg_groups: NamedAPIResourceType[];
  color: NamedAPIResourceType;
  shape: NamedAPIResourceType;
  evolves_from_species: NamedAPIResourceType;
  evolution_chain: {
    url: string;
  };
  habitat: NamedAPIResourceType;
  generation: NamedAPIResourceType;
  names: {
    name: string;
    language: NamedAPIResourceType;
  }[];
  pal_park_encounters: {
    area: NamedAPIResourceType;
    base_score: number;
    rate: number;
  }[];
  flavor_text_entries: {
    flavor_text: string;
    language: NamedAPIResourceType;
    version: NamedAPIResourceType;
  };
  form_descriptions: {
    description: string;
    language: NamedAPIResourceType;
  }[];
  genera: {
    genus: string;
    language: NamedAPIResourceType;
  }[];
  varieties: {
    is_default: boolean;
    pokemon: NamedAPIResourceType;
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
