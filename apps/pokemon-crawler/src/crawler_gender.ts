import { pokeApiClient } from './libs/pokeApi';
import { prisma } from './libs/prisma';

import type { QueryParamType } from './libs/pokeApi/@types';

const getGender = async (query?: QueryParamType) => {
  const { body } = await pokeApiClient.gender.get({ query });
  // console.log({ ...body });

  if (!body.results.length) return;

  for await (const result of body.results) {
    const id = Number(result.url.split('/')[6]);
    const { body } = await pokeApiClient.gender._id(id).get();
    // console.log({ ...body });

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

const main = async () => {
  await prisma.$executeRaw`
truncate table t_crawler_gender;
  `;

  await getGender();
};

main()
  .catch((error) => console.error('Error: ', error))
  .finally(async () => await prisma.$disconnect());
