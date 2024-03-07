import { PrismaClient } from '@prisma/client';

import type { QueryParamType } from '@/libs/pokeApi/@types';

import { pokeApiClient } from '../src/libs/pokeApi';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

type PokeathlonStatNameType = {
  language: string;
  name: string;
};

type PokeathlonStatAffectingNatureType = {
  name: string;
  maxChange: number;
};

const getPokeathlonStat = async (query?: QueryParamType) => {
  const { body } = await pokeApiClient.pokeathlon_stat.get({ query });
  // console.log({ ...body });

  if (!body.results.length) return;

  for await (const result of body.results) {
    const id = Number(result.url.split('/')[6]);
    const { body } = await pokeApiClient.pokeathlon_stat._id(id).get();

    console.info(`\n=== PokeathlonStat: ${id} ===`);

    // === PokeathlonStatName Start ===
    const pokeathlonStatNameKey: string[] = [];
    const pokeathlonStatNameData: PokeathlonStatNameType[] = [];

    body.names.forEach((item) => {
      if (pokeathlonStatNameKey.includes(item.language.name)) return;

      pokeathlonStatNameKey.push(item.language.name);
      pokeathlonStatNameData.push({
        language: item.language.name,
        name: item.name,
      });
    });
    // === PokeathlonStatName End ===

    // === PokeathlonStatAffectingNatureDecrease Start ===
    const pokeathlonStatAffectingNatureDecreaseKey: string[] = [];
    const pokeathlonStatAffectingNatureDecreaseData: PokeathlonStatAffectingNatureType[] = [];

    body.affecting_natures.decrease.forEach((item) => {
      if (pokeathlonStatAffectingNatureDecreaseKey.includes(item.nature.name)) return;

      pokeathlonStatAffectingNatureDecreaseKey.push(item.nature.name);
      pokeathlonStatAffectingNatureDecreaseData.push({
        name: item.nature.name,
        maxChange: item.max_change,
      });
    });
    // === PokeathlonStatAffectingNatureDecrease End ===

    // === PokeathlonStatAffectingNatureIncrease Start ===
    const pokeathlonStatAffectingNatureIncreaseKey: string[] = [];
    const pokeathlonStatAffectingNatureIncreaseData: PokeathlonStatAffectingNatureType[] = [];

    body.affecting_natures.increase.forEach((item) => {
      if (pokeathlonStatAffectingNatureIncreaseKey.includes(item.nature.name)) return;

      pokeathlonStatAffectingNatureIncreaseKey.push(item.nature.name);
      pokeathlonStatAffectingNatureIncreaseData.push({
        name: item.nature.name,
        maxChange: item.max_change,
      });
    });
    // === PokeathlonStatAffectingNatureIncrease End ===

    await prisma.crawlerPokeathlonStat.create({
      data: {
        id: body.id,
        name: body.name,
        pokeathlonStatNames: {
          createMany: {
            data: pokeathlonStatNameData,
          },
        },
        pokeathlonStatAffectingNaturesDecrease: {
          createMany: {
            data: pokeathlonStatAffectingNatureDecreaseData,
          },
        },
        pokeathlonStatAffectingNaturesIncrease: {
          createMany: {
            data: pokeathlonStatAffectingNatureIncreaseData,
          },
        },
      },
    });
  }

  if (body.next) {
    const params = new URL(body.next).searchParams;

    getPokeathlonStat({
      offset: Number(params.get('offset')),
      limit: Number(params.get('limit')),
    });
  }
};

export const main = async () => {
  try {
    await prisma.$executeRaw`
truncate table t_crawler_pokeathlon_stat;
    `;

    await prisma.$executeRaw`
truncate table t_crawler_pokeathlon_stat_names;
    `;

    await prisma.$executeRaw`
truncate table t_crawler_pokeathlon_stat_affecting_natures_decrease;
    `;

    await prisma.$executeRaw`
truncate table t_crawler_pokeathlon_stat_affecting_natures_increase;
    `;

    await getPokeathlonStat();
  } catch (error) {
    console.error('Error: ', error);
  } finally {
    await prisma.$disconnect();
  }
};

main();
