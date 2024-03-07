import { PrismaClient } from '@prisma/client';

import type { QueryParamType } from '@/libs/pokeApi/@types';

import { pokeApiClient } from '../src/libs/pokeApi';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

type StatNameType = {
  language: string;
  name: string;
};

type StatAffectingMoveType = {
  name: string;
  change: number;
};

type StatAffectingNatureType = {
  name: string;
};

const getStat = async (query?: QueryParamType) => {
  const { body } = await pokeApiClient.stat.get({ query });
  // console.log({ ...body });

  if (!body.results.length) return;

  for await (const result of body.results) {
    const id = Number(result.url.split('/')[6]);
    const { body } = await pokeApiClient.stat._id(id).get();

    console.info(`\n=== Stat: ${id} ===`);

    // === StatName Start ===
    const statNameKey: string[] = [];
    const statNameData: StatNameType[] = [];

    body.names.forEach((item) => {
      if (statNameKey.includes(item.language.name)) return;

      statNameKey.push(item.language.name);
      statNameData.push({
        language: item.language.name,
        name: item.name,
      });
    });
    // === StatName End ===

    // === StatAffectingMoveDecrease Start ===
    const statAffectingMoveDecreaseKey: string[] = [];
    const statAffectingMoveDecreaseData: StatAffectingMoveType[] = [];

    body.affecting_moves.decrease.forEach((item) => {
      if (statAffectingMoveDecreaseKey.includes(item.move.name)) return;

      statAffectingMoveDecreaseKey.push(item.move.name);
      statAffectingMoveDecreaseData.push({
        name: item.move.name,
        change: item.change,
      });
    });
    // === StatAffectingNatureDecrease End ===

    // === StatAffectingMoveIncrease Start ===
    const statAffectingMoveIncreaseKey: string[] = [];
    const statAffectingMoveIncreaseData: StatAffectingMoveType[] = [];

    body.affecting_moves.increase.forEach((item) => {
      if (statAffectingMoveIncreaseKey.includes(item.move.name)) return;

      statAffectingMoveIncreaseKey.push(item.move.name);
      statAffectingMoveIncreaseData.push({
        name: item.move.name,
        change: item.change,
      });
    });
    // === StatAffectingMoveIncrease End ===

    // === StatAffectingNatureDecrease Start ===
    const statAffectingNatureDecreaseKey: string[] = [];
    const statAffectingNatureDecreaseData: StatAffectingNatureType[] = [];

    body.affecting_natures.decrease.forEach((item) => {
      if (statAffectingNatureDecreaseKey.includes(item.name)) return;

      statAffectingNatureDecreaseKey.push(item.name);
      statAffectingNatureDecreaseData.push({
        name: item.name,
      });
    });
    // === StatAffectingNatureDecrease End ===

    // === StatAffectingNatureIncrease Start ===
    const statAffectingNatureIncreaseKey: string[] = [];
    const statAffectingNatureIncreaseData: StatAffectingNatureType[] = [];

    body.affecting_natures.increase.forEach((item) => {
      if (statAffectingNatureIncreaseKey.includes(item.name)) return;

      statAffectingNatureIncreaseKey.push(item.name);
      statAffectingNatureIncreaseData.push({
        name: item.name,
      });
    });
    // === StatAffectingNatureIncrease End ===

    // === CharacteristicsPossibleValue Start ===
    const characteristicsNoData = body.characteristics.map((item, index) => ({
      rowNo: index + 1,
      characteristicsNo: Number(item.url.split('/')[6]),
    }));
    // === CharacteristicsPossibleValue End ===

    await prisma.crawlerStat.create({
      data: {
        id: body.id,
        name: body.name,
        statNames: {
          createMany: {
            data: statNameData,
          },
        },
        statAffectingMovesDecrease: {
          createMany: {
            data: statAffectingMoveDecreaseData,
          },
        },
        statAffectingMovesIncrease: {
          createMany: {
            data: statAffectingMoveIncreaseData,
          },
        },
        statAffectingNaturesDecrease: {
          createMany: {
            data: statAffectingNatureDecreaseData,
          },
        },
        statAffectingNaturesIncrease: {
          createMany: {
            data: statAffectingNatureIncreaseData,
          },
        },
        statCharacteristics: {
          createMany: {
            data: characteristicsNoData,
          },
        },
      },
    });
  }

  if (body.next) {
    const params = new URL(body.next).searchParams;

    getStat({
      offset: Number(params.get('offset')),
      limit: Number(params.get('limit')),
    });
  }
};

export const main = async () => {
  try {
    await prisma.$executeRaw`
truncate table t_crawler_stat;
    `;

    await prisma.$executeRaw`
truncate table t_crawler_stat_names;
    `;

    await prisma.$executeRaw`
truncate table t_crawler_stat_affecting_moves_decrease;
    `;

    await prisma.$executeRaw`
truncate table t_crawler_stat_affecting_moves_increase;
    `;

    await prisma.$executeRaw`
truncate table t_crawler_stat_affecting_natures_decrease;
    `;

    await prisma.$executeRaw`
truncate table t_crawler_stat_affecting_natures_increase;
    `;

    await prisma.$executeRaw`
truncate table t_crawler_stat_characteristics;
    `;

    await getStat();
  } catch (error) {
    console.error('Error: ', error);
  } finally {
    await prisma.$disconnect();
  }
};

main();
