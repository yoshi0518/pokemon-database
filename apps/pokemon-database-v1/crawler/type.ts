import { PrismaClient } from '@prisma/client';

import type { QueryParamType } from '@/libs/pokeApi/@types';

import { pokeApiClient } from '../src/libs/pokeApi';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

type TypeNameType = {
  language: string;
  name: string;
};

const getType = async (query?: QueryParamType) => {
  const { body } = await pokeApiClient.type.get({ query });
  // console.log({ ...body });

  if (!body.results.length) return;

  for await (const result of body.results) {
    const id = Number(result.url.split('/')[6]);
    const { body } = await pokeApiClient.type._id(id).get();

    console.info(`\n=== Type: ${id} ===`);

    // === TypeName Start ===
    const typeNameKey: string[] = [];
    const typeNameData: TypeNameType[] = [];

    body.names.forEach((item) => {
      if (typeNameKey.includes(item.language.name)) return;

      typeNameKey.push(item.language.name);
      typeNameData.push({
        language: item.language.name,
        name: item.name,
      });
    });
    // === TypeName End ===

    // === TypeDoubleDamageFrom Start ===
    const typeDoubleDamageFromData = body.damage_relations.double_damage_from.map((item, index) => ({
      rowNo: index + 1,
      typeName: item.name,
    }));
    // === TypeDoubleDamageFrom End ===

    // === TypeDoubleDamageTo Start ===
    const typeDoubleDamageToData = body.damage_relations.double_damage_to.map((item, index) => ({
      rowNo: index + 1,
      typeName: item.name,
    }));
    // === TypeDoubleDamageTo End ===

    // === TypeHalfDamageFrom Start ===
    const typeHalfDamageFromData = body.damage_relations.half_damage_from.map((item, index) => ({
      rowNo: index + 1,
      typeName: item.name,
    }));
    // === TypeHalfDamageFrom End ===

    // === TypeHalfDamageTo Start ===
    const typeHalfDamageToData = body.damage_relations.half_damage_to.map((item, index) => ({
      rowNo: index + 1,
      typeName: item.name,
    }));
    // === TypeHalfDamageTo End ===

    // === TypeNoDamageFrom Start ===
    const typeNoDamageFromData = body.damage_relations.no_damage_from.map((item, index) => ({
      rowNo: index + 1,
      typeName: item.name,
    }));
    // === TypeNoDamageFrom End ===

    // === TypeNoDamageTo Start ===
    const typeNoDamageToData = body.damage_relations.no_damage_to.map((item, index) => ({
      rowNo: index + 1,
      typeName: item.name,
    }));
    // === TypeNoDamageTo End ===

    // === TypeGameIndex Start ===
    const typeGameIndexData = body.game_indices.map((item, index) => ({
      rowNo: index + 1,
      gameIndex: item.game_index,
      generation: item.generation.name,
    }));
    // === TypeGameIndex End ===

    // === TypeMove Start ===
    const typeMoveData = body.moves.map((item, index) => ({
      rowNo: index + 1,
      move: item.name,
    }));
    // === TypeMove End ===

    await prisma.crawlerType.create({
      data: {
        id: body.id,
        name: body.name,
        generation: body.generation.name,
        moveDamageClass: body.move_damage_class ? body.move_damage_class.name : null,
        typeNames: {
          createMany: {
            data: typeNameData,
          },
        },
        typeDoubleDamageFrom: {
          createMany: {
            data: typeDoubleDamageFromData,
          },
        },
        typeDoubleDamageTo: {
          createMany: {
            data: typeDoubleDamageToData,
          },
        },
        typeHalfDamageFrom: {
          createMany: {
            data: typeHalfDamageFromData,
          },
        },
        typeHalfDamageTo: {
          createMany: {
            data: typeHalfDamageToData,
          },
        },
        typeNoDamageFrom: {
          createMany: {
            data: typeNoDamageFromData,
          },
        },
        typeNoDamageTo: {
          createMany: {
            data: typeNoDamageToData,
          },
        },
        typeGameIndices: {
          createMany: {
            data: typeGameIndexData,
          },
        },
        typeMoves: {
          createMany: {
            data: typeMoveData,
          },
        },
      },
    });
  }

  if (body.next) {
    const params = new URL(body.next).searchParams;

    getType({
      offset: Number(params.get('offset')),
      limit: Number(params.get('limit')),
    });
  }
};

export const main = async () => {
  try {
    await prisma.$executeRaw`
truncate table t_crawler_type;
    `;

    await prisma.$executeRaw`
truncate table t_crawler_type_names;
    `;

    await prisma.$executeRaw`
truncate table t_crawler_type_double_damage_from;
    `;

    await prisma.$executeRaw`
truncate table t_crawler_type_double_damage_to;
    `;

    await prisma.$executeRaw`
truncate table t_crawler_type_half_damage_from;
    `;

    await prisma.$executeRaw`
truncate table t_crawler_type_half_damage_to;
    `;

    await prisma.$executeRaw`
truncate table t_crawler_type_no_damage_from;
    `;

    await prisma.$executeRaw`
truncate table t_crawler_type_no_damage_to;
    `;

    await prisma.$executeRaw`
truncate table t_crawler_type_game_indices;
    `;

    await prisma.$executeRaw`
truncate table t_crawler_type_moves;
    `;

    await getType();
  } catch (error) {
    console.error('Error: ', error);
  } finally {
    await prisma.$disconnect();
  }
};

main();
