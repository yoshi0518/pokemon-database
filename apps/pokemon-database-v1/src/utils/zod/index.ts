import { NextApiRequest, NextApiResponse } from 'next';
import { z, ZodSchema } from 'zod';

export const withZod = <T extends ZodSchema>(
  schema: T,
  next: (req: Omit<NextApiRequest, 'query' | 'body'> & z.infer<T>, res: NextApiResponse) => unknown | Promise<unknown>,
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      schema.parse(req);
    } catch (error) {
      // 共通バリデーションエラー
      res.status(400).json({
        message: 'Bad Request',
        error,
      });
    }
    return next(req, res);
  };
};
