export type PokemonType = Partial<{
  id: number;
  name: string;
  order: number;
  height: number;
  weight: number;
  stats: {
    'hp': number;
    'attack': number;
    'defense': number;
    'special-attack': number;
    'special-defense': number;
    'speed': number;
  };
  types: string[];
  names: { [key: string]: string }[];
  genera: { [key: string]: string }[];
  eggGroups: string[];
  flavorTexts: { [key: string]: { [key: string]: string } };
}>;
