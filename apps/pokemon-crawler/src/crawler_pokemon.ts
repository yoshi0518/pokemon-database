import { prisma } from '@project/database';

import { pokeApiClient } from './libs/pokeApi';

import type { QueryParamType } from './libs/pokeApi/@types';

type PokemonAbilityType = {
  ability: string;
  isHidden: boolean;
  slot: number;
};

type PokemonCryType = {
  version: string;
  cries: string;
};

type PokemonHeldItemDetailType = {
  version: string;
  rarity: number;
};

type PokemonMoveDetailType = {
  moveLearnMethod: string;
  versionGroup: string;
  levelLearnedAt: number;
};

type PokemonStatType = {
  stat: string;
  baseStat: number;
  effort: number;
};

type PokemonTypeType = {
  type: string;
};

const getPokemon = async (query?: QueryParamType) => {
  const { body } = await pokeApiClient.pokemon.get({ query });
  // console.log({ ...body });

  if (!body.results.length) return;

  for await (const result of body.results) {
    const id = Number(result.url.split('/')[6]);
    const { body } = await pokeApiClient.pokemon._id(id).get();

    console.info(`\n=== Stat: ${id} ===`);

    // === PokemonAbility Start ===
    const pokemonAbilityKey: string[] = [];
    const pokemonAbilityData: PokemonAbilityType[] = [];

    body.abilities.forEach((item) => {
      if (pokemonAbilityKey.includes(item.ability.name)) return;

      pokemonAbilityKey.push(item.ability.name);
      pokemonAbilityData.push({
        ability: item.ability.name,
        isHidden: item.is_hidden,
        slot: item.slot,
      });
    });
    // === PokemonAbility End ===

    // === PokemonCry Start ===
    const pokemonCryKey: string[] = [];
    const pokemonCryData: PokemonCryType[] = [];

    Object.entries(body.cries).forEach(([version, cries]) => {
      if (pokemonCryKey.includes(version)) return;

      pokemonCryKey.push(version);
      pokemonCryData.push({
        version,
        cries,
      });
    });
    // === PokemonCry End ===

    // === PokemonGameIndices Start ===
    const pokemonGameIndicesData = body.game_indices.map((item, index) => ({
      rowNo: index + 1,
      gameIndex: item.game_index,
      version: item.version.name,
    }));
    // === PokemonGameIndices End ===

    // === PokemonStat Start ===
    const pokemonStatKey: string[] = [];
    const pokemonStatData: PokemonStatType[] = [];

    body.stats.forEach((item) => {
      if (pokemonStatKey.includes(item.stat.name)) return;

      pokemonStatKey.push(item.stat.name);
      pokemonStatData.push({
        stat: item.stat.name,
        baseStat: item.base_stat,
        effort: item.effort,
      });
    });
    // === PokemonStat End ===

    // === PokemonType Start ===
    const pokemonTypeKey: string[] = [];
    const pokemonTypeData: PokemonTypeType[] = [];

    body.types.forEach((item) => {
      if (pokemonTypeKey.includes(item.type.name)) return;

      pokemonTypeKey.push(item.type.name);
      pokemonTypeData.push({
        type: item.type.name,
      });
    });
    // === PokemonType End ===

    await prisma.$transaction(async (prisma) => {
      await prisma.crawlerPokemon.create({
        data: {
          id: body.id,
          name: body.name,
          baseExperience: body.base_experience,
          height: body.height,
          weight: body.weight,
          isDefault: body.is_default,
          order: body.order,
          pokemonAbilities: {
            createMany: {
              data: pokemonAbilityData,
            },
          },
          pokemonCries: {
            createMany: {
              data: pokemonCryData,
            },
          },
          pokemonGameIndices: {
            createMany: {
              data: pokemonGameIndicesData,
            },
          },
          pokemonStats: {
            createMany: {
              data: pokemonStatData,
            },
          },
          pokemonTypes: {
            createMany: {
              data: pokemonTypeData,
            },
          },
        },
      });

      for await (const item of body.held_items) {
        // === PokemonHeldItemDetail Start ===
        const pokemonHeldItemDetailsKey: string[] = [];
        const pokemonHeldItemDetailsData: PokemonHeldItemDetailType[] = [];

        for (const itemDetail of item.version_details) {
          if (pokemonHeldItemDetailsKey.includes(itemDetail.version.name)) return;

          pokemonHeldItemDetailsKey.push(itemDetail.version.name);
          pokemonHeldItemDetailsData.push({
            version: itemDetail.version.name,
            rarity: itemDetail.rarity,
          });
        }
        // === PokemonHeldItemDetail End ===

        await prisma.crawlerPokemonHeldItems.create({
          data: {
            id: body.id,
            item: item.item.name,
            pokemonHeldItemsDetails: {
              createMany: {
                data: pokemonHeldItemDetailsData,
              },
            },
          },
        });
      }

      for await (const item of body.moves) {
        // === PokemonMoveDetail Start ===
        const pokemonMoveDetailsKey: string[] = [];
        const pokemonMoveDetailsData: PokemonMoveDetailType[] = [];

        for (const itemDetail of item.version_group_details) {
          if (pokemonMoveDetailsKey.includes(`${itemDetail.move_learn_method}${itemDetail.version_group}`)) return;

          pokemonMoveDetailsKey.push(`${itemDetail.move_learn_method}${itemDetail.version_group}`);
          pokemonMoveDetailsData.push({
            moveLearnMethod: itemDetail.move_learn_method.name,
            versionGroup: itemDetail.version_group.name,
            levelLearnedAt: itemDetail.level_learned_at,
          });
        }
        // === PokemonMoveDetail End ===

        await prisma.crawlerPokemonMoves.create({
          data: {
            id: body.id,
            move: item.move.name,
            pokemonMovesDetails: {
              createMany: {
                data: pokemonMoveDetailsData,
              },
            },
          },
        });
      }
    });
  }

  if (body.next) {
    const params = new URL(body.next).searchParams;

    getPokemon({
      offset: Number(params.get('offset')),
      limit: Number(params.get('limit')),
    });
  }
};
4;

export const main = async () => {
  await prisma.$executeRaw`
truncate table t_crawler_pokemon;
  `;

  await prisma.$executeRaw`
truncate table t_crawler_pokemon_abilities;
  `;

  await prisma.$executeRaw`
truncate table t_crawler_pokemon_cries;
  `;

  await prisma.$executeRaw`
truncate table t_crawler_pokemon_encounters;
  `;

  await prisma.$executeRaw`
truncate table t_crawler_pokemon_encounters_version_details;
  `;

  await prisma.$executeRaw`
truncate table t_crawler_pokemon_encounters_version_encounter_details;
  `;

  await prisma.$executeRaw`
truncate table t_crawler_pokemon_encounters_version_encounter_condition_details;
  `;

  await prisma.$executeRaw`
truncate table t_crawler_pokemon_game_indices;
  `;

  await prisma.$executeRaw`
truncate table t_crawler_pokemon_held_items;
  `;

  await prisma.$executeRaw`
truncate table t_crawler_pokemon_held_items_details;
  `;

  await prisma.$executeRaw`
truncate table t_crawler_pokemon_moves;
  `;

  await prisma.$executeRaw`
truncate table t_crawler_pokemon_moves_details;
  `;

  await prisma.$executeRaw`
truncate table t_crawler_pokemon_stats;
  `;

  await prisma.$executeRaw`
truncate table t_crawler_pokemon_types;
  `;

  await getPokemon();
};

main()
  .catch((error) => console.error('Error: ', error))
  .finally(async () => await prisma.$disconnect());
