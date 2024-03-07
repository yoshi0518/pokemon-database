import { PrismaClient } from '@prisma/client';

import type { QueryParamType } from '@/libs/pokeApi/@types';

import { pokeApiClient } from '../src/libs/pokeApi';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

type GrowthRateLevelType = {
  level: number;
  experience: number;
};

const getGrowthRate = async (query?: QueryParamType) => {
  const { body } = await pokeApiClient.growth_rate.get({ query });
  // console.log({ ...body });

  if (!body.results.length) return;

  for await (const result of body.results) {
    const id = Number(result.url.split('/')[6]);
    const { body } = await pokeApiClient.growth_rate._id(id).get();

    console.info(`\n=== GrowthRate: ${id} ===`);

    // === GrowthRateLevel Start ===
    const growthRateLevelKey: number[] = [];
    const growthRateLevelData: GrowthRateLevelType[] = [];

    body.levels.forEach((item) => {
      if (growthRateLevelKey.includes(item.level)) return;

      growthRateLevelKey.push(item.level);
      growthRateLevelData.push({
        level: item.level,
        experience: item.experience,
      });
    });
    // === GrowthRateLevel End ===

    await prisma.crawlerGrowthRate.create({
      data: {
        id: body.id,
        name: body.name,
        growthRateLebels: {
          createMany: {
            data: growthRateLevelData,
          },
        },
      },
    });
  }

  if (body.next) {
    const params = new URL(body.next).searchParams;

    getGrowthRate({
      offset: Number(params.get('offset')),
      limit: Number(params.get('limit')),
    });
  }
};

export const main = async () => {
  try {
    await prisma.$executeRaw`
truncate table t_crawler_growth_rate;
    `;

    await prisma.$executeRaw`
truncate table t_crawler_growth_rate_levels;
    `;

    await getGrowthRate();
  } catch (error) {
    console.error('Error: ', error);
  } finally {
    await prisma.$disconnect();
  }
};

main();
