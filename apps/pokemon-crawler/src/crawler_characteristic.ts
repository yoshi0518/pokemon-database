import { prisma } from '@project/database';

import { pokeApiClient } from './libs/pokeApi';

import type { QueryParamType } from './libs/pokeApi/@types';

type CharacteristicsDescriptionType = {
  language: string;
  description: string;
};

const getCharacteristics = async (query?: QueryParamType) => {
  const { body } = await pokeApiClient.characteristic.get({ query });
  // console.log({ ...body });

  if (!body.results.length) return;

  for await (const result of body.results) {
    const id = Number(result.url.split('/')[6]);
    const { body } = await pokeApiClient.characteristic._id(id).get();

    console.info(`\n=== Characteristics: ${id} ===`);

    // === CharacteristicsDescription Start ===
    const characteristicsDescriptionKey: string[] = [];
    const characteristicsDescriptionData: CharacteristicsDescriptionType[] = [];

    body.descriptions.forEach((item) => {
      if (characteristicsDescriptionKey.includes(item.language.name)) return;

      characteristicsDescriptionKey.push(item.language.name);
      characteristicsDescriptionData.push({
        language: item.language.name,
        description: item.description,
      });
    });
    // === CharacteristicsDescription End ===

    // === CharacteristicsPossibleValue Start ===
    const characteristicsPossibleValueData = body.possible_values.map((possibleValue, index) => ({
      row_no: index,
      possible_value: possibleValue,
    }));
    // === CharacteristicsPossibleValue End ===

    await prisma.crawlerCharacteristics.create({
      data: {
        id: body.id,
        highest_stat: body.highest_stat.name,
        gene_modulo: body.gene_modulo,
        characteristicsDescriptions: {
          createMany: {
            data: characteristicsDescriptionData,
          },
        },
        characteristicsPossibleValues: {
          createMany: {
            data: characteristicsPossibleValueData,
          },
        },
      },
    });
  }

  if (body.next) {
    const params = new URL(body.next).searchParams;

    getCharacteristics({
      offset: Number(params.get('offset')),
      limit: Number(params.get('limit')),
    });
  }
};

export const main = async () => {
  await prisma.$executeRaw`
truncate table t_crawler_characteristics;
  `;

  await prisma.$executeRaw`
truncate table t_crawler_characteristics_descriptions;
  `;

  await prisma.$executeRaw`
truncate table t_crawler_characteristics_possible_values;
  `;

  await getCharacteristics();
};

main()
  .catch((error) => console.error('Error: ', error))
  .finally(async () => await prisma.$disconnect());
