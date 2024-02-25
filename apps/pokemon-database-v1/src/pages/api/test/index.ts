import { PrismaClient } from '@project/database';
import { NextApiHandler } from 'next';

const prisma = new PrismaClient();

import type { NextApiRequest, NextApiResponse } from 'next';

export const handleGetList = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await prisma.crawlerEggGroup.findMany();
  console.log({ ...data });
  res.status(200).json({ hello: 'world' });
};

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return handleGetList(req, res);
    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      return;
  }
};

export default handler;
