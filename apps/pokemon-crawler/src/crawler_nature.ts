import { prisma } from '@project/database';

import { pokeApiClient } from './libs/pokeApi';

import type { QueryParamType } from './libs/pokeApi/@types';

const getNature = async (query?: QueryParamType) => {
  const { body } = await pokeApiClient.nature.get({ query });
  // console.log({ ...body });

  if (!body.results.length) return;

  for await (const result of body.results) {
    const id = Number(result.url.split('/')[6]);
    const { body } = await pokeApiClient.nature._id(id).get();
    // console.log({ ...body });

    await prisma.crawlerNature.create({
      data: {
        id: body.id,
        name: body.name,
        decreased_stat: body.decreased_stat ? body.decreased_stat.name : null,
        increased_stat: body.increased_stat ? body.increased_stat.name : null,
        hates_flavor: body.hates_flavor ? body.hates_flavor.name : null,
        likes_flavor: body.likes_flavor ? body.likes_flavor.name : null,
        natureNames: {
          createMany: {
            data: body.names.map((item) => ({ language: item.language.name, name: item.name })),
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
  await prisma.$executeRaw`
truncate table t_crawler_nature;
  `;

  await prisma.$executeRaw`
truncate table t_crawler_nature_names;
  `;

  await getNature();
};

main()
  .catch((error) => console.error('Error: ', error))
  .finally(async () => await prisma.$disconnect());
