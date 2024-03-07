import { PrismaClient } from '@prisma/client';

import type { QueryParamType } from '@/libs/pokeApi/@types';

import { pokeApiClient } from '../src/libs/pokeApi';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

type PokemonColorNameType = {
  language: string;
  name: string;
};

const getPokemonColor = async (query?: QueryParamType) => {
  const { body } = await pokeApiClient.pokemon_color.get({ query });
  // console.log({ ...body });

  if (!body.results.length) return;

  for await (const result of body.results) {
    const id = Number(result.url.split('/')[6]);
    const { body } = await pokeApiClient.pokemon_color._id(id).get();

    console.info(`\n=== PokemonColor: ${id} ===`);

    // === PokemonColorName Start ===
    const pokemonColorNameKey: string[] = [];
    const pokemonColorNameData: PokemonColorNameType[] = [];

    body.names.forEach((item) => {
      if (pokemonColorNameKey.includes(item.language.name)) return;

      pokemonColorNameKey.push(item.language.name);
      pokemonColorNameData.push({
        language: item.language.name,
        name: item.name,
      });
    });
    // === PokemonColorName End ===

    await prisma.crawlerPokemonColor.create({
      data: {
        id: body.id,
        name: body.name,
        pokemonColorNames: {
          createMany: {
            data: pokemonColorNameData,
          },
        },
      },
    });
  }

  if (body.next) {
    const params = new URL(body.next).searchParams;

    getPokemonColor({
      offset: Number(params.get('offset')),
      limit: Number(params.get('limit')),
    });
  }
};

export const main = async () => {
  try {
    await prisma.$executeRaw`
truncate table t_crawler_pokemon_color;
    `;

    await prisma.$executeRaw`
truncate table t_crawler_pokemon_color_names;
    `;

    await getPokemonColor();
  } catch (error) {
    console.error('Error: ', error);
  } finally {
    await prisma.$disconnect();
  }
};

main();
