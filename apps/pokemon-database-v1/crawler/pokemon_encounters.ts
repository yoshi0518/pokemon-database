import { PrismaClient } from '@prisma/client';

import type { QueryParamType } from '@/libs/pokeApi/@types';

import { pokeApiClient } from '../src/libs/pokeApi';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

type PokemonEncounterType = {
  id: number;
  locationArea: string;
};

type PokemonEncounterVersionType = {
  id: number;
  locationArea: string;
  version: string;
  maxChance: number;
};

type PokemonEncounterVersionEncounterType = {
  id: number;
  locationArea: string;
  version: string;
  rowNo: number;
  chance: number;
  method: string;
  maxLevel: number;
  minLevel: number;
};

type PokemonEncounterVersionEncounterConditionType = {
  id: number;
  locationArea: string;
  version: string;
  rowNo: number;
  condition: string;
};

const getPokemonEncounters = async (query?: QueryParamType) => {
  const { body } = await pokeApiClient.pokemon.get({ query });
  // console.log({ ...body });

  if (!body.results.length) return;

  for await (const result of body.results) {
    const id = Number(result.url.split('/')[6]);
    const { body } = await pokeApiClient.pokemon._id(id).encounters.get();

    if (!body.length) continue;

    console.info(`\n=== PokemonEncounters: ${id} ===`);
    // console.log({ ...body });

    const pokemonEncounterKey: string[] = [];
    const pokemonEncounterData: PokemonEncounterType[] = [];
    const pokemonEncounterVersionKey: string[] = [];
    const pokemonEncounterVersionData: PokemonEncounterVersionType[] = [];
    const pokemonEncounterVersionEncounterKey: string[] = [];
    const pokemonEncounterVersionEncounterData: PokemonEncounterVersionEncounterType[] = [];
    const pokemonEncounterVersionEncounterConditionKey: string[] = [];
    const pokemonEncounterVersionEncounterConditionData: PokemonEncounterVersionEncounterConditionType[] = [];

    for await (const item of body) {
      // === PokemonEncounter Start ===

      if (pokemonEncounterKey.includes(item.location_area.name)) continue;

      pokemonEncounterKey.push(item.location_area.name);
      pokemonEncounterData.push({
        id,
        locationArea: item.location_area.name,
      });
      // === PokemonEncounter End ===

      if (!item.version_details.length) continue;

      for await (const itemVersion of item.version_details) {
        // === PokemonEncounterVersion Start ===

        if (pokemonEncounterVersionKey.includes(`${item.location_area.name}${itemVersion.version.name}`)) continue;

        pokemonEncounterVersionKey.push(`${item.location_area.name}${itemVersion.version.name}`);
        pokemonEncounterVersionData.push({
          id,
          locationArea: item.location_area.name,
          version: itemVersion.version.name,
          maxChance: itemVersion.max_chance,
        });
        // === PokemonEncounterVersion End ===

        if (!itemVersion.encounter_details.length) continue;

        let rowNo = 0;
        for await (const itemEncounter of itemVersion.encounter_details) {
          // === PokemonEncounterVersionEncounter Start ===

          rowNo++;
          if (
            pokemonEncounterVersionEncounterKey.includes(
              `${item.location_area.name}${itemVersion.version.name}${rowNo}`,
            )
          )
            continue;

          pokemonEncounterVersionEncounterKey.push(`${item.location_area.name}${itemVersion.version.name}${rowNo}`);
          pokemonEncounterVersionEncounterData.push({
            id,
            locationArea: item.location_area.name,
            version: itemVersion.version.name,
            rowNo,
            chance: itemEncounter.chance,
            method: itemEncounter.method.name,
            maxLevel: itemEncounter.max_level,
            minLevel: itemEncounter.min_level,
          });
          // === PokemonEncounterVersionEncounter End ===

          if (!itemEncounter.condition_values.length) continue;

          for await (const itemCondition of itemEncounter.condition_values) {
            // === PokemonEncounterVersionEncounterCondition Start ===

            if (
              pokemonEncounterVersionEncounterConditionKey.includes(
                `${item.location_area.name}${itemVersion.version.name}${rowNo}${itemCondition.name}`,
              )
            )
              continue;

            pokemonEncounterVersionEncounterConditionKey.push(
              `${item.location_area.name}${itemVersion.version.name}${rowNo}${itemCondition.name}`,
            );
            pokemonEncounterVersionEncounterConditionData.push({
              id,
              locationArea: item.location_area.name,
              version: itemVersion.version.name,
              rowNo,
              condition: itemCondition.name,
            });
            // === PokemonEncounterVersionEncounterCondition End ===
          }
        }
      }
    }

    await prisma.$transaction(async (prisma) => {
      await prisma.crawlerPokemonEncounters.createMany({
        data: pokemonEncounterData,
      });

      await prisma.crawlerPokemonEncountersVersionDetails.createMany({
        data: pokemonEncounterVersionData,
      });

      await prisma.crawlerPokemonEncountersVersionEncounterDetails.createMany({
        data: pokemonEncounterVersionEncounterData,
      });

      await prisma.crawlerPokemonEncountersVersionEncounterConditionDetails.createMany({
        data: pokemonEncounterVersionEncounterConditionData,
      });
    });
  }

  if (body.next) {
    const params = new URL(body.next).searchParams;

    getPokemonEncounters({
      offset: Number(params.get('offset')),
      limit: Number(params.get('limit')),
    });
  }
};

export const main = async () => {
  try {
    await prisma.$executeRaw`
truncate table t_crawler_pokemon_encounters;
    `;

    await prisma.$executeRaw`
truncate table t_crawler_pokemon_encounters_version_details;
    `;

    await prisma.$executeRaw`
truncate table t_crawler_pokemon_encounters_version_encounter_details;
    `;

    await prisma.$executeRaw`
truncate table t_crawler_pokemon_encounters_version_encounter_condition_details;
    `;

    await getPokemonEncounters();
  } catch (error) {
    console.error('Error: ', error);
  } finally {
    await prisma.$disconnect();
  }
};

main();
