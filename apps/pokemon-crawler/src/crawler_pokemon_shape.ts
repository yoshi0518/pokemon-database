import { prisma } from '@project/database';

import { pokeApiClient } from './libs/pokeApi';

import type { QueryParamType } from './libs/pokeApi/@types';

type PokemonShapeNameType = {
  language: string;
  name: string;
};

type PokemonShapeAwesomeNameType = {
  language: string;
  awesomeName: string;
};

const getPokemonShape = async (query?: QueryParamType) => {
  const { body } = await pokeApiClient.pokemon_shape.get({ query });
  // console.log({ ...body });

  if (!body.results.length) return;

  for await (const result of body.results) {
    const id = Number(result.url.split('/')[6]);
    const { body } = await pokeApiClient.pokemon_shape._id(id).get();

    console.info(`\n=== PokemonShape: ${id} ===`);

    // === PokemonShapeName Start ===
    const pokemonShapeNameKey: string[] = [];
    const pokemonShapeNameData: PokemonShapeNameType[] = [];

    body.names.forEach((item) => {
      if (pokemonShapeNameKey.includes(item.language.name)) return;

      pokemonShapeNameKey.push(item.language.name);
      pokemonShapeNameData.push({
        language: item.language.name,
        name: item.name,
      });
    });
    // === PokemonShapeName End ===

    // === PokemonShapeAwesomeName Start ===
    const pokemonShapeAwesomeNameKey: string[] = [];
    const pokemonShapeAwesomeNameData: PokemonShapeAwesomeNameType[] = [];

    body.awesome_names.forEach((item) => {
      if (pokemonShapeAwesomeNameKey.includes(item.language.name)) return;

      pokemonShapeAwesomeNameKey.push(item.language.name);
      pokemonShapeAwesomeNameData.push({
        language: item.language.name,
        awesomeName: item.awesome_name,
      });
    });
    // === PokemonShapeAwesomeName End ===

    await prisma.crawlerPokemonShape.create({
      data: {
        id: body.id,
        name: body.name,
        pokemonShapeNames: {
          createMany: {
            data: pokemonShapeNameData,
          },
        },
        pokemonShapeAwesomeNames: {
          createMany: {
            data: pokemonShapeAwesomeNameData,
          },
        },
      },
    });
  }

  if (body.next) {
    const params = new URL(body.next).searchParams;

    getPokemonShape({
      offset: Number(params.get('offset')),
      limit: Number(params.get('limit')),
    });
  }
};

export const main = async () => {
  await prisma.$executeRaw`
truncate table t_crawler_pokemon_shape;
  `;

  await prisma.$executeRaw`
truncate table t_crawler_pokemon_shape_names;
  `;

  await prisma.$executeRaw`
truncate table t_crawler_pokemon_shape_awesome_names;
  `;

  await getPokemonShape();
};

main()
  .catch((error) => console.error('Error: ', error))
  .finally(async () => await prisma.$disconnect());
