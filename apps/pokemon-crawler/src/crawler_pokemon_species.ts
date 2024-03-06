import { prisma } from '@project/database';

import { pokeApiClient } from './libs/pokeApi';

import type { QueryParamType } from './libs/pokeApi/@types';

type PokemonEggGroupType = {
  id: number;
  eggGroup: string;
};

type PokemonFlavorTextEntryType = {
  id: number;
  language: string;
  version: string;
  flavorText: string;
};

type PokemonFormDescriptionType = {
  id: number;
  language: string;
  description: string;
};

type PokemonGenusType = {
  id: number;
  language: string;
  genus: string;
};

type PokemonNameType = {
  id: number;
  language: string;
  name: string;
};

type PokemonPalParkEncounterType = {
  id: number;
  area: string;
  baseScore: number;
  rate: number;
};

type PokemonPokedexNumberType = {
  id: number;
  pokedex: string;
  entryNumber: number;
};

type PokemonVarietyType = {
  id: number;
  pokemon: string;
  isDefault: boolean;
};

const getPokemonSpecies = async (query?: QueryParamType) => {
  const { body } = await pokeApiClient.pokemon_species.get({ query });
  // console.log({ ...body });

  if (!body.results.length) return;

  for await (const result of body.results) {
    const id = Number(result.url.split('/')[6]);
    const { body } = await pokeApiClient.pokemon_species._id(id).get();

    console.info(`\n=== PokemonSpecies: ${id} ===`);
    // console.log({ ...body });

    const pokemonEggGroupKey: string[] = [];
    const pokemonEggGroupData: PokemonEggGroupType[] = [];
    const pokemonFlavorTextEntryKey: string[] = [];
    const pokemonFlavorTextEntryData: PokemonFlavorTextEntryType[] = [];
    const pokemonFormDescriptionKey: string[] = [];
    const pokemonFormDescriptionData: PokemonFormDescriptionType[] = [];
    const pokemonGenusKey: string[] = [];
    const pokemonGenusData: PokemonGenusType[] = [];
    const pokemonNameKey: string[] = [];
    const pokemonNameData: PokemonNameType[] = [];
    const pokemonPalParkEncounterKey: string[] = [];
    const pokemonPalParkEncounterData: PokemonPalParkEncounterType[] = [];
    const pokemonPokedexNumberKey: string[] = [];
    const pokemonPokedexNumberData: PokemonPokedexNumberType[] = [];
    const pokemonVarietyKey: string[] = [];
    const pokemonVarietyData: PokemonVarietyType[] = [];

    // === PokemonEggGroup Start ===
    for await (const item of body.egg_groups) {
      if (pokemonEggGroupKey.includes(item.name)) continue;

      pokemonEggGroupKey.push(item.name);
      pokemonEggGroupData.push({
        id,
        eggGroup: item.name,
      });
    }
    // === PokemonEggGroup End ===

    // === PokemonFlavorTextEntries Start ===
    for await (const item of body.flavor_text_entries) {
      if (pokemonFlavorTextEntryKey.includes(`${item.language.name}${item.version.name}`)) continue;

      pokemonFlavorTextEntryKey.push(`${item.language.name}${item.version.name}`);
      pokemonFlavorTextEntryData.push({
        id,
        language: item.language.name,
        version: item.version.name,
        flavorText: item.flavor_text,
      });
    }
    // === PokemonFlavorTextEntries End ===

    // === PokemonFormDescriptions Start ===
    if (body.form_descriptions.length) {
      for await (const item of body.form_descriptions) {
        if (pokemonFormDescriptionKey.includes(item.language.name)) continue;

        pokemonFormDescriptionKey.push(item.language.name);
        pokemonFormDescriptionData.push({
          id,
          language: item.language.name,
          description: item.description,
        });
      }
    }
    // === PokemonFormDescriptions End ===

    // === PokemonGenera Start ===
    for await (const item of body.genera) {
      if (pokemonGenusKey.includes(item.language.name)) continue;

      pokemonGenusKey.push(item.language.name);
      pokemonGenusData.push({
        id,
        language: item.language.name,
        genus: item.genus,
      });
    }
    // === PokemonGenera End ===

    // === PokemonNames Start ===
    for await (const item of body.names) {
      if (pokemonNameKey.includes(item.language.name)) continue;

      pokemonNameKey.push(item.language.name);
      pokemonNameData.push({
        id,
        language: item.language.name,
        name: item.name,
      });
    }
    // === PokemonNames End ===

    // === PokemonPalParkEncounters Start ===
    for await (const item of body.pal_park_encounters) {
      if (pokemonPalParkEncounterKey.includes(item.area.name)) continue;

      pokemonPalParkEncounterKey.push(item.area.name);
      pokemonPalParkEncounterData.push({
        id,
        area: item.area.name,
        baseScore: item.base_score,
        rate: item.rate,
      });
    }
    // === PokemonPalParkEncounters End ===

    // === PokemonPokedexNumbers Start ===
    for await (const item of body.pokedex_numbers) {
      if (pokemonPokedexNumberKey.includes(item.pokedex.name)) continue;

      pokemonPokedexNumberKey.push(item.pokedex.name);
      pokemonPokedexNumberData.push({
        id,
        pokedex: item.pokedex.name,
        entryNumber: item.entry_number,
      });
    }
    // === PokemonPokedexNumbers End ===

    // === PokemonPokedexVarieties Start ===
    for await (const item of body.varieties) {
      if (pokemonVarietyKey.includes(item.pokemon.name)) continue;

      pokemonVarietyKey.push(item.pokemon.name);
      pokemonVarietyData.push({
        id,
        pokemon: item.pokemon.name,
        isDefault: item.is_default,
      });
    }
    // === PokemonPokedexVarieties End ===

    await prisma.$transaction(async (prisma) => {
      await prisma.crawlerPokemonSpecies.create({
        data: {
          id,
          name: body.name,
          baseHappiness: body.base_happiness,
          captureRate: body.capture_rate,
          color: body.color ? body.color.name : null,
          evolutionChain: Number(body.evolution_chain.url.split('/')[6]),
          evolvesFromSpecies: body.evolves_from_species ? body.evolves_from_species.name : null,
          formsSwitchable: body.forms_switchable,
          genderRate: body.gender_rate,
          generation: body.generation ? body.generation.name : null,
          growthRate: body.growth_rate ? body.growth_rate.name : null,
          habitat: body.habitat ? body.habitat.name : null,
          hasGenderDifferences: body.has_gender_differences,
          hatchCounter: body.hatch_counter,
          isBaby: body.is_baby,
          isLegendary: body.is_legendary,
          isMythical: body.is_mythical,
          order: body.order,
          shape: body.shape ? body.shape.name : null,
        },
      });

      await prisma.crawlerPokemonSpeciesEggGroups.createMany({
        data: pokemonEggGroupData,
      });

      await prisma.crawlerPokemonSpeciesFlavorTextEntries.createMany({
        data: pokemonFlavorTextEntryData,
      });

      await prisma.crawlerPokemonSpeciesFormDescriptions.createMany({
        data: pokemonFormDescriptionData,
      });

      await prisma.crawlerPokemonSpeciesGenera.createMany({
        data: pokemonGenusData,
      });

      await prisma.crawlerPokemonSpeciesNames.createMany({
        data: pokemonNameData,
      });

      await prisma.crawlerPokemonSpeciesPalParkEncounters.createMany({
        data: pokemonPalParkEncounterData,
      });

      await prisma.crawlerPokemonSpeciesPokedexNumbers.createMany({
        data: pokemonPokedexNumberData,
      });

      await prisma.crawlerPokemonSpeciesVarieties.createMany({
        data: pokemonVarietyData,
      });
    });
  }

  if (body.next) {
    const params = new URL(body.next).searchParams;

    getPokemonSpecies({
      offset: Number(params.get('offset')),
      limit: Number(params.get('limit')),
    });
  }
};

export const main = async () => {
  await prisma.$executeRaw`
truncate table t_crawler_pokemon_species;
  `;

  await prisma.$executeRaw`
truncate table t_crawler_pokemon_species_egg_groups;
  `;

  await prisma.$executeRaw`
truncate table t_crawler_pokemon_species_flavor_text_entries;
  `;

  await prisma.$executeRaw`
truncate table t_crawler_pokemon_species_form_descriptions;
  `;

  await prisma.$executeRaw`
truncate table t_crawler_pokemon_species_genera;
  `;

  await prisma.$executeRaw`
truncate table t_crawler_pokemon_species_names;
  `;

  await prisma.$executeRaw`
truncate table t_crawler_pokemon_species_pal_park_encounters;
  `;

  await prisma.$executeRaw`
truncate table t_crawler_pokemon_species_pokedex_numbers;
  `;

  await prisma.$executeRaw`
truncate table t_crawler_pokemon_species_varieties;
  `;

  await getPokemonSpecies();
};

main()
  .catch((error) => console.error('Error: ', error))
  .finally(async () => await prisma.$disconnect());
