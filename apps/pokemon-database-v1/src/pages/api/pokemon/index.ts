import { prisma } from '@project/database';
import { NextApiHandler } from 'next';

import { PokemonListType } from '@/libs/bffApi/@types';

import type { NextApiRequest, NextApiResponse } from 'next';

const handleGetList = async (req: NextApiRequest, res: NextApiResponse<PokemonListType | { message: string }>) => {
  const page = Number(req?.query?.page) || 1;
  const size = Number(req?.query?.size) || 20;
  const count = await prisma.pokemonView.count();
  const maxPage = Math.floor(count / size) + 1;

  const selectData = await prisma.pokemonView.findMany({
    skip: size * (page - 1),
    take: size,
  });

  // console.log({ ...selectData });

  const response = {
    count,
    maxPage,
    page,
    size,
    data: selectData.map((data) => {
      const types: string[] = [];
      if (data.type1) types.push(data.type1);
      if (data.type2) types.push(data.type2);

      return {
        id: data.id,
        fileName: data.image,
        types,
        name: data.name,
        genus: data.genus,
      };
    }),
  };

  res.status(200).json(response);
};

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<PokemonListType | { message: string }>,
) => {
  switch (req.method) {
    case 'GET':
      return handleGetList(req, res);
    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      return;
  }
};

export default handler;
