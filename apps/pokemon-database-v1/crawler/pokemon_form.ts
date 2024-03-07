import { PrismaClient } from '@prisma/client';

import type { QueryParamType } from '@/libs/pokeApi/@types';

import { pokeApiClient } from '../src/libs/pokeApi';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

type PokemonFormNameType = {
  language: string;
  name: string;
};

const getPokemonForm = async (query?: QueryParamType) => {
  const { body } = await pokeApiClient.pokemon_form.get({ query });
  // console.log({ ...body });

  if (!body.results.length) return;

  for await (const result of body.results) {
    const id = Number(result.url.split('/')[6]);
    const { body } = await pokeApiClient.pokemon_form._id(id).get();

    console.info(`\n=== PokemonForm: ${id} ===`);

    // === PokemonFormName Start ===
    const pokemonFormNameKey: string[] = [];
    const pokemonFormNameData: PokemonFormNameType[] = [];

    body.form_names.forEach((item) => {
      if (pokemonFormNameKey.includes(item.language.name)) return;

      pokemonFormNameKey.push(item.language.name);
      pokemonFormNameData.push({
        language: item.language.name,
        name: item.name,
      });
    });
    // === PokemonFormName End ===

    await prisma.crawlerPokemonForm.create({
      data: {
        id: body.id,
        name: body.name,
        formName: body.form_name,
        formOrder: body.form_order,
        isBattleOnly: body.is_battle_only,
        isDefault: body.is_default,
        isMega: body.is_mega,
        order: body.order,
        versionGroup: body.version_group.name,
        pokemonFormNames: {
          createMany: {
            data: pokemonFormNameData,
          },
        },
      },
    });
  }

  if (body.next) {
    const params = new URL(body.next).searchParams;

    getPokemonForm({
      offset: Number(params.get('offset')),
      limit: Number(params.get('limit')),
    });
  }
};

export const main = async () => {
  try {
    await prisma.$executeRaw`
truncate table t_crawler_pokemon_form;
    `;

    await prisma.$executeRaw`
truncate table t_crawler_pokemon_form_names;
    `;

    await getPokemonForm();
  } catch (error) {
    console.error('Error: ', error);
  } finally {
    await prisma.$disconnect();
  }
};

main();
