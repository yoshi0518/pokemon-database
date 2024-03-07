import { PrismaClient } from '@prisma/client';

import type { QueryParamType } from '@/libs/pokeApi/@types';

import { pokeApiClient } from '../src/libs/pokeApi';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

type EggGroupNameType = {
  language: string;
  name: string;
};

const getEggGroup = async (query?: QueryParamType) => {
  const { body } = await pokeApiClient.egg_group.get({ query });
  // console.log({ ...body });

  if (!body.results.length) return;

  for await (const result of body.results) {
    const id = Number(result.url.split('/')[6]);
    const { body } = await pokeApiClient.egg_group._id(id).get();

    console.info(`\n=== EggGroup: ${id} ===`);

    // === EggGroupName Start ===
    const eggGroupNameKey: string[] = [];
    const eggGroupNameData: EggGroupNameType[] = [];

    body.names.forEach((item) => {
      if (eggGroupNameKey.includes(item.language.name)) return;

      eggGroupNameKey.push(item.language.name);
      eggGroupNameData.push({
        language: item.language.name,
        name: item.name,
      });
    });
    // === EggGroupName End ===

    await prisma.crawlerEggGroup.create({
      data: {
        id: body.id,
        name: body.name,
        eggGroupNames: {
          createMany: {
            data: eggGroupNameData,
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

export const main = async () => {
  try {
    await prisma.$executeRaw`
truncate table t_crawler_egg_group;
    `;

    await prisma.$executeRaw`
truncate table t_crawler_egg_group_names;
    `;

    await getEggGroup();
  } catch (error) {
    console.error('Error: ', error);
  } finally {
    await prisma.$disconnect();
  }
};

main();
