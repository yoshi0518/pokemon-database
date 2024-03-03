import { prisma } from '@project/database';

import { pokeApiClient } from './libs/pokeApi';

import type { QueryParamType } from './libs/pokeApi/@types';

const getPokemonSpecies = async (query?: QueryParamType) => {
  const { body } = await pokeApiClient.pokemon_species.get({ query });
  // console.log({ ...body });

  if (!body.results.length) return;

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
