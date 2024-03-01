import { prisma } from '@project/database';

import { pokeApiClient } from './libs/pokeApi';

import type { QueryParamType } from './libs/pokeApi/@types';

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

    await prisma.$transaction(async (prisma) => {
      for await (const item of body) {
        // console.log({ ...item });
        await prisma.crawlerPokemonEncounters.create({
          data: {
            id,
            locationArea: item.location_area.name,
          },
        });
      }
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
};

main()
  .catch((error) => console.error('Error: ', error))
  .finally(async () => await prisma.$disconnect());
