import { PrismaClient } from '@prisma/client';

import type { QueryParamType } from '@/libs/pokeApi/@types';

import { pokeApiClient } from '../src/libs/pokeApi';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

type NatureNameType = {
  language: string;
  name: string;
};

type NatureMoveBattleStyleType = {
  name: string;
  highHpPreference: number;
  lowHpPreference: number;
};

const getNature = async (query?: QueryParamType) => {
  const { body } = await pokeApiClient.nature.get({ query });
  // console.log({ ...body });

  if (!body.results.length) return;

  for await (const result of body.results) {
    const id = Number(result.url.split('/')[6]);
    const { body } = await pokeApiClient.nature._id(id).get();

    console.info(`\n=== Nature: ${id} ===`);

    // === NatureName Start ===
    const natureNameKey: string[] = [];
    const natureNameData: NatureNameType[] = [];

    body.names.forEach((item) => {
      if (natureNameKey.includes(item.language.name)) return;

      natureNameKey.push(item.language.name);
      natureNameData.push({
        language: item.language.name,
        name: item.name,
      });
    });
    // === NatureName End ===

    // === NatureMoveBattleStyle Start ===
    const natureMoveBattleStyleKey: string[] = [];
    const natureMoveBattleStyleData: NatureMoveBattleStyleType[] = [];

    body.move_battle_style_preferences.forEach((item) => {
      if (natureMoveBattleStyleKey.includes(item.move_battle_style.name)) return;

      natureMoveBattleStyleKey.push(item.move_battle_style.name);
      natureMoveBattleStyleData.push({
        name: item.move_battle_style.name,
        highHpPreference: item.high_hp_preference,
        lowHpPreference: item.low_hp_preference,
      });
    });
    // === NatureMoveBattleStyle End ===

    await prisma.crawlerNature.create({
      data: {
        id: body.id,
        name: body.name,
        decreasedStat: body.decreased_stat ? body.decreased_stat.name : null,
        increasedStat: body.increased_stat ? body.increased_stat.name : null,
        hatesFlavor: body.hates_flavor ? body.hates_flavor.name : null,
        likesFlavor: body.likes_flavor ? body.likes_flavor.name : null,
        natureNames: {
          createMany: {
            data: natureNameData,
          },
        },
        natureMoveBattleStyles: {
          createMany: {
            data: natureMoveBattleStyleData,
          },
        },
      },
    });
  }

  if (body.next) {
    const params = new URL(body.next).searchParams;

    getNature({
      offset: Number(params.get('offset')),
      limit: Number(params.get('limit')),
    });
  }
};

export const main = async () => {
  try {
    await prisma.$executeRaw`
truncate table t_crawler_nature;
    `;

    await prisma.$executeRaw`
truncate table t_crawler_nature_names;
    `;

    await prisma.$executeRaw`
truncate table t_crawler_nature_move_battle_styles;
    `;

    await getNature();
  } catch (error) {
    console.error('Error: ', error);
  } finally {
    await prisma.$disconnect();
  }
};

main();
