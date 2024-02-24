import { pokeApiClient } from './libs/pokeApi';
import { prisma } from './libs/prisma';

import type { QueryParamType } from './libs/pokeApi/@types';

const getEggGroup = async (query?: QueryParamType) => {
  const { body } = await pokeApiClient.egg_group.get({ query });
  // console.log({ ...body });

  if (!body.results.length) return;

  for await (const result of body.results) {
    const id = Number(result.url.split('/')[6]);
    const { body } = await pokeApiClient.egg_group._id(id).get();
    // console.log({ ...body });

    await prisma.crawlerEggGroup.create({
      data: {
        id: body.id,
        name: body.name,
        eggGroupNames: {
          createMany: {
            data: body.names.map((item) => ({ language: item.language.name, name: item.name })),
          },
        },
      },
    });
  }

  if (body.next) {
    const params = new URL(body.next).searchParams;

    getEggGroup({
      offset: Number(params.get('offset')),
      limit: Number(params.get('limit')),
    });
  }
};

const main = async () => {
  await prisma.$executeRaw`
truncate table t_crawler_egg_group;
  `;

  await prisma.$executeRaw`
truncate table t_crawler_egg_group_names;
  `;

  await getEggGroup();
};

main()
  .catch((error) => console.error('Error: ', error))
  .finally(async () => await prisma.$disconnect());
