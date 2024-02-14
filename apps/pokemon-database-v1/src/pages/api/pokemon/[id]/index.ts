import { NextApiHandler } from 'next';

import { handleGetDetail } from '@/features/pokemon/api/handleGetDetail';

import { PokemonDetailType } from '@/libs/bffApi/@types';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<PokemonDetailType | { message: string }>,
) => {
  switch (req.method) {
    case 'GET':
      return handleGetDetail(req, res);
    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      return;
  }
};

export default handler;
