import { PrismaClient } from '@prisma/client';

import type { QueryParamType } from '@/libs/pokeApi/@types';

import { pokeApiClient } from '../src/libs/pokeApi';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

const getGender = async (query?: QueryParamType) => {
  const { body } = await pokeApiClient.gender.get({ query });
  // console.log({ ...body });

  if (!body.results.length) return;

  for await (const result of body.results) {
    const id = Number(result.url.split('/')[6]);
    const { body } = await pokeApiClient.gender._id(id).get();

    console.info(`\n=== Gender: ${id} ===`);

    await prisma.crawlerGender.create({
      data: {
        id: body.id,
        name: body.name,
      },
    });
  }

  if (body.next) {
    const params = new URL(body.next).searchParams;

    getGender({
      offset: Number(params.get('offset')),
      limit: Number(params.get('limit')),
    });
  }
};

export const main = async () => {
  try {
    await prisma.$executeRaw`
truncate table t_crawler_gender;
    `;

    await getGender();
  } catch (error) {
    console.error('Error: ', error);
  } finally {
    await prisma.$disconnect();
  }
};

main();
