import { PrismaClient } from '@prisma/client';

import type { QueryParamType } from '@/libs/pokeApi/@types';

import { pokeApiClient } from '../src/libs/pokeApi';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

type PokemonHabitatNameType = {
  language: string;
  name: string;
};

const getPokemonHabitat = async (query?: QueryParamType) => {
  const { body } = await pokeApiClient.pokemon_habitat.get({ query });
  // console.log({ ...body });

  if (!body.results.length) return;

  for await (const result of body.results) {
    const id = Number(result.url.split('/')[6]);
    const { body } = await pokeApiClient.pokemon_habitat._id(id).get();

    console.info(`\n=== PokemonHabitat: ${id} ===`);

    // === PokemonHabitatName Start ===
    const pokemonHabitatNameKey: string[] = [];
    const pokemonHabitatNameData: PokemonHabitatNameType[] = [];

    body.names.forEach((item) => {
      if (pokemonHabitatNameKey.includes(item.language.name)) return;

      pokemonHabitatNameKey.push(item.language.name);
      pokemonHabitatNameData.push({
        language: item.language.name,
        name: item.name,
      });
    });
    // === PokemonHabitatName End ===

    await prisma.crawlerPokemonHabitat.create({
      data: {
        id: body.id,
        name: body.name,
        pokemonHabitatNames: {
          createMany: {
            data: pokemonHabitatNameData,
          },
        },
      },
    });
  }

  if (body.next) {
    const params = new URL(body.next).searchParams;

    getPokemonHabitat({
      offset: Number(params.get('offset')),
      limit: Number(params.get('limit')),
    });
  }
};

export const main = async () => {
  try {
    await prisma.$executeRaw`
truncate table t_crawler_pokemon_habitat;
    `;

    await prisma.$executeRaw`
truncate table t_crawler_pokemon_habitat_names;
    `;

    await getPokemonHabitat();
  } catch (error) {
    console.error('Error: ', error);
  } finally {
    await prisma.$disconnect();
  }
};

main();
