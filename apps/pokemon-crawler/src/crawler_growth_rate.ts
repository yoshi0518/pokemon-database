import { prisma } from '@project/database';

import { pokeApiClient } from './libs/pokeApi';

import type { QueryParamType } from './libs/pokeApi/@types';

const getGrowthRate = async (query?: QueryParamType) => {
  const { body } = await pokeApiClient.growth_rate.get({ query });
  // console.log({ ...body });

  if (!body.results.length) return;

  for await (const result of body.results) {
    const id = Number(result.url.split('/')[6]);
    const { body } = await pokeApiClient.growth_rate._id(id).get();
    // console.log({ ...body });

    await prisma.crawlerGrowthRate.create({
      data: {
        id: body.id,
        name: body.name,
        growthRateLebels: {
          createMany: {
            data: body.levels,
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

const main = async () => {
  await prisma.$executeRaw`
truncate table t_crawler_growth_rate;
  `;

  await prisma.$executeRaw`
truncate table t_crawler_growth_rate_levels;
  `;

  await getGrowthRate();
};

main()
  .catch((error) => console.error('Error: ', error))
  .finally(async () => await prisma.$disconnect());
