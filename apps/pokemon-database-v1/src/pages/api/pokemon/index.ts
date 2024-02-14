import { NextApiHandler } from 'next';

import { handleGetList } from '@/features/pokemon/api/handleGetList';

import { PokemonListType } from '@/libs/bffApi/@types';

import type { NextApiRequest, NextApiResponse } from 'next';

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
