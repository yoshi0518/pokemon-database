import { prisma } from '@project/database';

import { pokeApiClient } from './libs/pokeApi';

import type { QueryParamType } from './libs/pokeApi/@types';

type AbilityNameType = {
  language: string;
  name: string;
};

type AbilityEffectType = {
  language: string;
  effect: string;
  shortEffect: string;
};

type AbilityFlavorTextType = {
  language: string;
  versionGroup: string;
  flavorText: string;
};

const getAbility = async (query?: QueryParamType) => {
  const { body } = await pokeApiClient.ability.get({ query });
  // console.log({ ...body });

  if (!body.results.length) return;

  for await (const result of body.results) {
    const id = Number(result.url.split('/')[6]);
    const { body } = await pokeApiClient.ability._id(id).get();

    console.info(`\n=== Ability: ${id} ===`);

    // === AbilityName Start ===
    const abilityNameKey: string[] = [];
    const abilityNameData: AbilityNameType[] = [];

    body.names.forEach((item) => {
      if (abilityNameKey.includes(item.language.name)) return;

      abilityNameKey.push(item.language.name);
      abilityNameData.push({
        language: item.language.name,
        name: item.name,
      });
    });
    // === AbilityName End ===

    // === AbilityEffect Start ===
    const abilityEffectKey: string[] = [];
    const abilityEffectData: AbilityEffectType[] = [];

    body.effect_entries.forEach((item) => {
      if (abilityEffectKey.includes(item.language.name)) return;

      abilityEffectKey.push(item.language.name);
      abilityEffectData.push({
        language: item.language.name,
        effect: item.effect,
        shortEffect: item.short_effect,
      });
    });
    // === AbilityEffect End ===

    // === AbilityFlavorText Start ===
    const abilityFlavorTextKey: string[] = [];
    const abilityFlavorTextData: AbilityFlavorTextType[] = [];

    body.flavor_text_entries.forEach((item) => {
      if (abilityFlavorTextKey.includes(`${item.language.name}${item.version_group.name}`)) return;

      abilityFlavorTextKey.push(`${item.language.name}${item.version_group.name}`);
      abilityFlavorTextData.push({
        language: item.language.name,
        versionGroup: item.version_group.name,
        flavorText: item.flavor_text,
      });
    });
    // === AbilityFlavorText End ===

    await prisma.crawlerAbility.create({
      data: {
        id: body.id,
        name: body.name,
        generation: body.generation.name,
        is_main_series: body.is_main_series,
        abilityNames: {
          createMany: {
            data: abilityNameData,
          },
        },
        abilityEffect: {
          createMany: {
            data: abilityEffectData,
          },
        },
        abilityFlavorText: {
          createMany: {
            data: abilityFlavorTextData,
          },
        },
      },
    });
  }

  if (body.next) {
    const params = new URL(body.next).searchParams;

    getAbility({
      offset: Number(params.get('offset')),
      limit: Number(params.get('limit')),
    });
  }
};

export const main = async () => {
  await prisma.$executeRaw`
truncate table t_crawler_ability;
  `;

  await prisma.$executeRaw`
truncate table t_crawler_ability_names;
  `;

  await prisma.$executeRaw`
truncate table t_crawler_ability_effect;
  `;

  await prisma.$executeRaw`
truncate table t_crawler_ability_flavor_text;
  `;

  await getAbility();
};

main()
  .catch((error) => console.error('Error: ', error))
  .finally(async () => await prisma.$disconnect());
